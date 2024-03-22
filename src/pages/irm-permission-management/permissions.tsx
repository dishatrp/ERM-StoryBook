import { Accordion, Button, Checkbox, Container, Flex, Select, TextInput } from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";

import Tables from "@/components/permissionTable/Table";
import dataobj from "@/demo/output";
import { useGetAllCustomerListQuery } from "@/store/api/clientApiSlice";
import { SelectInput } from "@/components/allInputsFields";
import { useCreatePermissionMutation } from "@/store/api/PermissionApiSlice";

const rules = ["CREATEOPS", "READOPS", "UPDATEOPS", "DELETEOPS"];

enum PermissionState {
  ACTIVE = "Y",
  INACTIVE = "N",
  INDETERMINATE = "I",
  PARENT = "0",
}

const PAGE_MST_IS_ACTIVE = "pageMst_IS_ACTIVE";

const PermissinManagement = () => {
  const [permission, setPermission] = useState(dataobj);
  const [dropdown, setDropDown] = useState<
    | {
        value: string;
        label: string;
      }[]
    | undefined
  >([]);

  const [dropdownValue, setDropDownValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const {
    isError: listError,
    isSuccess: listSuccess,
    data: listData,
    isLoading: customerLoading,
  } = useGetAllCustomerListQuery("");

  const [createPermission, { isLoading, isSuccess, isError }] = useCreatePermissionMutation();

  useEffect(() => {
    const dropdownClientData = listData?.data.globalCustomerMaster.map((el) => {
      return {
        value: `${el.id}`,
        label: el.type,
      };
    });
    setDropDown(dropdownClientData);
  }, [listData?.data.globalCustomerMaster]);

  const toggleState = (state: PermissionState) =>
    state === PermissionState.ACTIVE ? PermissionState.INACTIVE : PermissionState.ACTIVE;

  const handleParentChange = (index: number, curPermission: any[]) => {
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
    const curPermission = [...permission];
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
    setDropDownValue(value);
  };

  const inputCHangeHandler = (e: SetStateAction<string>) => {
    setInputValue(e);
  };

  const submitHandler = async () => {
    //console.log("permission", permission, dropdownValue, inputValue);
    const childern = permission.filter((el) => el.children);
    const arr = [];

    function transformData(
      inputData: (
        | {
            pageMst_ID: string;
            pageMst_ITEM: string;
            pageMst_SLUG: string;
            pageMst_HIERARCHY: string;
            pageMst_IS_ACTIVE: string;
            ID: string;
            POLICY_ID: string;
            ITEM_ID: string;
            READOPS: string;
            CREATEOPS: string;
            UPDATEOPS: string;
            DELETEOPS: string;
            CRD_DATE: string;
            LAST_UPD_DATE: string;
            CRD_USR_ID: string;
            UPD_USR_ID: string;
            children: {
              pageMst_ID: string;
              pageMst_ITEM: string;
              pageMst_SLUG: string;
              pageMst_HIERARCHY: string;
              pageMst_IS_ACTIVE: string;
              ID: string;
              POLICY_ID: string;
              ITEM_ID: string;
              READOPS: string;
              CREATEOPS: string;
              UPDATEOPS: string;
              DELETEOPS: string;
              CRD_DATE: string;
              LAST_UPD_DATE: string;
              CRD_USR_ID: string;
              UPD_USR_ID: string;
            }[];
          }
        | {
            pageMst_ID: string;
            pageMst_ITEM: string;
            pageMst_SLUG: string;
            pageMst_HIERARCHY: string;
            pageMst_IS_ACTIVE: string;
            ID: string;
            POLICY_ID: string;
            ITEM_ID: string;
            READOPS: string;
            CREATEOPS: string;
            UPDATEOPS: string;
            DELETEOPS: string;
            CRD_DATE: string;
            LAST_UPD_DATE: string;
            CRD_USR_ID: string;
            UPD_USR_ID: string;
            children?: undefined;
          }
      )[]
    ) {
      let result: any = [];

      for (let item of inputData) {
        let policyData = {
          ID: item.ID,
          READOPS: "0",
          CREATEOPS: "0",
          UPDATEOPS: "0",
          DELETEOPS: "0",
        };

        if (item.children && item.children.length > 0) {
          let childrenData = item.children.map((child) => ({
            ID: child.ID,
            READOPS: child.READOPS,
            CREATEOPS: child.CREATEOPS,
            UPDATEOPS: child.UPDATEOPS,
            DELETEOPS: child.DELETEOPS,
          }));

          // Check if any child has non-zero values, if yes, set corresponding values in the parent to 1
          if (
            childrenData.some(
              (child) =>
                child.READOPS === "1" || child.CREATEOPS === "1" || child.UPDATEOPS === "1" || child.DELETEOPS === "1"
            )
          ) {
            policyData.READOPS = "1";
            policyData.CREATEOPS = "1";
            policyData.UPDATEOPS = "1";
            policyData.DELETEOPS = "1";
          }

          result.push(policyData);
          result = result.concat(childrenData);
        } else {
          result.push(policyData);
        }
      }

      return result;
    }

    // Example usage

    const transformedData = transformData(permission);

    //console.log(transformedData);

    const transFormedResponse = {
      CUST_ID: +dropdownValue,
      POLICY_NAME: inputValue,
      IS_ACTIVE: "Y",
      POLICY: transformData(permission),
    };

    //console.log(transFormedResponse);

    try {
      // const res = await createPermission(transFormedResponse).unwrap();
      // console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Accordion variant='separated' defaultValue={permission[0]["pageMst_ITEM"]}>
      <Flex mih={50} gap='md' justify='flex-end' align='center' direction='row' wrap='wrap'>
        <TextInput label='Policy Name' name='policyName' onChange={(e) => inputCHangeHandler(e.target.value)} />
        <Select data={dropdown || []} name={"customerList"} label='List of Customer' onChange={selectChangeHandler} />
        <Button loading={false} onClick={submitHandler}>
          Save
        </Button>
      </Flex>
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
  );
};

export default PermissinManagement;
