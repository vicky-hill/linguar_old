import {
    GET_WORDS,
    GET_LISTS,
    SET_URL,
    SAVE_LIST,
    SAVE_WORD,
    OPEN_EDIT_LIST,
    OPEN_EDIT_WORD,
    CLEAR_EDIT,
    UPDATE_WORD,
    DELETE_WORD,
    OPEN_CREATE_WORD,
    OPEN_CREATE_LIST,
    UPDATE_LIST,
    DELETE_LIST,
    GET_SEARCH_TERM
} from '../actions/words';

const initialState = {
    words: [],
    lists: [],
    count: null,
    url: '/',
    editMode: false, // createWord -- editWord -- createList -- editList 
    editWord: {
        spanish: '',
        english: ''
    },
    editList: {
        listTitle: ''
    },
    searchTerm: '',
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        /* ===================================
           Words
        ==================================== */

        case GET_WORDS:

            return {
                ...state,
                words: payload,
                count: payload.length,
                loading: false
            }

        case SAVE_WORD:

            return {
                ...state,
                words: [...state.words, payload]
            }

        case OPEN_CREATE_WORD:

            return {
                ...state,
                editMode: 'createWord'
            }

        case OPEN_EDIT_WORD:

            return {
                ...state,
                editMode: 'editWord',
                editWord: payload
            }

        case UPDATE_WORD:

            return {
                ...state,
                words: state.words.map(word => {
                    if (word._id === payload._id) {
                        return payload;

                    }
                    return word;
                })
            }



        case DELETE_WORD:

            return {
                ...state,
                words: state.words.filter(word => word._id !== payload._id)
            }

        
        case GET_SEARCH_TERM:

            return {
                ...state,
                searchTerm: payload
            }


        /* ===================================
           Lists
        ==================================== */

        case GET_LISTS:

            return {
                ...state,
                lists: payload
            }

        case SAVE_LIST:

            return {
                ...state,
                lists: [...state.lists, payload]
            }

        case OPEN_EDIT_LIST:

            return {
                ...state,
                editMode: 'editList',
                editList: payload
            }

        case OPEN_CREATE_LIST:

            return {
                ...state,
                editMode: 'createList'
            }

        case UPDATE_LIST:

            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list._id === payload._id) {
                        return payload;
                    }
                    return list;
                })
            }

        case DELETE_LIST:

            return {
                ...state,
                lists: state.lists.filter(list => list._id !== payload._id)
            }



        /* ===================================
           Other
        ==================================== */

        case CLEAR_EDIT:

            return {
                ...state,
                editMode: false,
                editWord: {
                    spanish: '',
                    english: ''
                },
                editList: {
                    listTitle: ''
                },
                createMode: false
            }


        case SET_URL:

            return {
                ...state,
                url: payload
            }

        default:
            return {
                ...state
            }


    }
}