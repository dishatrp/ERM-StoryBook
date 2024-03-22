import Loader from "@/components/Loader";
import PageTitle from "@/components/erm/genericComponents/PageTitle";
import { useContructColumn } from "@/components/mantineTable/TableConfigurations";
import { useFetchEditedDataMutation, useFetchTableDataQuery } from "@/store/api/ermAudit";
import { AuditItem } from "@/store/interface/ermAuditInterface";
import { useAppDispatch } from "@/store/store";
import { Container, Flex, Paper, Text, Tooltip, createStyles, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  tableHeader: {
    ...theme.other.typographyScales.labelL1,
    color: theme.colors.black["4"],
  },
}));

const Upload = () => {
  const { data, isLoading } = useFetchTableDataQuery();
  const router = useRouter();
  const [tableData, setTableData] = useState<any[]>([]);
  const [shapedData, setShapedData] = useState<AuditItem[] | []>([]);
  const [fetchEditedData, { isLoading: fetchDataLoading }] = useFetchEditedDataMutation();

  useEffect(() => {
    if (data) {
      setShapedData(data);
    }

    setTableData(
      data?.map((item) => {
        return Object.entries(item).reduce((acc: any, [key, value]) => {
          if (!key.endsWith("_ID")) {
            acc[key] = value !== null ? value : "Not available";
            // acc[key] = value;
          }
          return acc;
        }, {});
      }) || []
    );
  }, [data]);

  const column = Object.keys(tableData?.[0] || []).map((el) => {
    const words = el.split("_");
    const outputString = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    return {
      accessorKey: el,
      header: outputString,
    };
  });

  const columns = useContructColumn(column);

  const theme = useMantineTheme();

  return (
    <div>
      <PageTitle
        title={"Audit Dashboard"}
        description='An interactive platform providing comprehensive oversight and analysis of audit processes and compliance metrics'
      />
      {tableData && tableData?.length > 0 ? (
        <Paper mt={"lg"}>
          <Container size={"xl"}>
            {/* <MantineTable
              columns={column}
              data={tableData}
              otherTableConfigurations={{
                layoutMode: "semantic",
                enableTopToolbar: false,
                enableEditing: true,
                editDisplayMode: "row",
                // onEditingRowSave: handleSaveRow,
                renderRowActions: ({ row, table }: { row: MRT_Row<any>; table: MRT_TableInstance<any> }) => {
                  return (
                    <Flex gap='md'>
                      <Tooltip label='Edit'>
                        <ActionIcon
                          onClick={async () => {
                            try {
                              const item: any = shapedData[row.index];
                              const data = {
                                ITEM_ID: item?.ITEM_ID,
                                PLAN_ID: item?.PLAN_ID,
                                AUDIT_ID: item?.AUDIT_ID,
                                AUDITEXE_ID: item?.AUDITEXE_ID,
                                FOLLREP_ID: item?.FOLLREP_ID,
                                AUDITREPORT_ID: item?.AUDITREPORT_ID,
                                PREP_ID: item?.PREP_ID,
                              };
                              const getPhaseData = await fetchEditedData(data).unwrap();
                              if (getPhaseData) {
                                dispatch(setAuditData(getPhaseData.data.items));
                                router.push("/irm-erm-phases");
                              }

                              return data;
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <IconEdit />
                        </ActionIcon>
                      </Tooltip>
                    </Flex>
                  );
                },
              }}
            /> */}
          </Container>
        </Paper>
      ) : (
        <></>
      )}
      <Loader visible={isLoading || fetchDataLoading} />
    </div>
  );
};

export default Upload;

{
  /* <MantineReactTable
  columns={columns}
  data={tableData}
  mantinePaperProps={{
    shadow: "none",
    sx: {
      borderRadius: `${theme.spacing["s16"]}`,
      border: `1px solid ${theme.colors.gray["4"]}`,
    },
  }}
/>; */
}

{
  //    <MantineTable
  //   columns={column}
  //   data={tableData}
  //   otherTableConfigurations={{
  //     layoutMode: "semantic",
  //     enableTopToolbar: false,
  //     enableEditing: true,
  //     editDisplayMode: "row",
  //     // onEditingRowSave: handleSaveRow,
  //     renderRowActions: ({ row, table }: { row: MRT_Row<any>; table: MRT_TableInstance<any> }) => {
  //       return (
  //         <Flex gap='md'>
  //           <Tooltip label='Edit'>
  //             <ActionIcon
  //               onClick={async () => {
  //                 try {
  //                   const item: any = shapedData[row.index];
  //                   const data = {
  //                     ITEM_ID: item?.ITEM_ID,
  //                     PLAN_ID: item?.PLAN_ID,
  //                     AUDIT_ID: item?.AUDIT_ID,
  //                     AUDITEXE_ID: item?.AUDITEXE_ID,
  //                     FOLLREP_ID: item?.FOLLREP_ID,
  //                     AUDITREPORT_ID: item?.AUDITREPORT_ID,
  //                     PREP_ID: item?.PREP_ID,
  //                   };
  //                   const getPhaseData = await fetchEditedData(data).unwrap();
  //                   if (getPhaseData) {
  //                     dispatch(setAuditData(getPhaseData.data.items));
  //                     router.push("/irm-erm-phases");
  //                   }
  //                   return data;
  //                 } catch (error) {
  //                   console.log(error);
  //                 }
  //               }}
  //             >
  //               <IconEdit />
  //             </ActionIcon>
  //           </Tooltip>
  //         </Flex>
  //       );
  //     },
  //   }}
  // />;
}
