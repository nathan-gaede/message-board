import { combineReducers } from 'redux';


const msgList = (state = [], action) => {
    if(action.type === 'SET_MSG') {
        return action.payload;
    }
    return state;
}


export default msgList;

