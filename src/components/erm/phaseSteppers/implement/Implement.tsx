import { Flex, Paper, SimpleGrid, Text, createStyles, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SelectInput from "../../inputFields/SelectInput";
import ErmTable from "../../ermTable/ErmTable";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import RiskCountText from "./RiskCountText";
import RiskCardTitle from "./RiskCardTitle";
import { useCreateControlMutation, useFetchAllControlQuery, useFetchAssessMutation } from "@/store/api/ermNewApiSlice";
import { useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";
import MantineCheckbox from "../../inputFields/MantineCheckbox";
import { ImplementTable } from "./ImplementTable";

const useStyle = createStyles((theme) => {
  return {
    container: {
      borderRadius: theme.other.spacing.s16,
      border: `0.98px dashed ${theme.colors.gray[4]}`,
      background: theme.colors.gray[0],
      padding: theme.other.spacing.s16,
      paddingBottom: theme.other.spacing.s20,
    },
    cardTitle: {
      ...theme.other.typographyScales.bodyB1,
      color: theme.colors.black[7],
    },
    cardDescription: {
      ...theme.other.typographyScales.labelL1,
      color: theme.colors.black[4],
    },
    containerReport: {
      borderRadius: theme.other.spacing.s16,
      border: `0.98px dashed ${theme.colors.gray[4]}`,
      background: theme.colors.gray[0],
      padding: `${theme.other.spacing.s32} ${theme.other.spacing.s24}`,
    },
    cardDescription2: {
      ...theme.other.typographyScales.bodyB4,
      color: theme.colors.black[4],
    },
    tableContainer: {
      borderRadius: theme.other.spacing.s16,
      border: `1px solid ${theme.colors.gray[4]}`,
      // height: rem(429),
      padding: `${theme.other.spacing.s12} ${theme.other.spacing.s8}`,
    },
    tableTitle: {
      ...theme.other.typographyScales.bodyB3,
      color: theme.colors.black[7],
    },
    tableDescription: {
      ...theme.other.typographyScales.labelL3,
      color: theme.colors.black[2],
    },
    tableHeaderText: {
      ...theme.other.typographyScales.labelL1,
      color: theme.colors.black[4],
    },
    tablecellText: {
      ...theme.other.typographyScales.labelL2,
      color: theme.colors.black[7],
    },
  };
});

const dropdownValues = (fetchAllControls: any = []) => {
  // console.log("value", fetchAllControls)
  // return
  let dropdownData = [];

  dropdownData = fetchAllControls?.map((user: any) => ({
    label: user.CONTROL_NAME,
    value: user.ID,
  }));

  return dropdownData;
};

const Implement = () => {
  const theme = useMantineTheme();
  const { data: fetchAllControl } = useFetchAllControlQuery();
  const [createControl, { isLoading: isCreatingLoading }] = useCreateControlMutation();
  const { classes } = useStyle();
  const [control, setControl] = useState<string>("");
  const [residualImpact, setResidualImpact] = useState<string>("");
  const [residualLikelihood, setResidualLikelihood] = useState<string>("");
  const [controlData, setControlData] = useState<any[]>([]);
  const { identifyId } = useAppSelector((state) => state.identifyId);
  const [fetchAssess, { isLoading: isAccessLoading }] = useFetchAssessMutation();
  const [accessData, setAccessData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [disabledStat, setDisabledStat] = useState<boolean>(true);

  const fetchAssessList = async () => {
    // if (!identifyId) return toast.warning("Please Fill Identify Stepper Form");
    let obj = {
      RISK_IDENTITY_ID: 11,
    };
    try {
      const response: any = await fetchAssess(obj).unwrap();
      console.log("response", response);
      if (response && response?.status) {
        // let dataArr = response?.data.map((ite: any) => {
        //   let multi = ite.RESIDUAL_IMPACT * ite.RESIDUAL_LIKELIHOOD;
        //   return {
        //     ...ite,
        //     RESIDUAL_RISK_CAL: multi,
        //   };
        // });
        // console.log("multi", dataArr);

        setAccessData(response?.data);
        // toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    // console.log("fetchAllControl data:", fetchAllControl?.data?.controlDetails);
    if (fetchAllControl?.data?.controlDetails) {
      setControlData(dropdownValues(fetchAllControl.data.controlDetails));
    }
  }, [fetchAllControl]);

  useEffect(() => {
    fetchAssessList();
  }, []);

  useEffect(() => {
    setDisabledStat(!selectedRow.length);
  }, [selectedRow]);

  function handleSelectChange(event: any) {
    setControl(event);
  }

  function handleResudualChange(event: any) {
    // console.log("residual", event);
    setResidualImpact(event);
  }

  function handleLikelihoodChange(event: any) {
    setResidualLikelihood(event);
  }

  const handleSubmit = async () => {
    if (control == "" || residualImpact == "" || residualLikelihood == "") {
      toast.warning("Please Fill All Fields");
    }
    // else if (!identifyId) {
    //   toast.warning("Please Fill Identify Stepper Form");
    // }
    else if (selectedRow.length == 0) {
      toast.warning("Please Select Risk From The List");
    } else {
      const controlImplementArray = [];

      for (let i = 0; i < selectedRow.length; i++) {
        const newItem = {
          ACCESS_ID: Number(selectedRow[i]),
          CONTROL_ID: Number(control),
          RESIDUAL_IMPACT: Number(residualImpact),
          RESIDUAL_LIKELIHOOD: Number(residualLikelihood),
        };

        // Add the new object to the array
        controlImplementArray.push(newItem);
      }

      let SEND_DATA = {
        CONTROL_IMPLEMENT: controlImplementArray,
      };
      // console.log("controlImplementArray", SEND_DATA);
      try {
        const response: any = await createControl(SEND_DATA).unwrap();
        // console.log("response", response);
        if (response && response?.status) {
          toast.success(response?.message);
          setResidualLikelihood("");
          setResidualImpact("");
          setControl("");
          setSelectedRow([]);
          fetchAssessList();
        } else {
          toast.error(response?.message);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <SimpleGrid cols={1} spacing={theme.other.spacing.s8}>
      <SimpleGrid cols={2} spacing='xs' verticalSpacing='xs'>
        <div className={classes.container}>
          <Flex w={"100%"} direction={"column"} gap={theme.other.spacing.s24}>
            <Flex align={"center"} justify={"space-between"}>
              <RiskCardTitle title={"Control Implementation"} paragraph={"Implement and Add Controls"} />
              <Flex align={"center"} justify={"space-between"} gap={"s10"}>
                {/* <MantineBtn variant='secondary' size='sm'>
                  View Details
                </MantineBtn> */}
                <MantineBtn variant='primary' size='sm' onClick={handleSubmit} disabled={disabledStat}>
                  Save
                </MantineBtn>
              </Flex>
            </Flex>
            <SelectInput
              name={"Select_Input"}
              controller={false}
              tooltip={"Select an input"}
              data={controlData}
              placeholder='Select an input field'
              label='Select Files from Existing Evidence'
              onChange={handleSelectChange}
              value={String(control)}
              disabled={disabledStat}
            />
            <Flex justify={"space-between"} align={"center"} gap={"s8"}>
              <Paper w={"100%"} bg={"none"}>
                <SelectInput
                  name={"Select_Input"}
                  controller={false}
                  tooltip={"Select an input"}
                  data={[
                    { label: 1, value: "1" },
                    { label: 2, value: "2" },
                    { label: 3, value: "3" },
                    { label: 4, value: "4" },
                    { label: 5, value: "5" },
                  ]}
                  placeholder='Select an input field'
                  label='Select Residual Impact'
                  onChange={handleResudualChange}
                  value={String(residualImpact)}
                  disabled={disabledStat}
                />
              </Paper>
              <Paper w={"100%"} bg={"none"}>
                <SelectInput
                  name={"Select_Input"}
                  controller={false}
                  tooltip={"Select an input"}
                  data={[
                    { label: 1, value: 1 },
                    { label: 2, value: "2" },
                    { label: 3, value: "3" },
                    { label: 4, value: "4" },
                    { label: 5, value: "5" },
                  ]}
                  placeholder='Select an input field'
                  label='Select Residual Likelihood'
                  onChange={handleLikelihoodChange}
                  value={String(residualLikelihood)}
                  disabled={disabledStat}
                />
              </Paper>
            </Flex>
          </Flex>
        </div>
        <div className={classes.containerReport}>
          <Flex w={"100%"} direction={"column"} gap={theme.other.spacing.s40}>
            <RiskCardTitle title={"Report Summary"} paragraph={"Important Data about Risks"} />
            <div>
              <SimpleGrid cols={3}>
                <RiskCountText title={"102"} paragraph={"Total Risk"} />
                <RiskCountText title={"102"} paragraph={"Average Inherent Risks"} />
                <RiskCountText title={"102"} paragraph={"Average Residual Risks"} />
                <RiskCountText title={"89"} paragraph={"Risks Without Controls"} />
                <RiskCountText title={"72"} paragraph={"Risks With Controls"} color={theme.colors.spring[7]} />
                <RiskCountText title={"69"} paragraph={"Risks Without Controls"} color={theme.colors.red[7]} />
              </SimpleGrid>
            </div>
          </Flex>
        </div>
      </SimpleGrid>
      <ImplementTable dataList={accessData} setSelectedRow={setSelectedRow} selectedRow={selectedRow} />
    </SimpleGrid>
  );
};

export default Implement;
