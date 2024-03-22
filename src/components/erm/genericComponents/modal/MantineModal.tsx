import { ReactNode } from "react";
import { Flex, MantineNumberSize, Modal, ScrollArea, Text, createStyles, useMantineTheme } from "@mantine/core";
import { IconSquareRoundedX } from "@tabler/icons-react";

interface MantineModal {
  showModal: boolean;
  onClose: () => void;
  children: ReactNode;
  modalHeadText: string;
  modalHeadSubText: string;
  size?: MantineNumberSize | undefined;
  fullScreen?: boolean;
}

const MantineModal = ({
  showModal,
  onClose,
  children,
  modalHeadText,
  modalHeadSubText,
  size,
  fullScreen = false,
}: MantineModal) => {
  const theme = useMantineTheme();
  const { classes } = createStyles((theme) => {
    return {
      body: {
        // padding: theme.other.spacing.s16,
        // padding: 0,
        // margin: 0,
      },
      root: {
        backgroundColor: theme.colors.gray[0],
        // margin: 0,
      },
      header: { backgroundColor: theme.colors.gray[0] },
      content: {
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.other.spacing.s24,
        padding: theme.other.spacing.s12,
        overflow: "hidden",
        // margin: 0,
      },
    };
  })();

  return (
    <>
      <Modal
        keepMounted
        lockScroll={false}
        fullScreen={fullScreen}
        size={size}
        scrollAreaComponent={ScrollArea.Autosize}
        classNames={{
          body: classes.body,
          root: classes.root,
          content: classes.content,
          header: classes.header,
        }}
        title={
          <>
            <Flex align={"center"} justify={"space-between"} p={"s8"}>
              <Flex direction={"column"}>
                <Text className={"headingH1"}>{modalHeadText}</Text>
                <Text className={"labelL1"} color={theme.colors.black[4]}>
                  {modalHeadSubText}
                </Text>
              </Flex>
            </Flex>
            {/* <IconSquareRoundedX
              onClick={onClose}
              style={{
                color: theme.colors.black[2],
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
            /> */}
          </>
        }
        centered
        opened={showModal}
        onClose={onClose}
        withCloseButton={true}
        overlayProps={{
          color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.7,
          blur: 15,
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default MantineModal;
