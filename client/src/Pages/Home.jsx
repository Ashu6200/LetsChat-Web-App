import { createStyles } from "@mantine/core";
import React from "react";
import ChatSection from "../Components/ChatSection";
import { SideBar } from "../Components/SideBar";

const useStyles = createStyles(() => ({
  home: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
}));
const Home = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.home}>
      <SideBar />
      <ChatSection />
    </div>
  );
};

export default Home;
