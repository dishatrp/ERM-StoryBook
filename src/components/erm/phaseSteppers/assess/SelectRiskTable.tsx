import { Flex, Paper, Text, Tooltip } from "@mantine/core";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import ErmTable from "../../ermTable/ErmTable";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { ControlDetail } from "@/store/interface/ErmNewInterface";
import { useAppSelector } from "@/store/store";
import { Id, toast } from "react-toastify";
import { useSaveSelectedRisksMutation } from "@/store/api/ermNewApiSlice";
import Loader from "@/components/Loader";
import { IconDeviceFloppy } from "@tabler/icons-react";
import MantineTransition from "@/components/transition/MantineTransition";

export const NOT_INCLUDED_COLS = [
  "FILE_ID",
  "STATUS",
  "PROCESS_ID",
  "SUB_PROCESS_ID",
  "TARGET_DATE",
  "UPDATED_AT",
  "UPDATED_BY",
  "CREATED_AT",
  "CREATED_BY",
];

export const INCLUDED_COLS = [
  "RISK_DESCRIPTION",
  "FUNCTION",
  "RISK_LIKELIHOOD",
  "RISK_IMPACT",
  "COMBINED_RISK_ASSESSMENT",
  "PROCESS_NAME",
  "SUB_PROCESS_NAME",
  "SOP_AVAILABLE",
  "RISK_EVENT_REFERENCE",
  "ROOT_CAUSE",
  "RISK_DATA_SOURCE",
];

interface SelectRiskTable {
  fetchedRisks: ControlDetail[];
  fetchAssessList: () => Promise<Id | undefined>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const SelectRiskTable = ({ fetchedRisks, fetchAssessList, setShowModal }: SelectRiskTable) => {
  const { identifyId } = useAppSelector((state) => state.identifyId);
  const [saveSelectedRisks, { isLoading: savingSelections }] = useSaveSelectedRisksMutation();

  const colArr: MRT_ColumnDef<any>[] = useMemo<MRT_ColumnDef<any>[]>(() => {
    return Object.keys(fetchedRisks?.[0] || {})
      ?.filter((item: string) => {
        return INCLUDED_COLS.includes(item);
      })
      ?.map((item: any) => {
        return {
          accessorKey: item,
          header: item,
          Header: <Text>{item.toUpperCase().replace("_ID", "").replaceAll("_", " ")}</Text>,
          // minSize: fetchedRisks?.[idx]?.[item]?.length > 50 ? 500 : 200,
          Cell: ({ cell }: { cell: any }) => {
            return <Text>{cell?.getValue()}</Text>;
          },
        };
      });
  }, [fetchedRisks]);

  const saveHandler = async (rows: ControlDetail[]) => {
    if (!identifyId) return toast.warning("Please fill the Identify stepper form first");

    const SENT_DATA: any = {
      items: rows?.map((item: ControlDetail) => {
        return {
          RISK_IDENTITY_ID: +identifyId,
          RISK_ID: +item.ID,
        };
      }),
    };

    try {
      const res = await saveSelectedRisks(SENT_DATA).unwrap();
      console.log("res", res);

      if (res && res.status) {
        setShowModal(false);
        fetchAssessList();
        toast.success(res.message || "Action completed");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Loader visible={savingSelections} />
      <Flex m={0} justify={"center"} align={"center"} maw={"90vw"}>
        <Paper bg={"none"} maw={"87vw"}>
          <ErmTable
            columns={colArr}
            data={fetchedRisks || []}
            density='xs'
            header={(table) => (
              <>
                <MantineTransition condition={table?.getSelectedRowModel()?.rows?.length > 0}>
                  <MantineBtn
                    variant='primary'
                    size='sm'
                    onClick={() => {
                      const rows: ControlDetail[] = table?.getSelectedRowModel()?.rows?.map((item) => item?.original);
                      saveHandler(rows);
                    }}
                    onlyIcon={true}
                  >
                    <Tooltip label='Save all selected rows' position='top'>
                      <IconDeviceFloppy />
                    </Tooltip>
                  </MantineBtn>
                </MantineTransition>
              </>
            )}
            otherTableConfigurations={{
              mantineTableContainerProps: {
                sx: {
                  height: "500px",
                },
              },
              enableRowSelection: true,
            }}
          />
        </Paper>
      </Flex>
    </>
  );
};

export default SelectRiskTable;
