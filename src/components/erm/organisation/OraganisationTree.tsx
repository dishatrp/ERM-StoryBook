import { Container, Flex, ScrollArea, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import PageTitle from "../genericComponents/PageTitle";
import { IconUser } from "@tabler/icons-react";
import TreeView from "../genericComponents/treeView/TreeView";
import {
  useDeleteOrgNodeMutation,
  useFetchOrgStructureQuery,
  useSaveOrgStructureMutation,
  useUpdateOrgStructureMutation,
} from "@/store/api/ermMasterDataSlice";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
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

const ORG_DATA = {
  ID: "1",
  ORG_STRUCTURE_NAME: "tanfeeth",
  PARENT_ID: "0",
  STATUS: "1",
  CUST_ID: "2",
  CREATED_AT: "2024-03-01T05:34:13.000Z",
  UPDATED_AT: "2024-03-01T05:34:13.000Z",
  CREATED_BY: "2",
  UPDATED_BY: "0",
  children: [],
};

const addLevel = (ORG_DATA: any) => {
  ORG_DATA.level = 0;
  if (!ORG_DATA.children) ORG_DATA.children = [];

  const fn = (data: TreeNodeData) => {
    return data.children.map((item: TreeNodeData, idx: number) => {
      const child = { ...item, level: (data.level || 0) + 1 };
      if (child.children) child.children = fn(child);
      else child.children = [];
      return child;
    });
  };
  const formattedOrgData: TreeNodeData = { ...ORG_DATA, children: fn(ORG_DATA) };
  return formattedOrgData;
};

const OraganisationTree = () => {
  const { isLoading, data, refetch, isFetching } = useFetchOrgStructureQuery();
  const [orgData, setOrgData] = useState<TreeNodeData>(addLevel(ORG_DATA));

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | undefined>();
  const [parentNode, setParentNode] = useState<TreeNodeData | undefined>();
  const [inputData, setInputData] = useState<string>("");
  const [level, setLevel] = useState<undefined | number>();

  const [saveOrgStructure, { isLoading: savingOrgStructure }] = useSaveOrgStructureMutation();
  const [updateOrgStructure, { isLoading: updatingOrgStructure }] = useUpdateOrgStructureMutation();
  const [deleteOrgNode, { isLoading: deletinggOrgNode }] = useDeleteOrgNodeMutation();

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
    };
  })();

  const addNodeHandler = async () => {
    if (!selectedNode) return;
    if (level && level >= 3) return;
    if (inputData === "") return toast.error("Field is required");

    const SENT_DATA = {
      ORG_STRUCTURE_NAME: inputData,
      PARENT_ID: +selectedNode.ID,
    };

    try {
      const res = await saveOrgStructure(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node Saved Successfully!");
        setShowModal(false);
        setInputData("");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const editNodeHandler = async () => {
    if (!selectedNode) return;
    if (inputData === "") return toast.error("Field is required");

    const SENT_DATA = {
      ID: +selectedNode.ID,
      ORG_STRUCTURE_NAME: inputData,
    };

    try {
      const res = await updateOrgStructure(SENT_DATA).unwrap();
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

  const deleteNodeHandler = async () => {
    if (!selectedNode) return;

    const SENT_DATA = {
      ID: +selectedNode.ID,
    };

    try {
      const res = await deleteOrgNode(SENT_DATA).unwrap();
      if (res && res?.status) {
        refetch();
        toast.success(res?.message || "Node Deleted Successfully!");
        setShowModal(false);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (data) {
      const update = { ...data };
      setOrgData(addLevel(update));
    }
  }, [data]);

  return (
    <>
      <Loader visible={isLoading || savingOrgStructure || isFetching || updatingOrgStructure || deletinggOrgNode} />
      <Container fluid>
        <Flex justify={"space-between"} align={"center"}>
          <PageTitle title='Department Master' description='Update or create your organisation structure' />
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
              <TreeView
                orgData={orgData}
                setOrgData={setOrgData}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                parentNode={parentNode}
                setParentNode={setParentNode}
                inputData={inputData}
                setInputData={setInputData}
                addNodeHandler={addNodeHandler}
                editNodeHandler={editNodeHandler}
                deleteNodeHandler={deleteNodeHandler}
                level={level}
                setLevel={setLevel}
              />
            </ScrollArea>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default OraganisationTree;
