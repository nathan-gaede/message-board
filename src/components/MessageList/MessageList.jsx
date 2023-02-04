import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UserPage from "../UserPage/UserPage";

function MessageList() {
  const msgList = useSelector((store) => store.message);
  const user = useSelector((store) => store.user);
  //   console.log("What is user store data?", user);
  //   console.log(msgList);
  const dispatch = useDispatch();
  const history = useHistory();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_MSG" });
  }, []);

  //   const checkUser = (userValue) => {
  //     console.log("checkUser", userValue);
  //     console.log("Finding user id", msgList);
  //     if (userValue === user.id) {
  //       return (
  //         <>
  //           <Button onClick={deletePost}>Delete</Button>
  //           <Button>Edit</Button>
  //         </>
  //       );
  //     }
  // else if (userValue !== msgList.user_id) {
  //   return null;
  // }
  //   };

  const deletePost = (msgId) => {
    console.log(msgId);
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch({
        type: "DELETE_POST",
        payload: {
          id: msgId,
        },
      });
    }
  };

  const editPost = (msgId) => {
    console.log("Edit ID is", msgId);
    history.push(`/edit/${msgId}`);
  };

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
            {/* https://beta.reactjs.org/learn/conditional-rendering 
            Logical AND operator && 
            Render when a condition is true and nothing otherwise. */}
            {user.id === message.user_id && (
              <>
                <Button onClick={() => deletePost(message.id)}>Delete</Button>
                <Button onClick={() => editPost(message.id)}>Edit</Button>
              </>
            )}
            {/* {checkUser(message.user_id)} */}
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
