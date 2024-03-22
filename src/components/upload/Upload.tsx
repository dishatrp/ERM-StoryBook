import { useRef } from "react";
import { Text, Group, Button, createStyles, rem, Flex } from "@mantine/core";
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
import ButtonUpload from "./ButtonUpload";
import { Container } from "@mantine/core";
import MantineBtn from "../erm/genericComponents/mantineBtn/MantineBtn";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    // position: "relative",
    // marginBottom: rem(30),
  },

  dropzone: {
    backgroundColor: "transparent",
    // borderWidth: rem(1),
    border: "none",
    // paddingBottom: rem(50),
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
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
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
            <Flex align={"center"} justify={"center"} gap={"s6"} direction={"column"}>
              <Flex justify={"center"} align={"center"} gap={"s6"}>
                {/* <Buttons rightIcon={<IconUser />}>Button</Buttons> */}
                <Container p={0} m={0}>
                  <MantineBtn disabled={isLoading} size='sm'>
                    Browse
                  </MantineBtn>
                </Container>
              </Flex>
              <Flex justify={"center"} align={"center"} direction={"column"} p={"s10"}>
                <Text color={theme.colors.black[2]} className='labelL3'>
                  Uploaded File Should be either in <span style={{ color: theme.colors.black[4] }}>Excel </span>,{" "}
                  <span style={{ color: theme.colors.black[4] }}>XML</span> or{" "}
                  <span style={{ color: theme.colors.black[4] }}>CSV</span>
                </Text>
                <Text color={theme.colors.black[2]} className='labelL3'>
                  Maximum size should be less than <span style={{ color: theme.colors.black[4] }}>100 MB</span>
                </Text>
              </Flex>
            </Flex>
          </Dropzone.Idle>
        </Text>

        {selectedFile && (
          <Text ta='center' fz='sm' mt='xs' c='dimmed' style={{ color: "rgba(224, 49, 49, 0.7)" }}>
            {selectedFile?.name}
          </Text>
        )}
      </div>
    </Dropzone>
  );
};

export default Upload;
