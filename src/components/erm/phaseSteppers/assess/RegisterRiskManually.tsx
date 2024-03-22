import React, { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useFormWrapper from "../../genericComponents/useFormWrapper";
import { Flex } from "@mantine/core";
import { useRegisterRiskManuallyMutation } from "@/store/api/ermNewApiSlice";
import Loader from "@/components/Loader";
import { Id, toast } from "react-toastify";
import { useAppSelector } from "@/store/store";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";

interface RegisterRiskManually {
  fetchAllRiskByFileId: () => Promise<void>;
  fetchAssessList: () => Promise<Id | undefined>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalData: Dispatch<
    SetStateAction<{
      modalContent: "addRisk" | "chooseRisk" | undefined;
      modalTitle: string;
      modalDesc: string;
    }>
  >;
}

const RISK_DETAILS_DATA = [
  {
    ID: "1",
    NAME: "Function",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "FUNCTION",
    PLACE_HOLDER: "Add Function Name",
    CREATED_AT: "2024-03-01T11:00:00.000Z",
    UPDATED_AT: "2024-03-01T11:00:00.000Z",
  },
  {
    ID: "2",
    NAME: "Process Name",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "PROCESS_NAME",
    PLACE_HOLDER: "Add Process Name",
    CREATED_AT: "2024-03-01T11:05:00.000Z",
    UPDATED_AT: "2024-03-01T11:05:00.000Z",
  },
  {
    ID: "3",
    NAME: "Sub-process Name",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "SUB_PROCESS_NAME",
    PLACE_HOLDER: "Add Sub-process Name",
    CREATED_AT: "2024-03-01T11:10:00.000Z",
    UPDATED_AT: "2024-03-01T11:10:00.000Z",
  },
  {
    ID: "4",
    NAME: "SoP",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "SOP_AVAILABLE",
    PLACE_HOLDER: "Add SoP",
    CREATED_AT: "2024-03-01T11:15:00.000Z",
    UPDATED_AT: "2024-03-01T11:15:00.000Z",
  },
  {
    ID: "5",
    NAME: "Risk Event Reference",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "RISK_EVENT_REFERENCE",
    PLACE_HOLDER: "Add Risk Event",
    CREATED_AT: "2024-03-01T11:20:00.000Z",
    UPDATED_AT: "2024-03-01T11:20:00.000Z",
  },
  {
    ID: "6",
    NAME: "Risk Description",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "RISK_DESCRIPTION",
    PLACE_HOLDER: "Add Risk Description",
    CREATED_AT: "2024-03-01T11:25:00.000Z",
    UPDATED_AT: "2024-03-01T11:25:00.000Z",
  },
  {
    ID: "7",
    NAME: "Risk Causal Factors",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "TEXT",
    INPUT_FIELD: "RISK_CASUAL_FACTORS",
    PLACE_HOLDER: "List Causal Factors",
    CREATED_AT: "2024-03-01T11:30:00.000Z",
    UPDATED_AT: "2024-03-01T11:30:00.000Z",
  },
  {
    ID: "8",
    NAME: "Risk Category",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "SELECT",
    INPUT_FIELD: "RISK_CATEGORY",
    PLACE_HOLDER: "Add Risk Category",
    CREATED_AT: "2024-03-01T11:30:00.000Z",
    UPDATED_AT: "2024-03-01T11:30:00.000Z",
    Dropdata: [
      {
        label: "Compliance",
        value: "Compliance",
      },
      {
        label: "Operational",
        value: "Operational",
      },
    ],
  },
  {
    ID: "9",
    NAME: "Inherent Impact",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "SELECT",
    INPUT_FIELD: "RISK_IMPACT",
    PLACE_HOLDER: "Choose inherent impact",
    CREATED_AT: "2024-03-01T11:30:00.000Z",
    UPDATED_AT: "2024-03-01T11:30:00.000Z",
    Dropdata: [
      {
        label: "Insignificant",
        value: "Insignificant",
      },
      {
        label: "Major",
        value: "Major",
      },
      {
        label: "Minor",
        value: "Minor",
      },
      {
        label: "Moderate",
        value: "Moderate",
      },
      {
        label: "Severe",
        value: "Severe",
      },
    ],
  },
  {
    ID: "10",
    NAME: "Inherent Likelihood",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "SELECT",
    INPUT_FIELD: "RISK_LIKELIHOOD",
    PLACE_HOLDER: "Choose inherent likelihood",
    CREATED_AT: "2024-03-01T11:30:00.000Z",
    UPDATED_AT: "2024-03-01T11:30:00.000Z",
    Dropdata: [
      {
        label: "Expected",
        value: "Expected",
      },
      {
        label: "Highly Likely",
        value: "Highly Likely",
      },
      {
        label: "Possible",
        value: "Possible",
      },
    ],
  },
  {
    ID: "11",
    NAME: "Combined Risk Assessment",
    TYPE: "INPUT",
    PARENT_ID: "0",
    DATA_TYPE: "SELECT",
    INPUT_FIELD: "COMBINED_RISK_ASSESSMENT",
    PLACE_HOLDER: "Choose combined assessment",
    CREATED_AT: "2024-03-01T11:30:00.000Z",
    UPDATED_AT: "2024-03-01T11:30:00.000Z",
    Dropdata: [
      {
        label: "Expected",
        value: "Expected",
      },
      {
        label: "Highly Likely",
        value: "Highly Likely",
      },
      {
        label: "Possible",
        value: "Possible",
      },
    ],
  },
];

const RegisterRiskManually = ({
  setModalData,
  setShowModal,
  fetchAssessList,
  fetchAllRiskByFileId,
}: RegisterRiskManually) => {
  const [formElements, setFormElements] = useState<any[]>(RISK_DETAILS_DATA);
  const methods = useForm<any>({
    mode: "all",
  });
  const { handleSubmit } = methods;
  const { form } = useFormWrapper({ formElements: formElements, makePortion: "OFF" });
  const [registerRiskManually, { isLoading: savingRiskData }] = useRegisterRiskManuallyMutation();
  const { identifyId } = useAppSelector((state) => state.identifyId);

  const onSubmit = async (data: any) => {
    if (!identifyId) return toast.error("Please fill the Identify stepper form first");
    const SENT_DATA = { ...data, RISK_IDENTITY_ID: identifyId };

    try {
      const response = await registerRiskManually(SENT_DATA).unwrap();

      if (response && response.status) {
        setShowModal(false);
        fetchAllRiskByFileId();
        fetchAssessList();
        toast.success(response.message || "Action completed");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Loader visible={savingRiskData} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex direction={"column"} gap={"s16"}>
            {form}
            <Flex align={"center"} justify={"flex-end"} gap={"s10"} mb={"s10"}>
              <MantineBtn
                variant='secondary'
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </MantineBtn>
              <MantineBtn type='submit' variant='primary'>
                Save
              </MantineBtn>
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterRiskManually;
