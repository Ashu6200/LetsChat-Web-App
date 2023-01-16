import React, { useState } from "react";
import { Paper, createStyles, Text, Group, Divider } from "@mantine/core";
import bg from "../img/AuthImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const { classes } = useStyles();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div
      className={classes.wrapper}
      height={750}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper className={classes.form} radius={0} p={30}>
        <Text weight={700} className={classes.title}>
          Welcome to LetsChat, Login with
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <input
            className={classes.input}
            required
            label="Email"
            placeholder="Your Email"
          />

          <input
            className={classes.input}
            required
            label="Password"
            placeholder="Your password"
          />
          <button
            style={{
              backgroundColor: "#0f2d2e",
              marginTop: "25px",
              height: "40px",
              borderRadius: "5px",
              color: "white",
            }}
            type="submit"
          >
            Login
          </button>
          {err && <span>Invalid credential</span>}

          <Group position="apart" mt="xl" style={{ textDecoration: "none" }}>
            <Link to="/register" className={classes.link}>
              "Don't have an account? Register"
            </Link>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    overflow: "hidden",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    boxSizing: "border-box",
    fontSize: "20px",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    paddingTop: 18,
    height: 60,
  },
  input: {
    height: "30px",
    marginBottom: "25px",
    borderRadius: "5px",
    border: "1px solid gray",
    outline: "none",
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));
