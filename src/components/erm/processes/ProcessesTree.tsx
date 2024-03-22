import { Process } from "@/store/interface/ermMasterinterfcae";
import { Select, Text, createStyles } from "@mantine/core";
import { Flex, NavLink, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { IconFileStack } from "@tabler/icons-react";
import { IconStack2 } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { Dispatch, SetStateAction, memo, useState } from "react";

interface ProcessesTree {
  process: Process;
  processesList: Process[];
  setProcessesList: Dispatch<SetStateAction<Process[]>>;
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>;
  level: number | undefined;
  setLevel: Dispatch<SetStateAction<number | undefined>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  modalTitle: string;
  setModalTitle: Dispatch<SetStateAction<string>>;
  selectedNode: Process | undefined;
  setSelectedNode: Dispatch<SetStateAction<Process | undefined>>;
}

const useConstructNodeIcon = (level: number) => {
  const theme = useMantineTheme();
  const styles = {
    size: "2rem",
    stroke: 2,
    color: theme.colors.gray[6],
  };
  const icon = level === 0 ? <IconStack2 {...styles} /> : <IconFileStack {...styles} />;

  return icon;
};

const collapseHandler = (processesList: Process[], ID: string) => {
  const copy = [...processesList];

  copy.forEach((item: Process) => {
    if (item.ID === ID) {
      item.opened = !item.opened;
    } else {
      if (item.children) collapseHandler(item.children, ID);
    }
  });
  return copy;
};

const ProcessesTree = ({
  process,
  processesList,
  setProcessesList,
  inputData,
  setInputData,
  level,
  setLevel,
  showModal,
  setShowModal,
  modalTitle,
  setModalTitle,
  selectedNode,
  setSelectedNode,
}: ProcessesTree) => {
  const theme = useMantineTheme();
  const [hovering, setHovering] = useState<boolean>(false);

  const { classes } = createStyles((theme) => {
    return {
      root: {
        transition: "all 0.3s",
        display: "flex",
        gap: theme.other.spacing.s12,
        background: theme.colors.gray[0],
        marginBottom: theme.other.spacing.s8,
        borderRadius: theme.other.spacing.s8,
        ":hover": {
          background: theme.colors.waterfall[0],
          // transform: "translateX(2px)",
        },
        borderLeft: `2px solid ${theme.colors.waterfall[5]}`,
        padding: `${theme.other.spacing.s10} ${theme.other.spacing.s16}`,
        boxShadow:
          "0px 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.06), 0px 6px 6px -3px rgba(0, 0, 0, 0.06), 0px 12px 12px -6px rgba(0, 0, 0, 0.06), 0px 24px 24px -12px rgba(0, 0, 0, 0.06);",
      },
      label: {
        display: "flex",
        gap: theme.other.spacing.s10,
        flexDirection: "column",
      },
      icon: {
        background: theme.colors.gray[1],
        padding: theme.other.spacing.s8,
        borderRadius: theme.other.spacing.s8,
      },
      children: {
        marginLeft: theme.other.spacing.s8,
        transition: "all 0.3s",
        borderLeft: !hovering ? `2px dashed ${theme.colors.waterfall[3]}` : `2px dashed ${theme.colors.waterfall[7]}`,
      },
      rightSection: {
        display: process.children?.length === 0 ? "none" : "",
      },
    };
  })();

  const NodeIcon = useConstructNodeIcon(process.level || 0);
  const nodeType = level === 0 ? "Process" : "Sub Process";

  return (
    <>
      <NavLink
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        opened={process.opened}
        onClick={(e) => {
          const target = e.target as HTMLElement;

          if (!target.id.includes("process")) {
            setProcessesList(collapseHandler(processesList, process.ID));
          }
        }}
        label={
          <>
            <Flex gap={theme.other.spacing.s10}>
              <Flex gap={theme.other.spacing.s10}>
                <Text transform='capitalize' className='labelL2' color={theme.colors.black[1]} miw={100}>
                  {process.level === 0 ? "Process" : "Sub Process"}
                </Text>
                <Text transform='capitalize' className='labelL1'>
                  {process?.PROCESS_NAME}
                </Text>
                <IconPencil
                  id={`processDataEdit${process.ID}`}
                  size='1rem'
                  stroke={2}
                  color={theme.colors.gray[6]}
                  onClick={() => {
                    setInputData(process.PROCESS_NAME);
                    setLevel(process.level);
                    setModalTitle("Edit " + nodeType);
                    setShowModal(true);
                    setSelectedNode(process);
                  }}
                />
                <IconTrash
                  id={`processDataDel${process.ID}`}
                  size='1rem'
                  stroke={2}
                  color={theme.colors.red[4]}
                  onClick={() => {
                    // setParentNode(parentNode);
                    setLevel(process.level);
                    setModalTitle("Are you sure ?");
                    setShowModal(true);
                    setSelectedNode(process);
                  }}
                />
              </Flex>

              {process.level === 0 && (
                <Text
                  onClick={() => {
                    setLevel(process.level);
                    setModalTitle("Add Sub Process");
                    setShowModal(true);
                    setSelectedNode(process);
                  }}
                  id={`processData${process.ID}`}
                  color={theme.colors.waterfall[7]}
                  className='labelL1'
                  sx={{
                    transition: "all 0.3s",
                    ":hover": {
                      color: theme.colors.waterfall[9],
                    },
                  }}
                >
                  +Sub Process
                </Text>
              )}
            </Flex>
            <Flex align={"center"} gap={theme.other.spacing.s10}>
              <Text className='lableL1' color={theme.colors.black[1]} miw={100}>
                Owner
              </Text>
              <Select
                id={`processSelect${process.ID}`}
                maw={200}
                size='xs'
                placeholder='Choose an owner'
                data={[
                  { value: "react", label: "Akash Dey" },
                  { value: "ng", label: "Pramit Pal" },
                  { value: "svelte", label: "Vaskar" },
                  { value: "vue", label: "Nirmal" },
                ]}
              />
            </Flex>
          </>
        }
        icon={NodeIcon}
        childrenOffset={28}
        classNames={{
          root: classes.root,
          // body: classes.body,
          label: classes.label,
          icon: classes.icon,
          children: classes.children,
          rightSection: classes.rightSection,
        }}
      >
        {process.children &&
          process.children?.map((child: Process, idx: number) => {
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
      </NavLink>
    </>
  );
};

export default memo(ProcessesTree);
