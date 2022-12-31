import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * messageSaga() {
    yield takeLatest('POST_MSG', postMsg);
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

export default messageSaga;