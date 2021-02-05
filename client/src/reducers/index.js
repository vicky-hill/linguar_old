import { combineReducers } from 'redux';
import words from './words';
import review from './review';
import auth from './auth';

export default combineReducers({
    words,
    review,
    auth
});