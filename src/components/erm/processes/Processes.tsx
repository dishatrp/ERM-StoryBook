import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Modal,
  ScrollArea,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import PageTitle from "../genericComponents/PageTitle";
import { IconArrowBigUpLine } from "@tabler/icons-react";
import {
  useCreateProcessAndSubProcessMutation,
  useDeleteProcessOrSubProcessMutation,
  useFetchProcessLIstQuery,
  useUpdateProcessAndSubprocessMutation,
} from "@/store/api/ermMasterDataSlice";
import ProcessesTree from "./ProcessesTree";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Process } from "@/store/interface/ermMasterinterfcae";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";
import { Paper } from "@mantine/core";

const addLevel = (list: Process[]) => {
  const fn = (data: Process[], level: number = 0) => {
    return data.map((item: Process) => {
      const child = { ...item, level: level, opened: true };
      if (child.children && child.children.length > 0) child.children = fn(child.children, level + 1);
      else child.children = [];
      return child;
    });
  };
  return fn(list);
};

const collapseAll = (list: Process[], opened: boolean) => {
  const fn = (data: Process[]) => {
    return data.map((item: Process) => {
      const child = { ...item, opened };
      if (child.children) child.children = fn(child.children);
      return child;
    });
  };

  return fn(list);
};

const Processes = () => {
  const theme = useMantineTheme();
  const {
    isLoading: loadingProcesses,
    refetch,
    isFetching: fetchingProcesses,
    data: fetchedProcesses,
  } = useFetchProcessLIstQuery();
  const [processesList, setProcessesList] = useState<Process[]>([]);
  const [updateProcessAndSubprocess, { isLoading: updatingProcesses }] = useUpdateProcessAndSubprocessMutation();
  const [createProcessAndSubProcess, { isLoading: savingProcess }] = useCreateProcessAndSubProcessMutation();
  const [deleteProcessOrSubProcess, { isLoading: deletingProcess }] = useDeleteProcessOrSubProcessMutation();

  const [inputData, setInputData] = useState<string>("");
  const [level, setLevel] = useState<undefined | number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<Process | undefined>();
  const [openAll, setOpenAll] = useState<boolean>(true);

  const { classes } = createStyles((theme) => {
    return {
      tabContainer: { borderRadius: theme.other.spacing.s16, minWidth: "16.67vw" },
      accordianContainer: {
        border: `1px dashed ${theme.colors.gray[4]}`,
        borderRadius: theme.other.spacing.s16,
        width: "100%",
      },
      container: {
        backgroundColor: theme.colors.gray["2"],
        padding: theme.other.spacing.s20,
        borderRadius: theme.other.spacing.s16,
      },
      root: {
        transition: "all 0.3s",
        background: !modalTitle.includes("Are") ? theme.colors.waterfall[9] : theme.colors.red[7],
        ":hover": {
          background: !modalTitle.includes("Are") ? theme.colors.waterfall[7] : theme.colors.red[5],
        },
      },
      addProcessNodeBtn: {
        transition: "all 0.3s",
        background: theme.colors.waterfall[9],
        ":hover": {
          background: theme.colors.waterfall[7],
        },
      },
    };
  })();

  useEffect(() => {
    if (fetchedProcesses) {
      let update = addLevel([...fetchedProcesses]);
      setProcessesList(update);
    }
  }, [fetchedProcesses]);

  const editProcessHandler = async () => {
    if (!selectedNode) return;
    if (inputData === "") return toast.error("Field is required");

    const SENT_DATA = {
      ID: +selectedNode.ID,
      PROCESS_NAME: inputData,
      PARENT_ID: +selectedNode.PARENT_ID,
      PROCESS_SLUG: inputData.toLowerCase().replaceAll(" ", "-"),
      STATUS: +selectedNode.STATUS,
    };

    try {
      const res = await updateProcessAndSubprocess(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node Updated Successfully!");
        setShowModal(false);
        setInputData("");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const addProcessHandler = async () => {
    if (inputData === "") return toast.error("Field is required");

    const SENT_DATA = {
      PROCESS_NAME: inputData,
      PARENT_ID: 0,
    };

    try {
      const res = await createProcessAndSubProcess(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node Created Successfully!");
        setShowModal(false);
        setInputData("");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const addSubProcessHandler = async () => {
    if (!selectedNode) return;
    if (inputData === "") return toast.error("Field is required");

    const SENT_DATA = {
      PROCESS_NAME: inputData,
      PARENT_ID: +selectedNode.ID,
    };

    try {
      const res = await createProcessAndSubProcess(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node Created Successfully!");
        setShowModal(false);
        setInputData("");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const deleteProcessHandler = async () => {
    if (!selectedNode) return;

    const SENT_DATA = {
      ID: +selectedNode.ID,
    };

    try {
      const res = await deleteProcessOrSubProcess(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node deleted Successfully!");
        setShowModal(false);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const modalBtnText =
    modalTitle.includes("Add") || modalTitle.includes("Create")
      ? "Add"
      : modalTitle.includes("Edit")
      ? "Update"
      : "Delete";

  const submitHandler = async () => {
    if (modalTitle.includes("Create Node")) {
      addProcessHandler();
    }
    if (modalTitle.includes("Add Sub Process")) {
      addSubProcessHandler();
    }
    if (modalTitle.includes("Edit")) {
      editProcessHandler();
    }
    if (modalTitle.includes("Are you")) {
      deleteProcessHandler();
    }
  };

  return (
    <>
      <Loader
        visible={loadingProcesses || fetchingProcesses || updatingProcesses || savingProcess || deletingProcess}
      />
      <Modal
        centered
        opened={showModal}
        onClose={() => {
          setInputData("");
          setShowModal(false);
        }}
        title={modalTitle}
        overlayProps={{
          color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {!modalTitle.includes("Are") ? (
          <>
            <TextInput
              value={inputData}
              onChange={(event) => setInputData(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitHandler();
                }
              }}
            />
          </>
        ) : (
          <Text className='labelL2' color={theme.colors.black[2]}>
            This cannot be reversed once done.
          </Text>
        )}
        <Flex justify={"flex-end"}>
          <Button
            onClick={submitHandler}
            style={{ marginTop: "1rem" }}
            classNames={{
              root: classes.root,
            }}
          >
            {modalBtnText}
          </Button>
        </Flex>
      </Modal>

      <Container fluid>
        <Flex justify={"space-between"} align={"center"}>
          <PageTitle
            title='Process & Sub-Process Master'
            description='Update or create your processes and sub-processes'
          />
          {/* <Flex justify={"space-between"} align={"center"} gap={"s12"}>
            <Buttons leftIcon={<IconUser />} variant='filled' onClick={() => {}} isLoading={false}>
              Save
            </Buttons>
            <Buttons variant='default'>Cancel</Buttons>
          </Flex> */}
        </Flex>

        <Flex gap={"s20"} w={"100%"} pt={"s20"} pb={"s20"} justify={"center"}>
          <Flex className={classes.accordianContainer} direction={"column"} w={"100%"} p={"s8"}>
            <ScrollArea h={"75vh"} offsetScrollbars scrollbarSize={8} className={classes.container}>
              <Flex justify={"flex-end"} align={"center"} gap={theme.other.spacing.s12} mb={theme.other.spacing.s16}>
                <MantineBtn
                  variant='secondary'
                  size='sm'
                  onlyIcon={true}
                  onClick={() => {
                    setOpenAll((prev) => !prev);
                    setProcessesList(collapseAll(processesList, !openAll));
                  }}
                >
                  <IconArrowBigUpLine
                    style={{
                      transition: "all 0.3s",
                      transform: !openAll ? "rotate(180deg)" : "",
                    }}
                  />
                </MantineBtn>
                <Paper bg='none'>
                  <MantineBtn
                    // m={theme.other.spacing.s8}
                    // classNames={{
                    //   root: classes.addProcessNodeBtn,
                    // }}
                    onClick={() => {
                      setModalTitle("Create Node");
                      setShowModal(true);
                    }}
                    // variant='secondary'
                    size='sm'
                  >
                    Add Process Node
                  </MantineBtn>
                </Paper>
              </Flex>
              {processesList?.map((child: Process, idx: number) => {
                return (
                  <ProcessesTree
                    key={idx}
                    process={child}
                    processesList={processesList}
                    setProcessesList={setProcessesList}
                    inputData={inputData}
                    setInputData={setInputData}
                    level={level}
                    setLevel={setLevel}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalTitle={modalTitle}
                    setModalTitle={setModalTitle}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                  />
                );
              })}
            </ScrollArea>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Processes;
