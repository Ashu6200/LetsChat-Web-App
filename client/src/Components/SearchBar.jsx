import { createStyles, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import ChatUser from "./ChatUser";

const SearchBar = () => {
  const { classes } = useStyles();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  //if u enter the enter it search for user
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <div>
      <span
        style={{
          color: "black",
          paddingLeft: "16px",
          fontSize: "20px",
          fontWeight: "bolder",
        }}
      >
        Chats
      </span>
      <TextInput
        placeholder="Search Users"
        icon={<IconSearch size={12} stroke={1.5} />}
        size="xs"
        rightSectionWidth={100}
        className={classes.searchCode}
        style={{ border: "none", outline: "none" }}
        mb="sm"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      {err && <span>User not found!</span>}
      {user && (
        <div className={classes.userChat} onClick={handleSelect}>
          <img src={user.photoURL} alt="DP" className={classes.userImg} />
          <div className={classes.userInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
      <ChatUser />
    </div>
  );
};

export default SearchBar;
const useStyles = createStyles(() => ({
  searchCode: {
    fontWeight: 700,
    fontSize: 15,
    width: "370px",
    padding: "10px",
    backgroundColor: "transparent",
  },
  userChat: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "black",
    cursor: "pointer",
    paddingLeft: "25px",
  },
  userImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userInfo: { fontSize: "14px", fontWeight: "500" },
}));
