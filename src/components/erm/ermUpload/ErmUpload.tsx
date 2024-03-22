import { Flex, Paper, SimpleGrid, createStyles } from "@mantine/core";
import React, { useState } from "react";
import PageTitle from "../genericComponents/PageTitle";
import { FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import Upload from "@/components/upload/Upload";
import UploadSummary from "./UploadSummary";
import UploadBar from "./UploadBar";
import MantineTransition from "@/components/transition/MantineTransition";
import MantineTab from "../genericComponents/MantineTab";
import ErmMapping from "../ermMapping/ErmMapping";
import UploadedHistory from "./UploadedHistory";
import { MRT_ColumnDef } from "mantine-react-table";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";
import Loader from "@/components/Loader";

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
      // flexDirection: "row",
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
      //minWidth: rem(525),
      // minHeight: rem(442),
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
    stepContainer: {
      border: `1px dashed ${theme.colors.gray[4]}`,
      padding: theme.other.spacing.s20,
      borderRadius: theme.other.spacing.s16,
      minHeight: "75vh",
    },
  };
});

interface ERMUpload {
  selecteHandler: (files: FileWithPath[]) => void;
  active: boolean;
  tabs: number;
  progress: number;
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  selectedFile: File | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  title: string;
  description: string;
  publishHandler: () => void;
  isLoadingPublish: boolean;
  LastUploadFile: string;
  TotalFileUpload: number;
  columns: MRT_ColumnDef<any>[];
  data: any[];
}

const ErmUpload = ({
  selecteHandler,
  active,
  tabs,
  progress,
  setTabs,
  selectedFile,
  title,
  description,
  publishHandler,
  isLoadingPublish,
  LastUploadFile,
  TotalFileUpload,
  columns,
  data,
}: ERMUpload) => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loader visible={isLoadingPublish} />
      <Paper className={classes.main} bg={"none"}>
        <Paper pt={"s40"} pb={"s20"} pr={"s20"} bg={"none"}>
          <Flex p={"s20"} justify={"space-between"} align={"center"}>
            <PageTitle title={title} description={description} />
            <MantineBtn onClick={publishHandler} isLoading={isLoadingPublish}>
              Publish
            </MantineBtn>
          </Flex>
        </Paper>
        <Paper className={classes.stepContainer}>
          <MantineTab value={String(tabs)} onTabChange={setTabs}>
            <Flex justify={"space-between"} align={"center"} direction={"row"}>
              <MantineTab.List>
                <MantineTab.Tab value={"0"}>Upload File</MantineTab.Tab>
                <MantineTab.Tab value={"1"} disabled={active}>
                  View Upload File
                </MantineTab.Tab>
              </MantineTab.List>
            </Flex>

            <MantineTab.Panel value={"0"}>
              <SimpleGrid cols={2} className={classes.container} spacing='s20'>
                <Flex className={classes.upload_container}>
                  <Flex className={classes.upload_sec}>
                    <Upload
                      selectedFile={selectedFile}
                      isLoading={isLoading}
                      selectHandler={selecteHandler}
                      uploadTypes={[MIME_TYPES.xlsx]}
                      uploadTypeName={".xlsx"}
                      uploadFileName={"Excel"}
                    />
                    <MantineTransition condition={progress > 0}>
                      <UploadBar val={progress} />
                    </MantineTransition>
                  </Flex>
                  <Paper bg={"none"} p={"s8"}>
                    <UploadSummary LastUploadFile={LastUploadFile} TotalFileUpload={TotalFileUpload} />
                  </Paper>
                </Flex>
                <UploadedHistory columns={columns} data={data} />
              </SimpleGrid>
            </MantineTab.Panel>
            <MantineTab.Panel value={"1"}>
              <ErmMapping />
            </MantineTab.Panel>
          </MantineTab>
        </Paper>
      </Paper>
    </>
  );
};

export default ErmUpload;
