import { createStyles, rem } from "@mantine/core";

/* CreateStyles is used here for styling the field.Which passes as a object and used inside the className.   */
export const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    // height: "126%",
  },
  wrapper: {
    marginBottom: "5px",
  },
  error: {
    position: "absolute",
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rem(18),
    overflow: "hidden",
  },

  logo: {
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[5]}`,
  },
}));
