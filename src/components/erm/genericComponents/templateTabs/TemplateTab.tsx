import { Flex, Text, createStyles, rem } from "@mantine/core";
import React, { ReactNode } from "react";
import MantineCheckbox from "../../inputFields/MantineCheckbox";
interface TemplateTab {
  checked: boolean;
  checkboxName: string;
  isTabSelcted: boolean;
  tabHandler: (e: React.MouseEvent<HTMLElement>) => void;
  checkboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tabTitle: ReactNode;
  tabDescription: ReactNode;
}
const TemplateTab = ({
  checked,
  checkboxName,
  isTabSelcted,
  tabHandler,
  checkboxHandler,
  tabTitle,
  tabDescription,
}: TemplateTab) => {
  const useStyles = createStyles((theme) => {
    return {
      tabHeading: {
        color: theme.colors.black[8],
      },
      description: {
        color: isTabSelcted ? theme.colors.black[1] : theme.colors.gray[6],
      },
      templateTabContainer: {
        transition: "all 0.5s ease-out",
        border: "0.5px solid #e9ecef",
        borderRadius: rem(12),
        boxShadow: !isTabSelcted ? "" : "2px 4px 10px 0px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        backgroundColor: isTabSelcted ? theme.colors.gray[0] : theme.colors.gray[2],
      },
    };
  });

  const { classes } = useStyles();

  return (
    <>
      <Flex
        className={classes.templateTabContainer}
        pt={"s20"}
        pb={"s16"}
        pr={"s16"}
        pl={"s16"}
        // m={"s20"}
        justify={"center"}
        align={"center"}
        gap={"s16"}
        // maw={396}
        onClick={tabHandler}
      >
        <MantineCheckbox name={checkboxName} checked={checked} onChange={checkboxHandler} />
        <Flex justify={"center"} direction={"column"} w={"100%"}>
          <Text className={`bodyB3 ${classes.tabHeading}`}>{tabTitle}</Text>
          <Text fz={14} style={{ fontFamily: "latoRegular" }} className={`labelL2 ${classes.description}`} w={"100%"}>
            {tabDescription}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default TemplateTab;
