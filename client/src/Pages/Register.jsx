import React, { useState } from "react";
import { Paper, createStyles, Text, Group, Divider } from "@mantine/core";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import bg from "../img/AuthImg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { classes } = useStyles();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
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
          Welcome to LetsChat, Register with
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            className={classes.input}
            type="text"
            label="Name"
            placeholder="Your name"
          />

          <input
            className={classes.input}
            type="text"
            label="Email"
            placeholder="Your Email"
          />

          <input
            className={classes.input}
            type="password"
            label="Password"
            placeholder="Your password"
          />

          <input type="file" />
          <label>Add Profile Picture</label>

          <button
            type="submit"
            style={{
              backgroundColor: "#0f2d2e",
              marginTop: "25px",
              height: "40px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Register
          </button>
          {loading && "Please wait..."}
          {err && <span>Something went wrong</span>}
          <Group position="apart" mt="xl" style={{ textDecoration: "none" }}>
            <Link to="/login" className={classes.link}>
              "Already have an account? Login"
            </Link>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Register;

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
