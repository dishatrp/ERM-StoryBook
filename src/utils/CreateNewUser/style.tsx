import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  logoEdit: {
    stroke: theme.colors.gray[5],
    cursor: "pointer",
  },
  logoDelete: {
    stroke: theme.colors.red[5],
    cursor: "pointer",
  },
  radious: {
    marginTop: theme.spacing.lg,
  },
  root: {
    fontSize: 16,
    color: theme.colors.gray[5],
  },
}));
