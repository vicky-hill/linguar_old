import axios from 'axios';
import { url } from '../config';

export const GET_WORDS = 'GET_WORDS';
export const GET_LISTS = 'GET_LISTS';
export const SAVE_LIST = 'SAVE_LIST';
export const SAVE_WORD = 'SAVE_WORD';
export const SET_URL = 'SET_URL';
export const OPEN_EDIT_LIST = 'OPEN_EDIT_LIST';
export const OPEN_EDIT_WORD = 'OPEN_EDIT_WORD';
export const OPEN_CREATE_LIST = 'OPEN_CREATE_LIST';
export const CLEAR_EDIT = 'CLEAR_EDIT';
export const UPDATE_WORD = 'UPDATE_WORD';
export const DELETE_WORD = 'DELETE_WORD';
export const OPEN_CREATE_WORD = 'OPEN_CREATE_WORD';
export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const GET_SEARCH_TERM = 'GET_SEARCH_TERM';


/* ===================================
   Config for POST & PUT requests
=================================== */

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


/* ===================================
   Set the correct header Link url
=================================== */

export const setURL = () => async dispatch => {
    let url;

    if (window.location.href.includes('%20')) {
        url = '/vocabulary';
    } else {
        url = '/';
    }

    dispatch({
        type: SET_URL,
        payload: url
    })
}


/* ===================================
   Get Words
=================================== */

export const getWords = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/words`);

        const transformedRes = res.data.map(word => {
            return {
                ...word,
                spanish: word.foreign,
                english: word.native
            }
        })

        dispatch({
            type: GET_WORDS,
            payload: transformedRes
        })
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Get lists
=================================== */

export const getLists = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/lists`);

        dispatch({
            type: GET_LISTS,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Save new list
=================================== */

export const saveList = (formData) => async dispatch => {
    try {

        const res = await axios.post(`${url}/api/lists`, formData, config);

        dispatch({
            type: SAVE_LIST,
            payload: res.data
        })

    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Save new word
=================================== */

export const saveWord = (formData) => async dispatch => {
    try {

        const body = {
            foreign: formData.spanish,
            native: formData.english,
            list: formData.list
        }

        console.log('body', body)

        const res = await axios.post(`${url}/api/words`, body, config);

        dispatch({
            type: SAVE_WORD,
            payload: {
                ...res.data,
                spanish: res.data.foreign,
                english: res.data.native
            }
        })

    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Open edit form
=================================== */

export const openEdit = (edit, editFormData) => async dispatch => {
    try {

        if (edit === 'editWord') {
            dispatch({
                type: OPEN_EDIT_WORD,
                payload: editFormData
            })
        }

        if (edit === 'editList') {
            dispatch({
                type: OPEN_EDIT_LIST,
                payload: editFormData
            })
        }

        if (edit === 'createWord') {
            dispatch({
                type: OPEN_CREATE_WORD
            })
        }

        if (edit === 'createList') {
            dispatch({
                type: OPEN_CREATE_LIST
            })
        }


    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Update word
=================================== */

export const updateWord = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${url}/api/words/${id}`, formData, config);
        
        dispatch({
            type: UPDATE_WORD,
            payload: {
                ...res.data,
                spanish: res.data.foreign,
                english: res.data.native
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}


/* ===================================
   Update list
=================================== */

export const updateList = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${url}/api/lists/${id}`, formData, config);

        dispatch({
            type: UPDATE_LIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}


/* ===================================
   Delete list
=================================== */

export const deleteList = id => async dispatch => {
    try {
        const res = await axios.delete(`${url}/api/lists/${id}`);

        dispatch({
            type: DELETE_LIST,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);

    }
}


/* ===================================
   Delete word
=================================== */
 
export const deleteWord = id => async dispatch => {
    try {
        const res = await axios.delete(`${url}/api/words/${id}`);

        dispatch({
            type: DELETE_WORD,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);

    }
}


/* ===================================
   Close and clear edit form
=================================== */

export const clearEdit = () => async dispatch => {

    try {

        dispatch({
            type: CLEAR_EDIT
        })

    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Update searchTerm in state
=================================== */

export const getSearchTerm = (searchedWord) => async dispatch => {
    try {
        
        dispatch({
            type: GET_SEARCH_TERM,
            payload: searchedWord
        })

    } catch (err) {
        console.log(err.message);
    }
}

