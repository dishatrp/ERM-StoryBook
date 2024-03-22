import { useRef } from "react";
import { Text, Group, Button, createStyles, rem, Flex, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconStack2,
  IconUpload,
  IconFileTypeXls,
  IconUser,
} from "@tabler/icons-react";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    // position: "relative",
    // marginBottom: rem(30),
  },

  dropzone: {
    backgroundColor: theme.colors.gray[1],
    border: `1px solid ${theme.colors.gray[4]}`,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "230px",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    // position: "absolute",
    // width: rem(250),
    // left: `calc(50% - ${rem(125)})`,
    // bottom: rem(-20),
  },
}));

interface Upload {
  selectedFile: File | undefined;
  isLoading: boolean;
  selectHandler: (files: FileWithPath[]) => void;
  fileHandler?: () => {};
  uploadTypes: string[];
  uploadTypeName: string;
  uploadFileName: string;
}

const Upload = ({ selectedFile, selectHandler, isLoading, uploadTypes, uploadTypeName, uploadFileName }: Upload) => {
  const { classes } = useStyles();
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  return (
    <Dropzone
      openRef={openRef}
      onDrop={selectHandler}
      className={classes.dropzone}
      radius='md'
      accept={uploadTypes}
      disabled={isLoading}
    >
      <div style={{ pointerEvents: "none" }}>
        <Group position='center'>
          <Dropzone.Accept>
            <IconDownload size={rem(50)} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Flex justify={"center"} align={"center"} direction={"column"} gap={"s16"}>
              <IconFileTypeXls size={rem(74)} color='#ABABAB' stroke={1} />
              <Text className='bodyB4' color={theme.colors.black[4]}>
                Drag & Drop
              </Text>
            </Flex>
          </Dropzone.Idle>
        </Group>

        <Text ta='center' fz='lg' mt='xl'>
          <Dropzone.Accept>Drop {uploadTypeName} files here</Dropzone.Accept>
          <Dropzone.Reject>{uploadTypeName} file less than 30mb</Dropzone.Reject>
          <Dropzone.Idle>
            {selectedFile && (
              <Text ta='center' fz={"xs"} color={theme.colors.red[5]}>
                {selectedFile?.name}
              </Text>
            )}
          </Dropzone.Idle>
        </Text>
      </div>
    </Dropzone>
  );
};

export default Upload;
