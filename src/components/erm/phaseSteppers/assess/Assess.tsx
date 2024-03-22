import * as XLSX from "xlsx";
import { Flex, Paper, Text, createStyles, useMantineTheme } from "@mantine/core";
import ClickableTabs from "./ClickableTabs";
import Upload from "./Upload";
import { useEffect, useMemo, useState } from "react";
import { MIME_TYPES } from "@mantine/dropzone";
import { IconUser } from "@tabler/icons-react";
import MantineModal from "../../genericComponents/modal/MantineModal";
import { toast } from "react-toastify";
import { useUploadRiskRegisterMutation } from "@/store/api/ermMasterDataSlice";
import Loader from "@/components/Loader";
import RegisterRiskManually from "./RegisterRiskManually";
import { useFetchAssessMutation, useFetchRiskByUploadIDMutation } from "@/store/api/ermNewApiSlice";
import { ControlDetail } from "@/store/interface/ErmNewInterface";
import { useAppSelector } from "@/store/store";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";
import { Progress } from "@mantine/core";
import AssessTable from "./AssessTable";
import SelectRiskTable from "./SelectRiskTable";
import MantineTransition from "@/components/transition/MantineTransition";

const Assess = () => {
  const theme = useMantineTheme();
  const [selectedFile, setSelectedFile] = useState<undefined | File>();
  const [uploadRiskRegister, { isLoading: savingRisk }] = useUploadRiskRegisterMutation();
  const [fetchRiskByUploadID, { isLoading: fetchingRisks }] = useFetchRiskByUploadIDMutation();
  const [fetchedRisks, setFetchedRisks] = useState<ControlDetail[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  // Modal states
  const [modalData, setModalData] = useState<{
    modalContent: "addRisk" | "chooseRisk" | undefined;
    modalTitle: string;
    modalDesc: string;
  }>({
    modalContent: undefined,
    modalTitle: "",
    modalDesc: "",
  });
  const { identifyId } = useAppSelector((state) => state.identifyId);
  const [fetchAssess, { isLoading: isAccessLoading }] = useFetchAssessMutation();
  const [accessData, setAccessData] = useState<any[]>([]);
  const { classes } = createStyles((theme) => {
    return {
      main_conatiner: {
        padding: theme.other.spacing.s8,
        gap: theme.other.spacing.s8,
        borderRadius: theme.other.spacing.s16,
        background: theme.colors.gray[1],
      },
      upload_zone: {
        padding: `${theme.other.spacing.s24} ${theme.other.spacing.s16}`,
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.other.spacing.s16,
        border: `0.98px dashed ${theme.colors.gray[4]}`,
      },
    };
  })();

  // select handler for uploading a risk file
  const selectHandler = async (files: any) => {
    // checking for undefined files
    if (!files) return;
    if (!files[0]) {
      toast.error("Select a file first!");
      return;
    }
    setSelectedFile(files[0]);
    // creating file reader object so that the xls package can easily convert the file into json format
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);

    reader.onload = async (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[2];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { range: 7, defval: null, raw: false });
      const dataArr = [
        "FUNCTION",
        "PROCESS_NAME",
        "SUB_PROCESS_NAME",
        "SOP_AVAILABLE",
        "RISK_EVENT_REFERENCE",
        "RISK_DESCRIPTION",
        "RISK_CASUAL_FACTORS",
        "RISK_CATEGORY",
        "ROOT_CAUSE",
        "RISK_IMPACT_DESCRIPTION",
        "RISK_DATA_SOURCE",
        "REF_DESCRIPTION",
        "RISK_LIKELIHOOD",
        "RISK_IMPACT",
        "COMBINED_RISK_ASSESSMENT",
        "RISK_OWNER",
        "CONTROL_REF",
        "CONTROL",
        "CONTROL_DESCRIPTION",
        "CONTROL_FREQUENCY",
        "CONTROL_TYPE",
        "CONTROL_CATEGORY",
        "CONTROL_CLASSIFICATION",
        "CONTROL_DESIGN_EFFECTIVENESS",
        "CONTROL_OPERATIVE_EFFECTIVENESS",
        "CONTROL_OWNER",
        "RESIDUAL_RISK",
        "REMARKS",
        "ACTION_REQUIRED",
        "ACTION_PLAN_REFERENCE",
        "ACTION_PLAN_ITEM",
        "TARGET_DATE",
      ];
      // renaimg undesired properties
      function renameProperties(obj: any) {
        const renamedObj: any = {};
        for (let key in obj) {
          const freeTextReplace = key.replace(/ \(FREE_TEXT\)|\r\n/g, "");
          const BracketReplace = freeTextReplace.replace(/\([^)]*\)/g, "");
          const finalKey = BracketReplace.replace(/ /g, "_").toUpperCase();
          let transformedKey = finalKey
            .replace(/SUB_PROCESS_/g, "SUB_PROCESS")
            .replace(/RISK_EVENT_REFERENCE_#/g, "RISK_EVENT_REFERENCE")
            .replace(/CONTROL_REF._#./g, "CONTROL_REF")
            .replace(/_CONTROL/g, "CONTROL")
            .replace(/REMARKS,_IF_ANY/g, "REMARKS")
            .replace(/SUB_PROCESS/g, "SUB_PROCESS_NAME")
            .replace(/REF._DESCRIPTION/g, "REF_DESCRIPTION")
            .replace(/COMBINEDCONTROL_EFFECTIVENESS/g, "COMBINED_CONTROL_EFFECTIVENESS")
            .replace(/RISK_CAUSAL_FACTORS/g, "RISK_CASUAL_FACTORS")
            .replace(/RISK_DATA_SOURCES/g, "RISK_DATA_SOURCE")
            .replace(/CONTROL_OPERATING_EFFECTIVENESS/g, "CONTROL_OPERATIVE_EFFECTIVENESS");
          if (dataArr.includes(transformedKey)) {
            renamedObj[transformedKey] = obj[key];
          }
        }
        return renamedObj;
      }

      const ParsedKeysData = parsedData.map((obj) => renameProperties(obj));

      // sending the formatted data to backend
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("DATA", JSON.stringify(ParsedKeysData));
        formData.append("TYPE", "risk-register");
        formData.append("SHEETS_NUMBER", "2");

        const response = await uploadRiskRegister(formData).unwrap();

        if (response && response.status) {
          toast.success(response.message || "Action completed");
        } else {
          toast.error(response.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    };
  };

  const fetchAllRiskByFileId = async () => {
    try {
      const res = await fetchRiskByUploadID().unwrap();
      // console.log("res", res.data.controlDetails);

      if (res && res.status) {
        setFetchedRisks(res.data.controlDetails);
        // toast.success(res.message || "Action completed");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchAssessList = async () => {
    if (!identifyId) return toast.warning("Please Fill Identify Stepper Form");

    let obj = {
      RISK_IDENTITY_ID: +identifyId,
    };
    try {
      const response: any = await fetchAssess(obj).unwrap();
      // console.log("response", response);
      if (response && response?.status) {
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
    fetchAllRiskByFileId();
    fetchAssessList();
  }, []);

  return (
    <>
      <Loader visible={savingRisk || fetchingRisks} />
      <MantineModal
        size={modalData?.modalContent === "chooseRisk" ? "100%" : "40%"}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        modalHeadText={modalData.modalTitle}
        modalHeadSubText={modalData.modalDesc}
      >
        <>
          <MantineTransition condition={modalData?.modalContent === "addRisk"}>
            <RegisterRiskManually
              setModalData={setModalData}
              setShowModal={setShowModal}
              fetchAssessList={fetchAssessList}
              fetchAllRiskByFileId={fetchAllRiskByFileId}
            />
          </MantineTransition>

          <MantineTransition condition={modalData?.modalContent === "chooseRisk"}>
            <SelectRiskTable
              fetchedRisks={fetchedRisks}
              fetchAssessList={fetchAssessList}
              setShowModal={setShowModal}
            />
          </MantineTransition>
        </>
      </MantineModal>
      <Paper bg={"none"}>
        <Flex align={"center"} justify={"flex-end"} gap={"s10"} mb={"s10"}>
          <MantineBtn variant='secondary' size='md'>
            View Details
          </MantineBtn>
          <MantineBtn size='md'>Save</MantineBtn>
        </Flex>
        <Flex direction={"column"} className={classes.main_conatiner}>
          <Flex gap={"s8"} align={"stretch"} justify={"stretch"}>
            <Flex className={classes.upload_zone} gap={"s16"} w={"100%"}>
              <Upload
                selectedFile={selectedFile}
                isLoading={savingRisk}
                selectHandler={selectHandler}
                uploadTypes={[MIME_TYPES.xlsx]}
                uploadTypeName={".xlsx"}
                uploadFileName={"Excel"}
              />

              <Flex bg={"none"} pt={"s12"} gap={"s16"} direction={"column"} w={"100%"}>
                <Flex gap={"s6"}>
                  <MantineBtn leftIcon={<IconUser />} size='sm'>
                    Button
                  </MantineBtn>
                  <MantineBtn variant='secondary' size='sm'>
                    Browse
                  </MantineBtn>
                </Flex>
                <Paper bg={"none"} w={"100%"}>
                  <Text color={theme.colors.black[2]} className='labelL3'>
                    Uploaded File Should be either in <span style={{ color: theme.colors.black[4] }}>Excel </span>,{" "}
                    <span style={{ color: theme.colors.black[4] }}>XML</span> or{" "}
                    <span style={{ color: theme.colors.black[4] }}>CSV</span>
                  </Text>
                  <Text color={theme.colors.black[2]} className='labelL3'>
                    Maximum size should be less than <span style={{ color: theme.colors.black[4] }}>100 MB</span>
                  </Text>
                </Paper>
                {savingRisk && (
                  <Flex
                    p={"s16"}
                    direction={"column"}
                    sx={(theme) => ({
                      borderRadius: theme.other.spacing.s12,
                      border: `1px solid ${theme.colors.gray[4]}`,
                    })}
                  >
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex
                        justify={"flex-start"}
                        align={"center"}
                        gap={"s12"}
                        pt={"s10"}
                        pb={"s10"}
                        pl={"s4"}
                        pr={"s4"}
                      >
                        <Text className='bodyB3'>{savingRisk ? "Uploading..." : "Uploaded!"}</Text>
                        <Text className='bodyB3'>|</Text>
                        {/* <Text className='bodyB3'>{val}%</Text> */}
                        <Text className='labelL1' color={theme.colors.black[2]}>
                          ({selectedFile?.name})
                        </Text>
                      </Flex>
                    </Flex>
                    <Progress
                      value={100}
                      animate={savingRisk}
                      color={theme.colors.waterfall[7]}
                      h={"s12"}
                      sx={(theme) => {
                        return {
                          borderRadius: theme.other.spacing.s20,
                        };
                      }}
                    />
                    {/* <Paper bg={"none"} p={"s4"}>
                    <Text className='labelL3' color={theme.colors.black[2]}>
                      {100 - val}s left
                    </Text>
                  </Paper> */}
                  </Flex>
                )}
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={"s8"} align={"stretch"} w={"100%"}>
              <ClickableTabs
                headText='Import From Master'
                subHeadText='Click on this to open the Risk Register Master'
                onClick={() => {
                  setShowModal(true);
                  setModalData({
                    modalContent: "chooseRisk",
                    modalTitle: "Risk List",
                    modalDesc: "Choose risk(s) from the below the list",
                  });
                }}
              />
              <ClickableTabs
                headText='Add Risk Manually'
                subHeadText='Click on this to add Risks manually using a form'
                onClick={() => {
                  setShowModal(true);
                  setModalData({
                    modalContent: "addRisk",
                    modalTitle: "Risk Details",
                    modalDesc: "Fill all the fields for manually adding a new Risk",
                  });
                }}
              />
            </Flex>
          </Flex>
          <AssessTable accessData={accessData} />
        </Flex>
      </Paper>
    </>
  );
};

export default Assess;
