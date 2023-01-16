import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    // padding: theme.spacing.md,
    padding: "12.5px",
    color: "white",
  },
}));

const UserButton = ({ image, name, email }) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};
export default UserButton;
