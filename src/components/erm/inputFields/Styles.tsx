import { createStyles, rem } from "@mantine/core";

/* CreateStyles is used here for styling the field.Which passes as a object and used inside the className.   */
export const useStyles = createStyles((theme) => ({
  root: {
    // height: "75px",
  },
  wrapper: {
    // marginBottom: "5px",
  },
  error: {
    marginTop: theme.other.spacing.s4,
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
  input: {
    borderRadius: theme.other.spacing.s8, // theme.spacing["s8"],
    paddingTop: theme.other.spacing.s10, //theme.spacing["s10"],
    paddingBottom: theme.other.spacing.s10, //theme.spacing["s10"],
    paddingLeft: theme.other.spacing.s8, // theme.spacing["s8"],
    paddingRight: theme.other.spacing.s8, // theme.spacing["s8"],
    border: `1px solid ${theme.colors.gray[4]}`,
    backgroundColor: theme.colors.gray[0],

    ":focus": {
      border: `1px solid ${theme.colors.gray[4]}`,
    },

    "::placeholder": {
      color: theme.colors.black["2"],
      ...theme.other.typographyScales.labelL2,
    },
  },
  label: {
    display: "flex",
    ...theme.other.typographyScales.labelL2,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.other.spacing.s4, // theme.spacing["s4"],
    paddingLeft: theme.other.spacing.s2, // theme.spacing["s2"],
    color: theme.colors.black[8],
  },
  tooltip: {
    padding: `${theme.other.spacing.s2} ${theme.other.spacing.s8}`,
    //${theme.spacing["s2"]} ${theme.spacing["s8"]}
  },

  description: {
    ...theme.other.typographyScales.labelL1,
    color: theme.colors.black[2],
  },
}));
