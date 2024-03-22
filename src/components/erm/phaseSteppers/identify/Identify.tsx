import { Flex, Paper, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useFormWrapper from "../../genericComponents/useFormWrapper";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateIdentityMutation, useFetchAllUserQuery, useFetchTemplateDataQuery } from "@/store/api/ermNewApiSlice";
import { useFetchOrgStructureQuery } from "@/store/api/ermMasterDataSlice";
import { toast } from "react-toastify";
import { setIdentifyId } from "@/store/slice/IdentifyIdSlice";
import { useAppDispatch } from "@/store/store";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";
import { IconRestore } from "@tabler/icons-react";
import Loader from "@/components/Loader";

interface Identify {
  data: any;
}

const dropdownValues = (data: any, fetchAllUser: any = [], org: any = {}, handleChange: any, value: any) => {
  // console.log("value", value)
  return data.map((item: any) => {
    let dropdownData = [];
    let onChangeHandler = null;

    if (item.INPUT_FIELD === "RISK_TYPE") {
      dropdownData = [
        { label: "Compliance", value: "Compliance" },
        { label: "Operational", value: "Operational" },
      ];
      // onChangeHandler = handleChange;
    } else if (item.INPUT_FIELD === "REQUESTED_BY" || item.INPUT_FIELD === "RISK_CHAMPION") {
      // console.log("fetchAllUser", fetchAllUser)
      if (Array.isArray(fetchAllUser)) {
        dropdownData = fetchAllUser?.map((user: any) => ({
          label: `${user.USER_FNAME} ${user.USER_LNAME}`,
          value: user.IRM_USER_ID,
        }));
      }
      // onChangeHandler = handleChange;
    } else if (item.INPUT_FIELD === "BUSINESS_UNIT") {
      // console.log("org", org)
      if (typeof org !== 'undefined' && Object.keys(org).length > 0 && org?.children.length > 0) {
        dropdownData = org?.children?.map((unit: any) => ({
          label: unit.ORG_STRUCTURE_NAME,
          value: unit.ID,
        }));
      }

      onChangeHandler = handleChange;
    } else if (item.INPUT_FIELD === "DEPARTMENT_NAME") {
      dropdownData = []
      if (typeof org !== 'undefined' && Object.keys(org).length > 0 && org?.children.length > 0) {
        let selectedDepartment = org?.children?.find((dept: any) => dept.ID == value);
        if (selectedDepartment?.children) {
          dropdownData = selectedDepartment.children.map((unit: any) => ({
            label: unit.ORG_STRUCTURE_NAME,
            value: unit.ID,
          }));
        }
      }

      // console.log("dropdownData", dropdownData)
      // onChangeHandler = handleChange;
    }

    return { ...item, Dropdata: [...dropdownData], onChange: onChangeHandler };
  });
};

const Identify = ({ data }: Identify) => {
  const methods = useForm<any>({
    mode: "all",
  });
  const dispatch = useAppDispatch();

  const { handleSubmit, reset, watch } = methods;
  const [formElements, setFormElements] = useState<any[]>([]);
  const { form } = useFormWrapper({ formElements });
  const { data: fetchAllUser } = useFetchAllUserQuery();
  const { isLoading, data: org, refetch, isFetching } = useFetchOrgStructureQuery();
  const [createIdentity, { isLoading: isCreatingLoading }] = useCreateIdentityMutation();
  const { data: fetchedTemplatedata } = useFetchTemplateDataQuery();

  const handleChange = (value: any, fieldName: any) => {
    // console.log("value", value)

    if (fieldName === "BUSINESS_UNIT") {
      methods.reset({
        ...methods.getValues(),
        DEPARTMENT_NAME: null
      });
    }

    setFormElements((currentElements) => {
      const userArray = fetchAllUser?.data?.users || [];
      const newElements = dropdownValues(currentElements, userArray, { ...org }, handleChange, value);
      return Array.isArray(newElements) ? newElements : [];
    });

  };

  useEffect(() => {
    if (data || fetchAllUser || org) {
      setFormElements(dropdownValues(data, fetchAllUser?.data?.users, { ...org }, handleChange, null));
    }
  }, [data, fetchAllUser, org]);

  const onSubmit = async (data: any) => {
    // console.log(data);
    // return false

    let SENT_DATA: any = {
      BUSINESS_UNITS: data?.BUSINESS_UNIT ? Number(data?.BUSINESS_UNIT) : null,
      DEPARTMENT_NAME: data?.DEPARTMENT_NAME ? Number(data?.DEPARTMENT_NAME) : undefined,
      ESTIMATED_BUSINESS_EFFORT: data?.ESTIMATED_BUSINESS_EFFORT ? Number(data?.ESTIMATED_BUSINESS_EFFORT) : null,
      ESTIMATED_EFFORT_IT: data?.ESTIMATED_EFFORT ? Number(data?.ESTIMATED_EFFORT) : null,
      PLANNING_END_DATE: data?.PLANNING_END_DATE || null,
      PLANNING_START_DATE: data?.PLANNING_START_DATE || null,
      REQUESTED_BY: data?.REQUESTED_BY ? Number(data?.REQUESTED_BY) : null,
      REQUESTED_ON: data?.REQUESTED_ON ? data?.REQUESTED_ON : null,
      RISK_ASSESSMENT_TITLE: data?.RISK_ASSESSMENT_TITLE || null,
      RISK_CHAMPION: data?.RISK_CHAMPION ? Number(data?.RISK_CHAMPION) : null,
      RISK_TYPE: data?.RISK_TYPE || undefined,
      TEMPLATE_ID: fetchedTemplatedata?.data?.data?.[0]?.ID ? Number(fetchedTemplatedata?.data?.data?.[0]?.ID) : 0,
    };

    // console.log("SENT_DATA", SENT_DATA)
    // return
    try {
      const response: any = await createIdentity(SENT_DATA).unwrap();
      // console.log("response", response);
      if (response && response?.status) {
        dispatch(setIdentifyId(response?.data?.ID));
        toast.success(response?.message);
        refetch();
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Paper bg={"none"}>
      <Loader visible={isCreatingLoading} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex align={"center"} justify={"flex-end"} gap={"s10"} mb={"s10"}>
            <Tooltip label='Reset form'>
              <div>
                <MantineBtn
                  variant='secondary'
                  size='sm'
                  onlyIcon={true}
                  onClick={() => {
                    reset();
                    // setFormElements(dropdownValues(data, fetchAllUser.data.users, org, handleChange, null));
                  }}
                >
                  <IconRestore />
                </MantineBtn>
              </div>
            </Tooltip>
            <MantineBtn type='submit' size='sm' variant='primary'>
              Save
            </MantineBtn>
          </Flex>
          {form}
        </form>
      </FormProvider>
    </Paper>
  );
};

export default Identify;
