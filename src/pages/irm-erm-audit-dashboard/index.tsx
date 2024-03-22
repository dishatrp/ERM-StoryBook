import React, { useEffect, useMemo, useState } from "react";
import Loader from "@/components/Loader";
import ErmTable from "@/components/erm/ermTable/ErmTable";
import PageTitle from "@/components/erm/genericComponents/PageTitle";
import { useGetAuditItemsQuery } from "@/store/api/ermNewApiSlice";
import { Flex, Paper, Text, createStyles } from "@mantine/core";
import { SimpleGrid, useMantineTheme } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
} from "mantine-react-table";

const useStyle = createStyles((theme) => {
  return {
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

const ERMAuditDashboard = () => {
  const theme = useMantineTheme();
  const { classes } = useStyle();
  const { data, isLoading } = useGetAuditItemsQuery();
  const [audits, setAudits] = useState<any[]>([]);
  console.log("dhsh", data?.data);

  useEffect(() => {
    if (data) {
      setAudits(data?.data);
    }
  }, [data]);

  const colArr: MRT_ColumnDef<any>[] = useMemo<MRT_ColumnDef<any>[]>(() => {
    return Object.keys(audits?.[0] || {})?.map((item: any) => {
      return {
        minSize: 200,
        accessorKey: item,
        header: item,
        Header: (
          <Text className={classes.tableHeaderText}>{item.toUpperCase().replace("_ID", "").replaceAll("_", " ")}</Text>
        ),
        // minSize: fetchedRisks?.[idx]?.[item]?.length > 50 ? 500 : 200,
        Cell: ({ cell }: { cell: any }) => {
          return <Text className={classes.tablecellText}>{cell?.getValue()}</Text>;
        },
      };
    });
  }, [audits, classes.tableHeaderText, classes.tablecellText]);

  return (
    <>
      <Loader visible={isLoading} />
      <Flex direction={"column"} gap={"s10"} m={"s12"}>
        <PageTitle title='Audit Dashboard' description='Naviagte important KPIs of audit workflow' />

        <SimpleGrid cols={1} spacing={theme.other.spacing.s8}>
          <Paper bg={"none"} maw={"100%"}>
            <ErmTable
              columns={colArr}
              data={audits}
              density='xs'
              otherTableConfigurations={{
                // enableTopToolbar: false,
                enableBottomToolbar: true,
                mantineTableContainerProps: {
                  sx: {
                    height: "500px",
                    margin: "0 12px",
                  },
                },
              }}
            />
          </Paper>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default ERMAuditDashboard;
