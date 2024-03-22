import ErmUpload from "@/components/erm/ermUpload/ErmUpload";
import { useFetchUploadHistoryMutation, useUploadControlsMutation } from "@/store/api/ermMasterDataSlice";
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

const Upload = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [active, setActive] = useState(true);
  const { parsedData } = useAppSelector((state) => state.ermNew);
  const [uploadControls, { isLoading }] = useUploadControlsMutation();
  const [fetchUploadHistory, { isLoading: uploadHistoryLoading }] = useFetchUploadHistoryMutation();
  const [tableHistory, setTableHoistory] = useState<ExcelFile[]>([]);

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
      const sheetName = workbook.SheetNames[1];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { range: 1, defval: null, raw: false });

      const dataArr = [
        "MEMBER_ORGANIZATION_CODE",
        "DOMAIN_CODE",
        "DOMAIN_NAME",
        "SUBDOMAIN_CODE",
        "SUBDOMAIN_NAME",
        "CONTROL_CODE",
        "CONTROL_NAME",
      ];

      function renameProperties(obj: any) {
        const renamedObj: any = {};
        for (let key in obj) {
          const freeTextReplace = key.replace(/ \(FREE_TEXT\)|\r\n/g, "");
          const BracketReplace = freeTextReplace.replace(/\([^)]*\)/g, "");
          const finalObj = BracketReplace.replace(/ /g, "_").toUpperCase();
          if (dataArr.includes(finalObj)) {
            renamedObj[finalObj] = obj[key];
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
      const res = await fetchUploadHistory({ TYPE: "control" }).unwrap();
      const resStructure = res?.map((el) => {
        return {
          ...el,
          CREATED_AT: new Date(el.CREATED_AT).toUTCString(),
        };
      });
      setTableHoistory(resStructure);
    };
    fetchHistory();
  }, [fetchUploadHistory]);

  const keys = tableHistory ? Object.keys(tableHistory?.[0] || []) : [];

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
        title={"Controls Master"}
        description={"Upload an Excel file contains controls"}
        publishHandler={async () => {
          try {
            if (selectedFile) {
              console.log("parsedData", parsedData);
              const formData = new FormData();
              formData.append("file", selectedFile);
              formData.append("DATA", JSON.stringify(parsedData));
              formData.append("TYPE", "control");
              formData.append("SHEETS_NUMBER", "1");
              const response = await uploadControls(formData).unwrap();
              toast.success(response.message, {
                autoClose: 1000,
              });
            }
          } catch (error: any) {
            toast.error(error.message, {
              autoClose: 1000,
            });
            console.log("error", error);
          }
        }}
        isLoadingPublish={isLoading}
        LastUploadFile={tableHistory?.[0]?.FILE_NAME || "0"}
        TotalFileUpload={tableHistory?.length}
        columns={columns}
        data={tableHistory || []}
      />
    </>
  );
};

export default Upload;
