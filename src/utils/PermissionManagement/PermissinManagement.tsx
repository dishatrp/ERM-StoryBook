import { Accordion, Box, Button, Checkbox, Container, Flex, Paper, Select, SimpleGrid, TextInput } from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";

import Tables from "@/components/permissionTable/Table";
import dataobj from "@/demo/output";
import { useGetAllCustomerListQuery } from "@/store/api/clientApiSlice";
import { SelectInput } from "@/components/allInputsFields";
import {
  useCreatePermissionMutation,
  useGetPermissionByPermissionIdMutation,
  useGetPermissionMutation,
  useUpdatePermissionMutation,
} from "@/store/api/PermissionApiSlice";
import PageTitle from "@/components/PageTitle";
import Buttons from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePermissionNameMutation } from "@/store/api/createNewUserApiSlice";
import Loader from "@/components/Loader";
import { shapedData, transformData } from "./helper";

const rules = ["CREATEOPS", "READOPS", "UPDATEOPS", "DELETEOPS"];

enum PermissionState {
  ACTIVE = "Y",
  INACTIVE = "N",
  INDETERMINATE = "I",
  PARENT = "0",
}

interface PermissionDropDown {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface Page {
  pageMst_ID?: string | undefined;
  pageMst_ITEM: string;
  pageMst_SLUG: string;
  pageMst_HIERARCHY: string;
  pageMst_IS_ACTIVE?: string;
  pageMst_ACTION_URL?: string | null | undefined;
  ID?: string;
  POLICY_ID?: string;
  ITEM_ID?: string;
  READOPS: string;
  CREATEOPS: string;
  UPDATEOPS: string;
  DELETEOPS: string;
  CRD_DATE?: string;
  LAST_UPD_DATE?: string;
  CRD_USR_ID?: string;
  UPD_USR_ID?: string;
  ICON?: string | null;
  ACTION_URL?: string | null;
  children?: Page[];
}

const PAGE_MST_IS_ACTIVE = "pageMst_IS_ACTIVE";

const PermissinManagement = () => {
  const [permission, setPermission] = useState<Page[] | []>([]);
  const [dropdown, setDropDown] = useState<PermissionDropDown[] | undefined>([]);
  const [clientPermission, setClientPermission] = useState<PermissionDropDown[] | undefined>([]);

  const [permissionsName, setPermissionsName] = useState("");

  const [dropdownValue, setDropDownValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isPermissionCreated, setisPermissionCreated] = useState(false);

  const { data: listData, isLoading: customerLoading } = useGetAllCustomerListQuery("");

  const [createPermission, { isLoading }] = useCreatePermissionMutation();

  const [permissionName, { isLoading: permissionLoading }] = usePermissionNameMutation();

  const [getPermission, { isLoading: getPermissionLoading }] = useGetPermissionMutation();

  const [getPermissionByPermissionId, { isLoading: getPermissionbyIdLoading }] =
    useGetPermissionByPermissionIdMutation();

  const [updatePermission, { isLoading: updatePermissionLoading }] = useUpdatePermissionMutation();

  useEffect(() => {
    const dropdownClientData = listData?.data.globalCustomerMaster.map((el) => {
      return {
        value: `${el.id}`,
        label: el.type,
      };
    });
    setDropDown(dropdownClientData);
  }, [listData?.data.globalCustomerMaster]);

  useEffect(() => {
    const getPermissionName = async () => {
      try {
        if (dropdownValue) {
          const res = await permissionName({
            CUST_ID: +dropdownValue,
          }).unwrap();
          //console.log("getPermiisonName", res.data.permissionNameData);
          setClientPermission(() => {
            const dropdownClientData = res.data.permissionNameData.map((el: { ID: any; POLICY_NAME: any }) => {
              return {
                value: `${el.ID},${el.POLICY_NAME}`,
                label: el.POLICY_NAME,
              };
            });
            return dropdownClientData;
          });
          setPermissionsName("");
          setInputValue("");
        }
      } catch (error: any) {
        setClientPermission([{ value: "No data Found", label: "No data Found", disabled: true }]);
        setPermissionsName("");
        setInputValue("");
        console.log(error);
      }
    };

    const getPermissionData = async () => {
      try {
        if (dropdownValue) {
          const permissionData = await getPermission({
            clientId: +dropdownValue,
          }).unwrap();
          //console.log("getPermiisonName", permissionData);
          setPermission(permissionData.data.policies);
        }
      } catch (error: any) {
        setPermission([]);
      }
    };
    getPermissionName();
    getPermissionData();
  }, [dropdownValue, getPermission, permissionName]);

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        if (permissionsName) {
          const [id, name] = permissionsName.split(",");
          const res = await getPermissionByPermissionId({
            POLICY_ID: +id,
          }).unwrap();
          const policies = shapedData(res.data.policy);
          setPermission(policies);
          setInputValue(name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissionData();
  }, [getPermissionByPermissionId, permissionsName]);

  const toggleState = (state: PermissionState) =>
    state === PermissionState.ACTIVE ? PermissionState.INACTIVE : PermissionState.ACTIVE;

  const handleParentChange = (index: number, curPermission: any[]) => {
    // console.log(
    //   "curPermisiion",
    //   curPermission,
    //   // index,
    //   curPermission[index],
    //   PAGE_MST_IS_ACTIVE
    // );
    const isActive = curPermission[index][PAGE_MST_IS_ACTIVE];
    const toggledState = toggleState(isActive);

    curPermission[index][PAGE_MST_IS_ACTIVE] = toggledState;
    curPermission[index]["children"]?.forEach((child: any) => {
      child[PAGE_MST_IS_ACTIVE] = toggledState;
      rules.forEach((rule) => (child[rule] = isActive === PermissionState.ACTIVE ? "0" : "1"));
    });
  };

  const handleChildChange = (index: number, secIndex: number, curPermission: any[]) => {
    const children = curPermission[index]?.children;
    if (!children || secIndex === undefined) return;

    const allZero = rules.every((rule) => children[secIndex][rule] === "0");
    rules.forEach((rule) => (children[secIndex][rule] = allZero ? "1" : "0"));

    updateChildActiveStatus(children, secIndex);
    handleChangeParentFromChild(curPermission, index);
  };

  const handleChildOfChildChange = (
    index: number,
    secIndex: number,
    crudKey: string,
    value: string,
    curPermission: any[]
  ) => {
    const children = curPermission[index]?.children;
    if (!children || secIndex === undefined || !crudKey) return;

    children[secIndex][crudKey] = value === "1" ? "0" : "1";
    updateChildActiveStatus(children, secIndex);
    handleChangeParentFromChild(curPermission, index);
  };

  const updateChildActiveStatus = (children: any[], secIndex: number) => {
    const currentChild = children[secIndex];
    const allCRUDActive = rules.every((rule) => currentChild[rule] === "1");
    const noCRUDActive = rules.every((rule) => currentChild[rule] === "0");

    if (allCRUDActive) {
      currentChild[PAGE_MST_IS_ACTIVE] = PermissionState.ACTIVE;
    } else if (noCRUDActive) {
      currentChild[PAGE_MST_IS_ACTIVE] = PermissionState.INACTIVE;
    } else {
      currentChild[PAGE_MST_IS_ACTIVE] = PermissionState.INDETERMINATE;
    }
  };

  const handleChangeParentFromChild = (curPermission: any[], index: number) => {
    const children = curPermission[index]?.children;
    const allChildActive = children.every((el: any) => el[PAGE_MST_IS_ACTIVE] === PermissionState.ACTIVE);
    const noChildActive = children.every((el: any) => el[PAGE_MST_IS_ACTIVE] === PermissionState.INACTIVE);

    if (allChildActive) {
      curPermission[index][PAGE_MST_IS_ACTIVE] = PermissionState.ACTIVE;
    } else if (noChildActive) {
      curPermission[index][PAGE_MST_IS_ACTIVE] = PermissionState.INACTIVE;
    } else {
      curPermission[index][PAGE_MST_IS_ACTIVE] = PermissionState.INDETERMINATE;
    }
  };

  /** Main function for mannage handle change */
  const handleChange = (
    index: number,
    item: string,
    secIndex?: number,
    name?: string,
    value?: string,
    crudKey?: string
  ) => {
    // let curPermission = [...permission];
    let curPermission = JSON.parse(JSON.stringify(permission));
    //console.log(index, item, secIndex, name, value, crudKey);
    if (item === PermissionState.PARENT) {
      handleParentChange(index, curPermission);
    } else if (item !== PermissionState.PARENT && !name && secIndex !== undefined) {
      handleChildChange(index, secIndex, curPermission);
    } else if (
      item !== PermissionState.PARENT &&
      name &&
      secIndex !== undefined &&
      crudKey !== undefined &&
      value !== undefined
    ) {
      handleChildOfChildChange(index, secIndex, crudKey, value, curPermission);
    }

    setPermission(curPermission);
  };

  const selectChangeHandler = (value: string) => {
    setisPermissionCreated(false);
    setDropDownValue(value);
  };

  const inputCHangeHandler = (e: SetStateAction<string>) => {
    setInputValue(e);
  };

  const policyNameHandler = (e: string) => {
    //console.log(e);
    setisPermissionCreated(true);
    setPermissionsName(e);
  };

  const submitHandler = async () => {
    try {
      const transFormedResponse = {
        CUST_ID: +dropdownValue,
        POLICY_NAME: inputValue,
        IS_ACTIVE: "Y",
        POLICY: transformData(permission),
      };
      //console.log(permission, transFormedResponse);
      if (!isPermissionCreated) {
        //console.log("ifBlock");
        const res = await createPermission(transFormedResponse).unwrap();
        toast.success(res.message, {
          autoClose: 1000,
        });
      } else {
        const [id, name] = permissionsName.split(",");
        const res = await updatePermission({
          ...transFormedResponse,
          POLICY_ID: +id,
        }).unwrap();
        toast.success(res.message, {
          autoClose: 1000,
        });
      }
      setPermission([]);
      setDropDownValue("");
    } catch (error: any) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Container size={"xl"}>
        <Flex gap='md' justify='space-between' align='center' direction='row' mb={"lg"}>
          <PageTitle>Permission Management</PageTitle>
          <Buttons
            isLoading={updatePermissionLoading || isLoading}
            onClick={submitHandler}
            disabled={!inputValue || !dropdownValue}
          >
            Save
          </Buttons>
        </Flex>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            padding: theme.spacing.lg,
            borderRadius: theme.radius.xs,
          })}
        >
          <SimpleGrid cols={dropdownValue ? 2 : 1} spacing='lg' verticalSpacing='lg' w={"100%"}>
            {dropdownValue && (
              <TextInput
                label='Policy Name'
                name='policyName'
                placeholder='Enter Your Policy Name'
                value={inputValue}
                withAsterisk
                onChange={(e) => inputCHangeHandler(e.target.value)}
              />
            )}
            <Select
              data={dropdown || [{ label: "No data found", value: "No data found", disabled: true }]}
              value={dropdownValue}
              name={"customerList"}
              label='List of Customer'
              placeholder='Choose Your Clients'
              onChange={selectChangeHandler}
              withAsterisk
            />
          </SimpleGrid>
        </Box>
        {dropdownValue && (
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
              padding: theme.spacing.lg,
              borderRadius: theme.radius.xs,
            })}
            mt={"lg"}
          >
            <SimpleGrid cols={1} spacing='lg' verticalSpacing='lg' w={"100%"}>
              <Select
                data={clientPermission || [{ label: "No data found", value: "No data found", disabled: true }]}
                name='ListofPolicy'
                label='List of Policy'
                value={permissionsName}
                placeholder='Choose Your Clients'
                onChange={policyNameHandler}
                withAsterisk
              />
            </SimpleGrid>
          </Box>
        )}

        <Loader opacity={0} visible={getPermissionLoading || getPermissionbyIdLoading || permissionLoading} />

        <Accordion variant='separated' defaultValue={permission[0]?.["pageMst_ITEM"]} mt={"lg"}>
          {permission.map((el, i) => {
            if (el.children) {
              return (
                <Accordion.Item value={el.pageMst_ITEM} key={i}>
                  <Accordion.Control>
                    <Checkbox
                      label={el.pageMst_ITEM}
                      checked={el.pageMst_IS_ACTIVE === "Y"}
                      onChange={() => handleChange(i, el.pageMst_HIERARCHY)}
                      indeterminate={el.pageMst_IS_ACTIVE === "I"}
                    />
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Tables data={el.children} onChange={handleChange} index={i} />
                  </Accordion.Panel>
                </Accordion.Item>
              );
            } else {
              return (
                <Accordion.Item value={el.pageMst_ITEM} key={i} onChange={(e) => e.preventDefault()}>
                  <Accordion.Control>
                    <Checkbox
                      label={el.pageMst_ITEM}
                      checked={el.pageMst_IS_ACTIVE === "Y"}
                      onChange={() => handleChange(i, el.pageMst_HIERARCHY)}
                      indeterminate={el.pageMst_IS_ACTIVE === "I"}
                    />
                  </Accordion.Control>
                </Accordion.Item>
              );
            }
          })}
        </Accordion>
      </Container>
      {/* <ToastContainer /> */}
    </>
  );
};

export default PermissinManagement;
