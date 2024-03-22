import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  root: {
    fontSize: 16,
    color: theme.colors.gray[5],
  },
  logoDelete: {
    stroke: theme.colors.red[5],
  },
  logoEdit: {
    stroke: theme.colors.gray[5],
  },
}));
