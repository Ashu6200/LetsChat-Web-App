import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Title,
} from "@mantine/core";
import { IconMessage2, IconLogout } from "@tabler/icons";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import SearchBar from "./SearchBar";
import UserButton from "./UserButtton";

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const IconBar = (
  <div style={{ backgroundColor: "#0f2d2e", paddingTop: "100px" }}>
    <Stack justify="center" spacing={0}>
      <Link to="/">
        <NavbarLink icon={IconMessage2} label="Chart" />
      </Link>
      <NavbarLink
        icon={IconLogout}
        label="Logout"
        onClick={() => signOut(auth)}
      />
    </Stack>
  </div>
);

export function SideBar() {
  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <Navbar height="100%" width={{ sm: 450 }} styles={{ height: "100%" }}>
      <Navbar.Section
        grow
        width={{ base: 400 }}
        style={{ display: "flex", height: "100%" }}
      >
        {IconBar}
        <div>
          <Title order={2} className={classes.title} pl="10px">
            LetsChat
          </Title>
          <SearchBar />
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <UserButton
          image={currentUser.photoURL}
          name={currentUser.displayName}
          email={currentUser.email}
        />
      </Navbar.Section>
    </Navbar>
  );
}

const useStyles = createStyles((theme) => ({
  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "white",
        color: "white",
      }).background,
      color: theme.fn.variant({ variant: "white", color: "white" }).color,
    },
  },
  link: {
    width: 50,
    height: 50,
    color: "white",
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      color: "black",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "white",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  title: {
    boxSizing: "border-box",
    fontSize: "30px",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    paddingTop: 18,
    height: 60,
  },
  vl: {
    borderLeft: `5spx solid black`,
    height: "500px",
  },
  img: {
    width: "10%",
  },
  footer: {
    width: "450px",
    backgroundColor: "#0f2d2e",
  },
}));
