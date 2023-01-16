import { createStyles } from "@mantine/core";

import React, { useContext, useState } from "react";
import { IconFile, IconSend } from "@tabler/icons";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Input = () => {
  const { classes } = useStyles();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className={classes.input}>
      <div className={classes.send}>
        <div>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <IconFile width="80px" color="black" />
          </label>
        </div>
        <input
          type="text"
          placeholder="Type something..."
          className={classes.text}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button type="button" className={classes.button} onClick={handleSend}>
          <IconSend color="white" width="30px" />
        </button>
      </div>
    </div>
  );
};

export default Input;
const useStyles = createStyles(() => ({
  input: {
    height: "70px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  send: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    width: "90%",
    outline: "none",
    border: "none",
    padding: "15px",
  },
  button: {
    width: "50px",
    height: "50px",
    backgroundColor: "#0f2d2e",
    border: "none",
    outline: "none",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
}));
