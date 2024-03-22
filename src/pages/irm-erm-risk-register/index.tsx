import ErmUpload from "@/components/erm/ermUpload/ErmUpload";
import { useFetchUploadHistoryMutation, useUploadRiskRegisterMutation } from "@/store/api/ermMasterDataSlice";
import { ExcelFile } from "@/store/interface/ermMasterinterfcae";
import { setParsedData } from "@/store/slice/ermNewSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Text, createStyles } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const useStyles = createStyles((theme) => {
  return {
    tableHeaderText: {
      ...theme.other.typographyScales.labelL1,
      color: theme.colors.black["4"],
    },
    tablecellText: {
      ...theme.other.typographyScales.labelL2,
      color: theme.colors.black["7"],
    },
  };
});

const RiskRegister = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [active, setActive] = useState(true);
  const { parsedData } = useAppSelector((state) => state.ermNew);
  const [uploadRiskRegister, { isLoading }] = useUploadRiskRegisterMutation();
  const [fetchUploadHistory, { isLoading: uploadHistoryLoading }] = useFetchUploadHistoryMutation();
  const [tableHistory, setTableHoistory] = useState<ExcelFile[]>([]);
  const { classes } = useStyles();
  const [rerun, setRerun] = useState(false);

  const selectHandler = async (files: any) => {
    if (!files) return;

    if (!files[0]) {
      toast.error("Select a file first!");
      return;
    }
    setSelectedFile(files[0]);
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);

    reader.onload = (e: any) => {
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
      dispatch(setParsedData({ data: ParsedKeysData, type: "RESET" }));
    };

    reader.onloadend = () => {
      setTabs(1);
      setActive(false);
    };
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetchUploadHistory({ TYPE: "risk-register" }).unwrap();
      const resStructure = res.map((el) => {
        return {
          ...el,
          CREATED_AT: new Date(el.CREATED_AT).toUTCString(),
        };
      });
      setTableHoistory(resStructure);
    };
    fetchHistory();
  }, [fetchUploadHistory, rerun]);

  const keys = tableHistory ? Object.keys(tableHistory[0] || []) : [];

  const filteredKeys = keys.slice(1, -1);

  const columns: MRT_ColumnDef<any>[] = filteredKeys.map((el) => {
    return {
      accessorKey: el,
      header: el,
      Header: (
        <Text className={classes.tableHeaderText}>
          {el
            .toLowerCase()
            .split("_")
            .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")}
        </Text>
      ),
      Cell: ({ cell }: { cell: any }) => {
        return <Text className={classes.tablecellText}>{cell?.getValue()}</Text>;
      },
    };
  });

  return (
    <>
      <ErmUpload
        selecteHandler={selectHandler}
        active={active}
        tabs={tabs}
        progress={progress}
        setTabs={setTabs}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        title={"Risk Register Master"}
        description={"Upload an Excel file contains user details and Risks"}
        publishHandler={async () => {
          console.log("Paresed Data", parsedData);
          try {
            if (selectedFile) {
              const formData = new FormData();
              formData.append("file", selectedFile);
              formData.append("DATA", JSON.stringify(parsedData));
              formData.append("TYPE", "risk-register");
              formData.append("SHEETS_NUMBER", "2");
              const response = await uploadRiskRegister(formData).unwrap();
              console.log("rrr", response);
              setRerun((prev) => !prev);
              toast.success(response.message, {
                autoClose: 1000,
              });
            }
          } catch (error: any) {
            console.log("rrr", error);
            toast.error(error?.data?.message, {
              autoClose: 1000,
            });
          }
        }}
        isLoadingPublish={isLoading}
        LastUploadFile={tableHistory[0]?.FILE_NAME || "0"}
        TotalFileUpload={tableHistory.length}
        columns={columns}
        data={tableHistory || []}
      />
    </>
  );
};

export default RiskRegister;
