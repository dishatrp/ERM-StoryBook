import { Button, Flex, Modal, NavLink, Select, Text, TextInput, createStyles, useMantineTheme } from "@mantine/core";
import {
  IconBuildingBank,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Id, toast } from "react-toastify";
import MantineBtn from "../mantineBtn/MantineBtn";

interface TreeNodeData {
  ID: string;
  ORG_STRUCTURE_NAME: string;
  PARENT_ID: string;
  STATUS: string;
  CUST_ID: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  children: TreeNodeData[];
  level: number;
  ownerName?: string;
}
interface TreeView {
  orgData: TreeNodeData;
  setOrgData: Dispatch<SetStateAction<TreeNodeData>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedNode: TreeNodeData | undefined;
  setSelectedNode: Dispatch<SetStateAction<TreeNodeData | undefined>>;
  parentNode: TreeNodeData | undefined;
  setParentNode: Dispatch<SetStateAction<TreeNodeData | undefined>>;
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>;
  addNodeHandler: () => Promise<Id | undefined>;
  editNodeHandler: () => Promise<Id | undefined>;
  deleteNodeHandler: () => Promise<void>;
  level: number | undefined;
  setLevel: Dispatch<SetStateAction<number | undefined>>;
}
interface TreeNode {
  orgData: TreeNodeData;
  parentNode?: TreeNodeData;
  setLevel: Dispatch<SetStateAction<number | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalTitle: Dispatch<SetStateAction<string>>;
  setSelectedNode: Dispatch<SetStateAction<TreeNodeData | undefined>>;
  setInputData: Dispatch<SetStateAction<string>>;
  setParentNode: Dispatch<SetStateAction<TreeNodeData | undefined>>;
}

const useConstructNodeIcon = (level: number) => {
  const theme = useMantineTheme();
  const styles = {
    size: "2rem",
    stroke: 2,
    color: theme.colors.gray[6],
  };
  const icon =
    level === 0 ? (
      <IconBuildingBank {...styles} />
    ) : level === 1 ? (
      <IconBuildingCommunity {...styles} />
    ) : (
      <IconBuildingSkyscraper {...styles} />
    );
  return icon;
};

const TreeNode = ({
  orgData,
  setLevel,
  setShowModal,
  setModalTitle,
  setSelectedNode,
  setInputData,
  parentNode,
  setParentNode,
}: TreeNode) => {
  const [opened, setOpened] = useState<boolean>(true);
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
    };
  })();

  const NodeIcon = useConstructNodeIcon(orgData.level || 0);
  const btn = orgData.level === 0 ? "Buisness Unit" : orgData.level === 1 ? "Department" : "Sub Department";

  const nodeType =
    orgData.level === 0
      ? "Company"
      : orgData.level === 1
      ? "Buisness Unit"
      : orgData.level === 2
      ? "Department"
      : "Sub Department";

  return (
    <>
      <NavLink
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        opened={opened}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.id.includes("orgData")) setOpened((prev) => !prev);
        }}
        label={
          <>
            <Flex gap={theme.other.spacing.s10}>
              <Flex gap={theme.other.spacing.s10}>
                <Text transform='capitalize' className='labelL2' color={theme.colors.black[1]} miw={100}>
                  {nodeType}
                </Text>
                <Text transform='capitalize' className='labelL1'>
                  {orgData?.ORG_STRUCTURE_NAME}
                </Text>
                <IconPencil
                  id={`orgDataEdit${orgData.ID}`}
                  size='1rem'
                  stroke={2}
                  color={theme.colors.gray[6]}
                  onClick={() => {
                    setInputData(orgData.ORG_STRUCTURE_NAME);
                    setLevel(orgData.level);
                    setModalTitle("Edit " + nodeType);
                    setShowModal(true);
                    setSelectedNode(orgData);
                  }}
                />
                {orgData.level !== 0 && (
                  <IconTrash
                    id={`orgDataDel${orgData.ID}`}
                    size='1rem'
                    stroke={2}
                    color={theme.colors.red[4]}
                    onClick={() => {
                      setParentNode(parentNode);
                      setLevel(orgData.level);
                      setModalTitle("Are you sure ?");
                      setShowModal(true);
                      setSelectedNode(orgData);
                    }}
                  />
                )}
              </Flex>

              {orgData.level < 3 && (
                <Text
                  onClick={() => {
                    setLevel(orgData.level);
                    setModalTitle("Add " + btn);
                    setShowModal(true);
                    setSelectedNode(orgData);
                  }}
                  id={`orgData${orgData.ID}`}
                  color={theme.colors.waterfall[7]}
                  className='labelL1'
                  sx={{
                    transition: "all 0.3s",
                    ":hover": {
                      color: theme.colors.waterfall[9],
                    },
                  }}
                >
                  +{btn}
                </Text>
              )}
            </Flex>
            <Flex align={"center"} gap={theme.other.spacing.s10}>
              <Text className='lableL1' color={theme.colors.black[1]} miw={100}>
                Owner
              </Text>
              <Select
                id={`orgDataSelect${orgData.ID}`}
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
        }}
      >
        {orgData.children.length > 0 &&
          orgData.children.map((item: TreeNodeData, idx: number) => {
            return (
              <TreeNode
                orgData={item}
                key={idx}
                setLevel={setLevel}
                setShowModal={setShowModal}
                setModalTitle={setModalTitle}
                setSelectedNode={setSelectedNode}
                setInputData={setInputData}
                parentNode={orgData}
                setParentNode={setParentNode}
              />
            );
          })}
      </NavLink>
    </>
  );
};

const TreeView = ({
  orgData,
  setOrgData,
  showModal,
  setShowModal,
  selectedNode,
  setSelectedNode,
  parentNode,
  setParentNode,
  inputData,
  setInputData,
  addNodeHandler,
  editNodeHandler,
  deleteNodeHandler,
  level,
  setLevel,
}: TreeView) => {
  const theme = useMantineTheme();
  const [modalTitle, setModalTitle] = useState<string>("");

  const { classes } = createStyles((theme) => {
    return {
      root: {
        transition: "all 0.3s",
        background: !modalTitle.includes("Are") ? theme.colors.waterfall[9] : theme.colors.red[7],
        ":hover": {
          background: !modalTitle.includes("Are") ? theme.colors.waterfall[7] : theme.colors.red[5],
        },
      },
    };
  })();

  const addNode = (orgData: TreeNodeData) => {
    if (!selectedNode) return;
    if (level && level >= 3) return;
    if (inputData === "") return toast.error("Field is required");

    const copy = JSON.parse(JSON.stringify(orgData));

    const fn: (data: TreeNodeData) => void = (data) => {
      if (inputData && selectedNode && selectedNode?.ID === data.ID) {
        const newNode: TreeNodeData = {
          ID: Math.random().toString(),
          ORG_STRUCTURE_NAME: inputData,
          PARENT_ID: selectedNode.ID,
          STATUS: "1",
          CUST_ID: selectedNode.CUST_ID,
          CREATED_AT: new Date().toISOString(),
          UPDATED_AT: new Date().toISOString(),
          CREATED_BY: selectedNode.CREATED_BY,
          UPDATED_BY: selectedNode.UPDATED_BY,
          children: [],
          level: selectedNode.level + 1,
        };
        data.children = selectedNode.children ? [...selectedNode.children, newNode] : [newNode];
        return;
      } else {
        data.children.forEach((child: TreeNodeData) => {
          return fn(child);
        });
        return;
      }
    };
    fn(copy);
    setOrgData(copy);
    setShowModal(false);
    setInputData("");
  };

  const editNode = (orgData: TreeNodeData) => {
    if (!selectedNode) return;
    if (inputData === "") return toast.error("Field is required");

    const copy = JSON.parse(JSON.stringify(orgData));

    const fn: (data: TreeNodeData) => void = (data) => {
      if (inputData && selectedNode && selectedNode?.ID === data.ID) {
        data.ORG_STRUCTURE_NAME = inputData;
        return;
      } else {
        data.children.forEach((child: TreeNodeData) => {
          return fn(child);
        });
        return;
      }
    };
    fn(copy);
    setOrgData(copy);
    setShowModal(false);
    setInputData("");
  };

  const deleteNode = (orgData: TreeNodeData) => {
    if (!selectedNode || !parentNode) return;
    const copy = JSON.parse(JSON.stringify(orgData));

    const fn: (data: TreeNodeData) => void = (data) => {
      if (parentNode.ID === data.ID) {
        data.children = parentNode.children.filter((child) => child.ID !== selectedNode.ID);
        console.log("PP", data.children, selectedNode.ID);
        return;
      } else {
        data.children.forEach((child: TreeNodeData) => {
          return fn(child);
        });
        return;
      }
    };
    fn(copy);
    setOrgData(copy);
    setShowModal(false);
    setInputData("");
  };

  const submitHandler = async () => {
    if (modalTitle.includes("Add")) {
      //  addNode(orgData);
      addNodeHandler();
    }
    if (modalTitle.includes("Edit")) {
      // editNode(orgData);
      editNodeHandler();
    }
    if (modalTitle.includes("Are you")) {
      // deleteNode(orgData);
      deleteNodeHandler();
    }
  };

  return (
    <>
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
          <MantineBtn onClick={submitHandler}>
            {modalTitle.includes("Add") ? "Add" : modalTitle.includes("Edit") ? "Update" : "Delete"}
          </MantineBtn>
        </Flex>
      </Modal>
      <TreeNode
        orgData={orgData}
        setLevel={setLevel}
        setShowModal={setShowModal}
        setModalTitle={setModalTitle}
        setSelectedNode={setSelectedNode}
        setInputData={setInputData}
        setParentNode={setParentNode}
      />
    </>
  );
};

export default TreeView;
