import { useEffect, useState } from "react";
import RiskCountText from "../implement/RiskCountText";
import { Flex, Paper, SimpleGrid, createStyles, useMantineTheme } from "@mantine/core";
import RiskCardTitle from "../implement/RiskCardTitle";
import SelectInput from "../../inputFields/SelectInput";
import MantineFileUpload from "../../inputFields/MantineFileUpload";
import {
  useCreateEvidenceMutation,
  useCreateMonitorMutation,
  useFetchAllEvidenceQuery,
  useFetchAssessMutation,
} from "@/store/api/ermNewApiSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/store";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";
import { ImplementTable } from "../implement/ImplementTable";

const Monitor = () => {
  const theme = useMantineTheme();
  const [value, setValue] = useState<File | null>(null);
  const [evidenceList, setEvidenceList] = useState<any[]>([]);
  const [createEvidence, { isLoading: isEvidenceLoading }] = useCreateEvidenceMutation();
  const [createMonitor, { isLoading: isMonitorLoading }] = useCreateMonitorMutation();

  const { data: fetchAllEvidence, refetch } = useFetchAllEvidenceQuery();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fetchAssess, { isLoading: isAccessLoading }] = useFetchAssessMutation();
  const [accessData, setAccessData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { identifyId } = useAppSelector((state) => state.identifyId);
  const [disabledStat, setDisabledStat] = useState<boolean>(true);


  const { classes } = createStyles((theme) => {
    return {
      container: {
        borderRadius: theme.other.spacing.s16,
        border: `0.98px dashed ${theme.colors.gray[4]}`,
        background: theme.colors.gray[0],
        padding: theme.other.spacing.s16,
        paddingBottom: theme.other.spacing.s20,
      },
      containerReport: {
        borderRadius: theme.other.spacing.s16,
        border: `0.98px dashed ${theme.colors.gray[4]}`,
        background: theme.colors.gray[0],
        padding: `${theme.other.spacing.s32} ${theme.other.spacing.s24}`,
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
  })();

  const handleFileUpload = async (event: any) => {
    // console.log("event", event)
    // return
    // setValue(event);
    let formData = new FormData();
    formData.append("file", event);
    // console.log("formData", formData)
    // return false
    try {
      const response: any = await createEvidence(formData).unwrap();
      // console.log("response", response);
      if (response && response?.status) {
        toast.success(response?.message);
        setValue(event);
        setFileUploaded(true);
        refetch();
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const fetchAssessList = async () => {
    // if (!identifyId) return toast.warning("Please Fill Identify Stepper Form");
    let obj = {
      RISK_IDENTITY_ID: 11,
    };
    try {
      const response: any = await fetchAssess(obj).unwrap();
      // console.log("response", response);
      if (response && response?.status) {
        console.log("response?.data", response?.data)
        // let dataArr = response?.data.map((ite: any) => {
        //   let multi = ite.RESIDUAL_IMPACT * ite.RESIDUAL_LIKELIHOOD;
        //   return {
        //     ...ite,
        //     RESIDUAL_RISK_CAL: multi,
        //   };
        // });
        // console.log("multi", dataArr);

        setAccessData(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (fetchAllEvidence?.data) {
      let mpaEvidence = fetchAllEvidence.data.map((ite: any) => {
        return {
          label: ite.ATTACHMENT_ORIGINALNAME,
          value: ite.ID,
        };
      });
      setEvidenceList(mpaEvidence);
    }
  }, [fetchAllEvidence]);

  useEffect(() => {
    fetchAssessList();
  }, []);

  useEffect(() => {
    setDisabledStat(!selectedRow.length);



  }, [selectedRow])

  const handleSelect = async (event: any) => {
    // if (confirm("Do you want to continue?")) {
    setSelectedValue(event);
  };

  const handleSave = async () => {
    if (selectedValue == "") {
      toast.warning("Please Select Attachment");
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
          EVIDENCE_ID: Number(selectedValue),
        };

        controlImplementArray.push(newItem);
      }

      let SEND_DATA = {
        items: controlImplementArray,
      };
      // console.log("controlImplementArray", SEND_DATA);
      // return false
      try {
        const response: any = await createMonitor(SEND_DATA).unwrap();
        // console.log("response", response);
        if (response && response?.status) {
          toast.success(response?.message);
          setSelectedValue("");
          setSelectedRow([])
          fetchAssessList();

        } else {
          toast.error(response?.message);
          // setSelectedValue("");
        }
      } catch (error: any) {
        toast.error(error?.message);
        // setSelectedValue("");
      }
    }
  }

  return (
    <SimpleGrid cols={1} spacing={theme.other.spacing.s8}>
      <SimpleGrid cols={2} spacing='xs' verticalSpacing='xs'>
        <div className={classes.container}>
          <Flex w={"100%"} direction={"column"} gap={theme.other.spacing.s24}>
            <Flex align={"center"} justify={"space-between"}>
              <RiskCardTitle
                title={"Attached File for Controls"}
                paragraph={"Evidences can be attached from this section for every Control"}
              />
              <MantineBtn size='sm' onClick={handleSave} disabled={disabledStat}>Save</MantineBtn>
            </Flex>
            <SelectInput
              name={"Select_Input"}
              controller={false}
              tooltip={"Select an input"}
              data={evidenceList}
              placeholder='Select an input field'
              label='Select Files from Existing Evidence'
              value={selectedValue}
              onChange={handleSelect}
              disabled={disabledStat}
            />
            <Flex align={"center"} gap={"s24"}>
              <Paper w={"70%"} bg={"none"}>
                {/* <SelectInput
                  name={"Select_Input"}
                  controller={false}
                  tooltip={".pdf and .xls files will be accepted"}
                  data={["Test1", "Test2", "Test3"]}
                  placeholder='Select an input field'
                  label='Attach Evidence'
                /> */}
                <MantineFileUpload
                  name='Attach Evidence'
                  label='Attach Evidence'
                  value={value}
                  onChange={(event) => {
                    handleFileUpload(event);
                  }}
                  placeholder='Choose a file'
                  tooltip=''
                  controller={false}

                />
              </Paper>
              {/* <Buttons variant='secondarySmall' leftIcon={<IconUpload />}>
                Upload
              </Buttons> */}
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

export default Monitor;
