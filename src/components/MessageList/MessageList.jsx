import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MessageList() {
  const msgList = useSelector((store) => store.message);
  console.log(msgList);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_MSG" });
  }, []);

  //TODO: enter exact path in history.push
  //once the Protected Route is created in App.jsx
  // const displayMsg = (msgToDisplay) => {
  //     history.push(``)
  // }

  return (
    <>
      <h1>Message List</h1>
      {JSON.stringify(msgList)}
      {/* <h1>Message List</h1>
      {msgList.map((msg) => {
        return <div key={msg.id}></div>;
      })} */}
    </>
  );
}
export default MessageList;
