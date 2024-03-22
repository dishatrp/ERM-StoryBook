import { Flex, Paper, Progress, Text, createStyles, rem, useMantineTheme } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import React from "react";
interface UploadBar {
  val: number;
}

const UploadBar = ({ val }: UploadBar) => {
  const theme = useMantineTheme();
  const { classes } = createStyles((theme) => {
    return {
      closeIcon: {
        cursor: "pointer",
      },
    };
  })();
  return (
    <>
      <Flex
        p={"s16"}
        direction={"column"}
        sx={(theme) => ({
          borderRadius: theme.other.spacing.s12,
          border: `1px solid ${theme.colors.gray[4]}`,
        })}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Flex justify={"flex-start"} align={"center"} gap={"s12"} pt={"s10"} pb={"s10"} pl={"s4"} pr={"s4"}>
            <Text className='bodyB3'>{val < 100 ? "Uploading..." : "Uploaded!"}</Text>
            <Text className='bodyB3'>|</Text>
            <Text className='bodyB3'>{val}%</Text>
            <Text className='labelL1' color={theme.colors.black[2]}>
              (Timber.co665..45.xls.x)
            </Text>
          </Flex>
          <IconCircleX size={rem(24)} color='#ABABAB' className={classes.closeIcon} />
        </Flex>
        <Progress
          value={val}
          color={theme.colors.waterfall[7]}
          h={"s12"}
          sx={(theme) => {
            return {
              borderRadius: theme.other.spacing.s20,
            };
          }}
        />
        <Paper bg={"none"} p={"s4"}>
          <Text className='labelL3' color={theme.colors.black[2]}>
            {100 - val}s left
          </Text>
        </Paper>
      </Flex>
    </>
  );
};

export default UploadBar;
