import { 
    GET_REVIEW,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    REMOVE_WORD,
    UPDATE_WORD,
    GET_EMPTY_REVIEW,
    START_REVIEW,
    CLOSE_REVIEW
} from '../actions/review';


const initialState = {
    list: [],
    currentWord: null,
    translation: null,
    id: null,
    dueDate: null,
    correctCount: null,
    rating: null,
    loadingList: true,
    reviewMode: false,
    error: {}
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_REVIEW: 

            return {
                ...state,
                list: payload,
                currentWord: payload[0].english,
                translation: payload[0].spanish,
                id: payload[0]._id,
                dueDate: payload[0].dueDate,
                correctCount: payload[0].correctCount,
                rating: payload[0].rating,
                loadingList: false
            }

        case START_REVIEW:

            return {
                ...state,
                reviewMode: true
            }

        case CLOSE_REVIEW:

            return {
                ...state,
                reviewMode: false
            }

        case GET_EMPTY_REVIEW: 

            return {
                ...state,
                loadingList: false
            }

        case CORRECT_ANSWER:
            
            return {
                ...state,
                list: state.list.filter(word => word.english !== payload.word),
                currentWord: state.list.filter(word => word.english !== payload.word)[payload.index].english,
                translation: state.list.filter(word => word.english !== payload.word)[payload.index].spanish,
                id: state.list.filter(word => word.english !== payload.word)[payload.index]._id,
                dueDate: state.list.filter(word => word.english !== payload.word)[payload.index].dueDate,
                correctCount: state.list.filter(word => word.english !== payload.word)[payload.index].correctCount,
                rating: state.list.filter(word => word.english !== payload.word)[payload.index].rating
            }
        
        case INCORRECT_ANSWER:
             
            return {
                ...state,
                currentWord: state.list[payload.index].english,
                translation: state.list[payload.index].spanish,
                id: state.list[payload.index]._id,
                dueDate: state.list[payload.index].dueDate,
                correctCount: state.list[payload.index].correctCount,
                rating: state.list[payload.index].rating
            }
        

        case UPDATE_WORD:

            return {
                ...state,
                list: state.list.map(word => {
                    if(word.english === payload.english) {
                      return {...word, rating: 0}
                    } else {
                      return word
                    }
                  }),
                correctCount: payload.correctCount,
                dueDate: payload.dueDate,
                rating: payload.rating
            }

        case REMOVE_WORD:
           
            return {
                ...state,
                list: []
            }

        default: 
            return {
                ...state
            }


    }
}