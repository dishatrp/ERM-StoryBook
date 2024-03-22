import { Navbar, Group, Code, ScrollArea, createStyles, rem } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons-react";
import listData from "./data.json";
import { LinksGroup } from "./LinksGroup";
import { useLoginMutation } from "@/store/api/authApiSlice";
import { useEffect, useState } from "react";
import { Page } from "@/store/interface/LoginInterface";
// Styles

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

interface navbarNestedPropType {
  indexOfSelectedOption: string;
}

export function NavbarNested({ indexOfSelectedOption }: navbarNestedPropType) {
  const { classes } = useStyles();
  const [polices, setPolices] = useState<Page[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const polices = JSON.parse(localStorage.getItem("polices") ?? "");
        setPolices(polices);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const datas =
    polices
      .filter((d) => d?.pageMst_ID == indexOfSelectedOption)[0]
      ?.children?.map((d) => {
        const firstHyphenIndex = d.pageMst_SLUG.indexOf("-");

        const resultString = d.pageMst_SLUG.slice(0, firstHyphenIndex + 1);

        // console.log(`/ ${resultString.toLowerCase()}`);

        return {
          label: d.pageMst_ITEM,
          icon: IconGauge,
          //icon: d.ICON,
          link: "/" + d.pageMst_SLUG,
        };
      }) || [];

  return (
    <Navbar height={"100%"} width={{ sm: 228 }} p='md' className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          {datas.map((item) => (
            <LinksGroup routeLink={item.link} {...item} key={item.label} item={item} />
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
