import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function MessageList() {
  const msgList = useSelector((store) => store.message);
  //   console.log(msgList);
  const dispatch = useDispatch();
  const history = useHistory();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_MSG" });
  }, []);

  const submitReply = (e) => {
    e.preventDefault();

    dispatch({
      type: "POST_REPLY",
      payload: {
        content: msg,
      },
    });
  };

  //TODO: enter exact path in history.push
  //once the Protected Route is created in App.jsx
  // const displayMsg = (msgToDisplay) => {
  //     history.push(``)
  // }

  return (
    <>
      <h1>Message List</h1>
      {JSON.stringify(msgList)}
      <h1>Message List</h1>
      {msgList.map((message) => {
        return (
          <div key={message.id}>
            <h2> {message.content}</h2>
            {/* Conditional rendering using user store, edit and delete button won't
            render if id of message is not tied to user_id. msg.user_id needs to match 
            user.id*/}
            <TextField
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              fullWidth
              placeholder="Type Message Here"
            ></TextField>
            <Button>Upvote</Button>
            <Button>Downvote</Button>
            <Button>Edit</Button>
            <Button>Delete</Button>
            <Button onClick={submitReply}>Reply</Button>
            <br></br>
            <br></br>
          </div>
        );
      })}
    </>
  );
}
export default MessageList;
