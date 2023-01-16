import { createStyles } from "@mantine/core";
import { IconPhone, IconVideo } from "@tabler/icons";
import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import bg from "../img/official-whatsapp-background-image.jpg";
import Input from "./Input";
import Messages from "./Messages";

const ChatSection = () => {
  const { classes } = useStyles();
  const { data } = useContext(ChatContext);
  return (
    <div
      className={classes.ChatSection}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className={classes.chatInfo}>
        <div className={classes.chatUserInfo}>
          <img
            src={data.user?.photoURL}
            alt=""
            className={classes.chatUserImg}
          />
          <span className={classes.chatName}>{data.user?.displayName}</span>
        </div>
        <div className={classes.chatIcon}>
          <div className={classes.chatIconMore}>
            <IconPhone stroke={1.5} width="80px" />
          </div>
          <div style={{ borderLeft: "1px solid White" }}></div>
          <div className={classes.chatIconMore}>
            <IconVideo stroke={1.5} width="80px" />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default ChatSection;

const useStyles = createStyles(() => ({
  searchCode: {
    fontWeight: 700,
    fontSize: 15,
    borderBottom: "green",
    width: "370px",
    padding: "10px",
    outline: "none !important",
    backgroundColor: "transparent",
  },
  ChatSection: {
    width: "100%",
  },
  chatName: {
    fontSize: "25px",
  },
  chatInfo: {
    height: "50px",
    color: "White",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px",
  },

  chatUserImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  chatUserInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  chatIcon: {
    display: "flex",
    gap: "5px",
    cursor: "pointer",
  },
  chatIconMore: {
    "&:hover": {
      backgroundColor: "#C5C5C5",
      color: "black",
      borderRadius: "20px",
    },
  },
}));
