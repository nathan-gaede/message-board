import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const EditMessage = () => {
  console.log("In EditMessage");
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const message = useSelector((store) => store.message);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/msg/${id}`)
        .then((response) => {
          const msg = response.data;
          console.log("Axios fetch msg", msg[0]);
          setMsg(msg[0].content);
        })
        .catch((e) => {
          console.log("Error fetching msg for EDIT", e);
          alert("Problem in Edit useEffect");
        });
    }
  }, [id]);

  const submitReply = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_MSG",
      payload: { content: msg, id },
    });
    history.goBack();
  };

  return (
    <div>
      {JSON.stringify(message)}
      <h1>Edit Message</h1>
      <h2>Message ID is {message.id}</h2>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      ></input>
      <button onClick={submitReply}>Submit Changes</button>
    </div>
  );
};

export default EditMessage;
