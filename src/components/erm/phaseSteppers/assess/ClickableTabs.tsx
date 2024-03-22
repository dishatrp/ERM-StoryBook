import { Text, useMantineTheme } from "@mantine/core";
import { Flex, createStyles } from "@mantine/core";
import { IconHandClick } from "@tabler/icons-react";
import React from "react";
interface Heading {
  headText: string;
  subHeadText: string;
  onClick: () => void;
}
const ClickableTabs = ({ headText, subHeadText, onClick }: Heading) => {
  const theme = useMantineTheme();
  
  const { classes } = createStyles((theme) => {
    return {
      container: {
        height: "100%",
        padding: `${theme.other.spacing.s16} ${theme.other.spacing.s64} ${theme.other.spacing.s16} ${theme.other.spacing.s32}`,
        background: theme.colors.gray[0],
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: theme.other.spacing.s20,
        cursor: "pointer",
        transition: "all 0.3s",
        ":hover": {
          background: theme.colors.gray[1],
        },
      },
    };
  })();

  return (
    <Flex align={"center"} justify={"space-between"} gap={"s10"} className={classes.container} onClick={onClick}>
      <Flex direction={"column"} gap={"s6"}>
        <Text className={"bodyB1"} color={theme.colors.black[7]}>
          {headText}
        </Text>
        <Text className={"labelL2"} color={theme.colors.black[4]}>
          {subHeadText}
        </Text>
      </Flex>
      <IconHandClick
        style={{
          width: "36px",
          height: "36px",
          color: theme.colors.gray[4],
        }}
      />
    </Flex>
  );
};

export default ClickableTabs;
