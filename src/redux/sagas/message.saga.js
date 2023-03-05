import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* messageSaga() {
  yield takeLatest("POST_MSG", postMsg);
  yield takeLatest("FETCH_ALL_MSG", fetchAllMsg);
  yield takeLatest("POST_REPLY", postReply);
  yield takeLatest("DELETE_POST", deletePost);
  yield takeLatest("EDIT_MSG", editMsg);
}

function* postMsg(action) {
  try {
    yield axios.post("/api/msg", action.payload);
    console.log("Msg to POST is", action.payload);
    yield put({ type: "FETCH_ALL_MSG" });
  } catch (e) {
    console.log(e);
    alert("ERROR in POST");
  }
}

function* fetchAllMsg() {
  try {
    const msg = yield axios.get("/api/msg");
    console.log("Fetch All", msg.data);
    yield put({ type: "SET_MSG", payload: msg.data });
  } catch (e) {
    console.log(e);
    alert("Error in Fetch Msg");
  }
}

function* postReply(action) {
  try {
    yield axios.post("/api/reply", action.payload);
    console.log("POST reply is", action.payload);
    yield put({ type: "FETCH_ALL_MSG" });
  } catch (e) {
    console.log(e);
    alert("ERROR in POST reply");
  }
}

function* deletePost(action) {
  console.log("What is payload?", action.payload);
  try {
    yield axios.put(`/api/msg/delete/${action.payload.id}`);
    yield put({ type: "FETCH_ALL_MSG" });
  } catch (e) {
    console.log("ERROR in DELETE", e);
    alert("Something went wrong deleting post");
  }
}

function* editMsg(action) {
  console.log("What is payload?", action.payload);
  try {
    yield axios.put(`/api/msg/${action.payload.id}`, action.payload);
    // yield put ({ type: "SET_MSG" });
  } catch (e) {
    console.log(e);
    alert("Problem with PUT SAGA", e);
  }
}

// function* fetchMsgToEdit(action) {
//     try {
//         console.log(action);
//         yield axios.get(`/api/msg/${action.payload}`);
//     }catch(e) {
//         console.log(e);
//         alert('Edit Msg SAGA error', e);
//     }
// }

export default messageSaga;
