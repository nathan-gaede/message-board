import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import "../App/App.css";

function MessageForm() {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    dispatch({
      type: "POST_MSG",
      payload: {
        msg,
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
        ></TextField>
        <br></br>
        <br></br>
        <Button>Upvote</Button>
        <Button>Downvote</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Button>Reply</Button>
        <br></br>
        <br></br>
        <Button onClick={submitForm}> Post Message </Button>
      </Card>
    </div>
  );
}

export default MessageForm;
