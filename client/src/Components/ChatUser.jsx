import { createStyles } from "@mantine/core";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const ChatUser = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const { classes } = useStyle();
  return (
    <div className={classes.chatUser}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].data - a[1].data)
        .map((chat) => (
          <div
            className={classes.chatUserList}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
              className={classes.chatUserImg}
            />
            <div className={classes.userChatInfo}>
              <span> {chat[1].userInfo.displayName}</span>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatUser;
const useStyle = createStyles(() => ({
  chatUser: {
    alignItems: "center",
    justifyItems: "center",
    paddingLeft: "15px",
  },
  chatUserList: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "black",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#C5C5C5",
      borderRadius: "20px",
    },
  },
  chatUserImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userChatInfo: { fontSize: "14px", fontWeight: "600" },
}));
