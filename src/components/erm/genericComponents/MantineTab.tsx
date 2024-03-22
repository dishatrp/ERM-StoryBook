import { Tabs, createStyles, rem } from "@mantine/core";
import React, { ReactNode } from "react";

interface MantineTheme {
  defaultValue?: number | string | any;
  children: React.ReactNode;
  onTabChange?: (e: any) => void;
  value?: string;
}

const MantineTab = ({ defaultValue, children, value, onTabChange }: MantineTheme) => {
  const useStyles = createStyles((theme) => {
    return {
      root: {},
      tabsList: {},
      tab: {
        // styles for inactive tab
        transition: "all 0.3s ease-in-out",
        borderRadius: theme.other.spacing.s16,
        background: theme.colors.gray[2],
        padding: `${theme.other.spacing.s8} ${theme.other.spacing.s12}`,
        ...theme.other.typographyScales.labelL2,
        color: theme.colors.black[4],
        border: `1px solid ${theme.colors.gray[2]}`,
        ":hover": {
          background: theme.colors.gray[3],
          border: `1px solid ${theme.colors.gray[3]}`,
        },
        // styles for active tab
        "&[data-active]": {
          background: theme.colors.gray[8],
          color: theme.colors.gray[0],
          transition: "all 0.3s ease-in-out",
          border: `1px solid ${theme.colors.sea[5]}`,
          ":hover": {
            background: theme.colors.gray[9],
          },
        },
        ":focus": {
          outline: "none",
        },
      },
      tabRightSection: {},
      tabLabel: {},
      tabIcon: {},
      panel: {
        marginTop: theme.other.spacing.s10,
      },
    };
  });

  const { classes } = useStyles();

  return (
    <Tabs
      // color={"gray.8"}
      variant='pills'
      keepMounted
      loop
      defaultValue={defaultValue}
      value={value}
      onTabChange={onTabChange}
      classNames={{
        root: classes.root,
        tabsList: classes.tabsList,
        tab: `${classes.tab}`,
        tabRightSection: classes.tabRightSection,
        tabLabel: classes.tabLabel,
        tabIcon: classes.tabIcon,
        panel: classes.panel,
      }}
    >
      {children}
    </Tabs>
  );
};

const TabList = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Tabs.List>{children}</Tabs.List>
    </>
  );
};

const Tab = ({ children, value, disabled }: { children: ReactNode; value: string; disabled?: boolean }) => {
  return (
    <>
      <Tabs.Tab value={value} disabled={disabled}>
        {children}
      </Tabs.Tab>
    </>
  );
};

const TabPanel = ({ children, value }: { children: ReactNode; value: string }) => {
  return (
    <>
      <Tabs.Panel value={value}>{children}</Tabs.Panel>
    </>
  );
};

MantineTab.List = TabList;
MantineTab.Tab = Tab;
MantineTab.Panel = TabPanel;

export default MantineTab;
