import { Flex, Paper, SimpleGrid, Text, createStyles, useMantineTheme } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
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

export const INCLUDED_COLS = [
  "RISK_DESCRIPTION",
  "FUNCTION",
  "PROCESS_NAME",
  "SUB_PROCESS_NAME",
  "SOP_AVAILABLE",
  "RISK_EVENT_REFERENCE",
  "ROOT_CAUSE",
  "RISK_DATA_SOURCE",
  "RISK_LIKELIHOOD",
  "RISK_IMPACT",
  "COMBINED_RISK_ASSESSMENT",
  "RESIDUAL_LIKELIHOOD",
  "RESIDUAL_IMPACT",
  "RESIDUAL_RISK",
  "ATTACHMENT_ORIGINALNAME",
];

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
const TableHeader = ({ title, paragraph }: { title: string; paragraph: string }) => {
  const { classes } = useStyle();
  return (
    <div>
      <Text className={`${classes.tableTitle} bodyB3`}>{title}</Text>
      <Text className={`${classes.tableDescription} labelL3`}>{paragraph}</Text>
    </div>
  );
};

export const ImplementTable = ({
  dataList,
  setSelectedRow,
  selectedRow,
}: {
  dataList: any;
  setSelectedRow: (selectedIds: string[]) => void;
  selectedRow: any;
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyle();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const handleSelectChange = (selectedId: string, isChecked: boolean) => {
    setSelectedIds((prevIds) => {
      let newIds = [];
      if (isChecked) {
        newIds = [...prevIds, selectedId];
      } else {
        newIds = prevIds.filter((id) => id !== selectedId);
      }
      setSelectedRow(newIds);
      return newIds;
    });
  };
  const colArr: MRT_ColumnDef<any>[] = useMemo<MRT_ColumnDef<any>[]>(() => {
    const selectionColumn: MRT_ColumnDef<any> = {
      id: "selection",
      header: "Select",
      minSize: 100,
      Header: <Text className={classes.tableHeaderText}>#</Text>,
      Cell: ({ row }) => {
        const isChecked = selectedIds.includes(row.original.ACCESS_ID);
        return (
          <MantineCheckbox
            onChange={(e) => handleSelectChange(row.original.ACCESS_ID, e.target.checked)}
            checked={isChecked}
          />
        );
      },
    };

    // console.log("collls", [selectionColumn, ...INCLUDED_COLS])

    return [
      selectionColumn,
      ...INCLUDED_COLS.map((item) => ({
        minSize: 200,
        accessorKey: item,
        header: item,
        Header: <Text className={classes.tableHeaderText}>{item.replace(/_/g, " ")}</Text>,
        Cell: ({ cell }: { cell: any }) => <Text className={classes.tablecellText}>{cell.getValue()}</Text>,
      })),
    ];
  }, [dataList, selectedIds]);

  useEffect(() => {
    setSelectedIds(selectedRow);
  }, [selectedRow]);

  return (
    <>
      <div className={classes.tableContainer}>
        <Flex direction={"column"} gap={theme.other.spacing.s12}>
          <TableHeader title={"Upload History"} paragraph={"A table with records of all previous uploads"} />
          <ErmTable
            columns={colArr}
            data={dataList}
            density='xs'
            otherTableConfigurations={{
              mantineTableContainerProps: {
                sx: {
                  height: "300px",
                },
              },
            }}
          />
        </Flex>
      </div>
    </>
  );
};
