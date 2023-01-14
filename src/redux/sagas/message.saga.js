import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * messageSaga() {
    yield takeLatest('POST_MSG', postMsg);
    yield takeLatest('FETCH_ALL_MSG', fetchAllMsg)
    yield takeLatest('POST_REPLY', postReply);
}

function* postMsg(action) {
    try {
        yield axios.post('/api/msg', action.payload)
        console.log('Msg to POST is', action.payload);

    }catch(e) {
        console.log(e);
        alert('ERROR in POST')
    }
}

function* fetchAllMsg() {
    try {
        const msg = yield axios.get('/api/msg');
        console.log('Fetch All', msg.data);
        yield put ({ type: 'SET_MSG', payload: msg.data});
    }catch(e) {
        console.log(e);
        alert('Error in Fetch Msg')
    }
}

function * postReply(action) {
    try {
        yield axios.post('/api/reply', action.payload);
        console.log('POST reply is', action.payload);
    }catch(e) {
        console.log(e);
        alert('ERROR in POST reply')
    }
}


export default messageSaga;