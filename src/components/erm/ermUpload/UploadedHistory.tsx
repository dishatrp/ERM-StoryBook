import { ActionIcon, Container, Flex, Paper, Text, createStyles, rem, useMantineTheme } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import React from "react";
import ErmTable from "../ermTable/ErmTable";
import { MRT_ColumnDef } from "mantine-react-table";
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
      // width: "40rem",
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

interface UploadHistory {
  columns: MRT_ColumnDef<any>[];
  data: any[];
}

const UploadedHistory = ({ columns, data }: UploadHistory) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <>
      <Paper bg={"none"} className={classes.upload_history_container}>
        <Flex bg={"none"} pr={"s16"} pl={"s16"} pt={"s6"} pb={"s6"} justify={"space-between"} align={"center"}>
          <Flex direction={"column"}>
            <Text className='bodyB3' color={theme.colors.black[7]}>
              Upload History
            </Text>
            <Text className='labelL3' color={theme.colors.black[2]}>
              A table with records of all previous uploads
            </Text>
          </Flex>
          <ActionIcon>
            <IconDots />
          </ActionIcon>
        </Flex>

        <ErmTable
          columns={columns}
          data={data}
          otherTableConfigurations={{
            enableTopToolbar: false,
            // enableRowSelection: true,
            mantineTableBodyProps: () => ({
              sx: {
                //backgroundColor: "red",
                // padding: "1rem",
                // border: "5px solid black",
              },
            }),
            mantineTableProps: () => {
              return {
                sx: {
                  // backgroundColor: "yellow",
                  //  padding: '1rem'
                  // border: "25px solid red",
                },
              };
            },
            mantineTableContainerProps: () => {
              return {
                sx: {
                  //backgroundColor: "red",
                },
              };
            },

            mantinePaperProps: ({ table }) => {
              return {
                shadow: "none",
                withBorder: false,
                radius: "16px",
                sx: (theme) => {
                  return {
                    border: `1px solid ${theme.colors.gray["4"]}`,
                    // height: "300px",
                    height: "300px", // Set specific height here
                    overflow: "auto",
                  };
                },
              };
            },
            mantineTableHeadProps: (props) => {
              return {
                sx: {
                  boxShadow: "none",
                },
              };
            },
            mantineTableHeadRowProps: (props) => {
              return {
                sx: {
                  boxShadow: "none",
                },
              };
            },
          }}
        />
      </Paper>
    </>
  );
};

export default UploadedHistory;

// const columns = [
//   {
//     accessorKey: "fileName",
//     header: "File Name",
//   },

//   {
//     accessorKey: "uploadTime",
//     header: "Upload Time",
//   },

//   {
//     accessorKey: "uploadedBy",
//     header: "Uploaded By",
//   },
//   {
//     accessorKey: "rows",
//     header: "Rows",
//   },
// ];
