"use client";

import { createStyles, Title, Text, Button, Container, Group, rem } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function Custom404() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color='dimmed' size='lg' align='center' className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another
        URL.
      </Text>
      <Group position='center'>
        <Button
          variant='subtle'
          size='md'
          onClick={() => {
            router.push("/irm-dashboard");
          }}
        >
          Take me back to Dashboard
        </Button>
      </Group>
    </Container>
  );
}
