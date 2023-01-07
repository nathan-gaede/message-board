import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * messageSaga() {
    yield takeLatest('POST_MSG', postMsg);
    yield takeLatest('FETCH_ALL_MSG', fetchAllMsg)
}

function* postMsg(action) {
    try {
        const msg = yield axios.post('/api/msg', action.payload)
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

export default messageSaga;