import axios from 'axios';
import { url } from '../config';

export const GET_REVIEW = 'GET_REVIEW';
export const GET_EMPTY_REVIEW = 'GET_EMPTY_REVIEW';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const INCORRECT_ANSWER = 'INCORRECT_ANSWER'
export const REMOVE_WORD = 'REMOVE_WORD';
export const UPDATE_WORD = 'UPDATE_WORD';
export const START_REVIEW = 'START_REVIEW';
export const CLOSE_REVIEW = 'CLOSE_REVIEW';


/* ===================================
   Get words that need to be reviewed
=================================== */

export const getReview = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/words/review`);

        const transformedRes = res.data.map(word => {
            return {
                ...word,
                spanish: word.foreign,
                english: word.native
            }
        })

        if (res.data.length === 0) {
            return dispatch({
                type: GET_EMPTY_REVIEW
            })
        }

        dispatch({
            type: GET_REVIEW,
            payload: transformedRes
        })
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Start review
=================================== */

export const startReview = () => async dispatch => {
    try {
        const review = document.getElementById("review");
        review.classList.add("slide-in");

        dispatch({
            type: START_REVIEW
        })
    } catch (err) {
        console.error(err.message);
    }
}

/* ===================================
   Open ranking page
=================================== */

export const openRanking = () => async dispatch => {
    try {
        const ranking = document.getElementById("ranking");
        ranking.classList.add("slide-in");
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Close review & ranking
=================================== */

export const closeReview = () => async dispatch => {
    try {
        const review = document.getElementById("review");
        const ranking = document.getElementById("ranking");
        review.classList.remove("slide-in");
        ranking.classList.remove("slide-in");

        dispatch({
            type: CLOSE_REVIEW
        })
        
    } catch (err) {
        console.error(err.message);
    }
}

/* ===================================
   Get next word if correct answer
=================================== */

export const nextCard = (word, array, answer) => async dispatch => {

    try {

        const index = await Math.floor(Math.random() * array);

        if (answer === 'correctAnswer') {
            return dispatch({
                type: CORRECT_ANSWER,
                payload: { index, word }
            })
        }

        if (answer === 'incorrectAnswer') {
            return dispatch({
                type: INCORRECT_ANSWER,
                payload: { index }
            })
        }

    } catch (err) {
        console.error(err.message);
    }
}

/* ===================================
   Remove word from list
=================================== */

export const removeLastWord = (word) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_WORD,
            payload: word
        })
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Update correct word in database
=================================== */

export const wordUpdate = (id, formData) => async dispatch => {
    
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${url}/api/words/${id}`, formData, config);

        dispatch({
            type: UPDATE_WORD,
            payload: res.data
        })

    } catch (err) {
        console.error(err.message);
    }
}




/* ==========================================
   Review Algorithm
========================================== */

// Add time to dueDate
export const addTime = (rating) => async dispatch => {
    try {
        let result = new Date();

        switch (rating) {
            case 0:
                result.setHours(result.getHours() + 7);
                return result;
            case 1:
                result.setHours(result.getHours() + 14);
                return result;
            case 2:
                result.setDate(result.getDate() + 1);
                return result;
            case 3:
                result.setDate(result.getDate() + 3);
                return result;
            case 4:
                result.setDate(result.getDate() + 7);
                return result;
            case 5:
                result.setDate(result.getDate() + 14);
                return result;
            case 6:
                result.setDate(result.getDate() + 21);
                return result;
            case 7:
                result.setMonth(result.getMonth() + 1);
                return result;
            case 8:
                result.setMonth(result.getMonth() + 2);
                return result;
            case 9:
                result.setMonth(result.getMonth() + 3);
                return result;
            case 10:
                result.setMonth(result.getMonth() + 4);
                return result;
            case 11:
                result.setMonth(result.getMonth() + 5);
                return result;
            case 12:
                result.setMonth(result.getMonth() + 6);
                return result;
            case 13:
                result.setMonth(result.getMonth() + 7);
                return result;
            case 14:
                result.setMonth(result.getMonth() + 8);
                return result;
            case 15:
                result.setMonth(result.getMonth() + 9);
                return result;
            case 16:
                result.setMonth(result.getMonth() + 10);
                return result;
            case 17:
                result.setMonth(result.getMonth() + 11);
                return result;
            case 18:
                result.setMonth(result.getMonth() + 12);
                return result;
            default:
                console.log(rating);
        }

    } catch (err) {
        console.error(err.message);
    }
} 
