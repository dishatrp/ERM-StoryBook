import { Flex, Text, createStyles, rem, useMantineTheme } from "@mantine/core";
import { IconFileTypeXls } from "@tabler/icons-react";
import React from "react";
const useStyles = createStyles((theme) => {
  return {
    main: {
      paddingLeft: theme.other.spacing.s40,
      paddingRight: theme.other.spacing.s40,
    },
    container: {
      padding: theme.other.spacing.s12,
      backgroundColor: theme.colors.gray[1],
      borderRadius: theme.other.spacing.s16,
    },
    upload_container: {
      flexDirection: "column",
      borderRadius: theme.other.spacing.s16,
      gap: theme.other.spacing.s12,
    },
    upload_sec: {
      flexDirection: "column",
      border: `1px dashed ${theme.colors.gray[4]}`,
      borderRadius: theme.other.spacing.s16,
      padding: theme.other.spacing.s16,
      justifyContent: "space-between",
      background: theme.colors.gray[0],
      minWidth: rem(525),
      minHeight: rem(442),
      width: "100%",
    },
    upload_history_container: {
      paddingLeft: theme.other.spacing.s8,
      paddingRight: theme.other.spacing.s8,
      paddingTop: theme.other.spacing.s12,
      paddingBottom: theme.other.spacing.s12,
      borderRadius: theme.other.spacing.s16,
      border: `1px solid ${theme.colors.gray[4]}`,
    },
  };
});

interface UploadSummaryInterface {
  LastUploadFile: string;
  TotalFileUpload: number;
}

const UploadSummary = ({ LastUploadFile, TotalFileUpload }: UploadSummaryInterface) => {
  const theme = useMantineTheme();

  return (
    <>
      <Flex
        direction={"column"}
        sx={(theme) => {
          return {
            borderRadius: theme.other.spacing.s16,
            padding: theme.other.spacing.s16,
            backgroundColor: theme.colors.gray[0],
          };
        }}
      >
        <Flex
          pr={"s20"}
          pl={"s20"}
          direction={"column"}
          gap={"s4"}
          sx={(theme) => {
            return {
              borderBottom: `1px solid ${theme.colors.gray[4]}`,
            };
          }}
        >
          <Text color={theme.colors.black[7]} className={"bodyB3"}>
            Last Uploaded File
          </Text>
          <Flex align={"center"} gap={"s10"} pt={"s10"} pb={"s10"}>
            <IconFileTypeXls color={theme.colors.spring[9]} />
            <Text color={theme.colors.black[2]} className={"bodyB3"}>
              {LastUploadFile}
            </Text>
          </Flex>
        </Flex>
        <Flex
          pt={"s10"}
          pb={"s10"}
          pr={"s20"}
          pl={"s20"}
          direction={"column"}
          gap={"s4"}
          sx={(theme) => {
            return {
              borderBottom: `1px solid ${theme.colors.gray[4]}`,
            };
          }}
        >
          <Text color={theme.colors.black[4]} className={"bodyB3"}>
            Total Number of File Uploaded
          </Text>
          <Text color={theme.colors.black[7]} className={"bodyB3"}>
            {TotalFileUpload}
          </Text>
        </Flex>
        <Flex
          pt={"s10"}
          pb={"s10"}
          pr={"s20"}
          pl={"s20"}
          direction={"column"}
          gap={"s4"}
          sx={(theme) => {
            return {
              borderBottom: `1px solid ${theme.colors.gray[4]}`,
            };
          }}
        >
          <Text color={theme.colors.black[4]} className={"bodyB3"}>
            Average Upload Time
          </Text>
          <Text color={theme.colors.black[7]} className={"bodyB3"}>
            25 mins
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default UploadSummary;
