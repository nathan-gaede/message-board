import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import "../App/App.css";
import MessageList from "../MessageList/MessageList";

function MessageForm() {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    setMsg("");
    dispatch({
      type: "POST_MSG",
      payload: {
        content: msg,
      },
    });
  };
  return (
    <div>
      <Card>
        <CardHeader />
        <h3>Message Board!</h3>
        <br></br>
        <TextField
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          fullWidth
          placeholder="Type Message Here"
          value={msg}
        ></TextField>
        <br></br>
        <br></br>
        <Button onClick={submitForm}> Post Message </Button>
        <MessageList />
      </Card>
    </div>
  );
}

export default MessageForm;
