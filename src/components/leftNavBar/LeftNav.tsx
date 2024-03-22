import { ActionIcon, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { Image } from "@mantine/core";
import { createStyles, Navbar, UnstyledButton, Tooltip, rem } from "@mantine/core";

import { IconHome2 } from "@tabler/icons-react";

import { NavbarNested } from "./NavbarNested";

import { Page } from "@/store/interface/LoginInterface";
import { useRouter } from "next/router";
import { renderIcon } from "./helper";
import { useFetchTemplateDataQuery } from "@/store/api/ermNewApiSlice";

// Styles for Navigation
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    zIndex: -1,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  aside: {
    flex: `0 0 ${rem(72)}`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    paddingTop: "10px",
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    zIndex: -1,
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

// Custom Nav Animation
const customNavAnim = {
  in: { opacity: 1, transform: "translateX(0px)" },
  out: { opacity: 0, transform: "translateX(-200px)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity",
};

// Functional Component
export function LeftNav() {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Releases");
  const [hover, hoverChange] = useState(false);
  const [polices, setPolices] = useState<Page[]>([]);

  const [idActive, idActiveChange] = useState("1");

  useEffect(() => {
    try {
      // console.log("localStorage.getItem('polices;)", localStorage.getItem("polices"));

      if (typeof window !== "undefined" && localStorage.getItem("polices")) {
        const polices = JSON.parse(localStorage.getItem("polices") || "");
        setPolices(polices);
      }
    } catch (error) {
      console.log("JSON>OOOOO", error);
    }
  }, []);

  interface Page {
    pageMst_ID: string;
    pageMst_ITEM: string;
    pageMst_SLUG: string;
    pageMst_ACTION_URL: string | null;
    pageMst_HIERARCHY: string;
    pageMst_IS_ACTIVE: "Y";
    ID: string;
    POLICY_ID: string;
    ITEM_ID: string;
    READOPS: string;
    CREATEOPS: string;
    UPDATEOPS: string;
    DELETEOPS: string;
    CRD_DATE: string;
    LAST_UPD_DATE: string;
    CRD_USR_ID: string;
    UPD_USR_ID: string;
    ICON: string | null;
    children?: Page[];
  }

  const mainLinksData = polices
    //.filter((d: any) => d.children)
    .map((d: Page) => ({
      //icon: IconHome2,
      icon: renderIcon(d.pageMst_SLUG),
      label: d.pageMst_ITEM,
      //id:d.id,
      id: d.pageMst_ID,
    }));

  // Mapping the Logo in left bar
  const mainLinks = mainLinksData.map((link) => {
    return (
      <Tooltip label={link.label} position='right' withArrow transitionProps={{ duration: 0 }} key={link.id}>
        <UnstyledButton
          onClick={() => {
            setActive(link.label);
            //idActiveChange(link.id);
            idActiveChange(link.id);
          }}
          className={cx(classes.mainLink, {
            [classes.mainLinkActive]: link.label === active,
          })}
        >
          {/* <link.icon size='1.4rem' stroke={1.5} /> */}
          {/* <Image src={link.icon} alt='icon' /> */}
          {/* <ActionIcon color='indigo' variant='transparent'> */}
          {link.icon}
          {/* </ActionIcon> */}
        </UnstyledButton>
      </Tooltip>
    );
  });

  // Component
  return (
    <>
      <Navbar
        zIndex={99}
        width={hover ? { sm: 300 } : { sm: 72 }}
        style={{
          transition: "all 0.2s ease-out",
          position: "sticky",
        }}
      >
        <Navbar.Section
          grow
          className={classes.wrapper}
          onMouseEnter={() => hoverChange(true)}
          onMouseLeave={() => hoverChange(false)}
        >
          <div className={classes.aside}>{mainLinks}</div>

          <Transition transition={customNavAnim} duration={160} timingFunction='ease-out' mounted={hover}>
            {(styles) => (
              <div style={styles} className={classes.main}>
                <NavbarNested indexOfSelectedOption={idActive} />
              </div>
            )}
          </Transition>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
