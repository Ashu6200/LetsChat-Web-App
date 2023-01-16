import { createStyles } from "@mantine/core";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        className={classes.message}
        style={{
          flexDirection: `${
            message.senderId === currentUser.uid && "row-reverse"
          }`,
        }}
      >
        <div className={classes.messageContent}>
          <p
            className={classes.p}
            style={{
              backgroundColor: `${
                message.senderId === currentUser.uid && "#0f2d2e"
              }`,
              color: `${message.senderId === currentUser.uid && "white"}`,
              borderRadius : `${message.senderId === currentUser.uid && "15px 0px 15px 15px"}`,
            }}
          >
            {message.text}
          </p>
          {message.img && (
            <img src={message.img} alt="" style={{ width: "50%" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
const useStyles = createStyles(() => ({
  message: {
    display: "flex",
    gap: "20px",
    marginBottom: "-25px",
  },

  messageContent: {
    maxWidth: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  p: {
    backgroundColor: "white",
    padding: "10px 20px",
    borderRadius: "0px 15px 15px 15px",
    maxWidth: "max-content",
  },
}));
