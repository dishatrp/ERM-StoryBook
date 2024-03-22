import { Flex, Paper, Text, createStyles, useMantineTheme } from "@mantine/core";
import React, { useMemo } from "react";
import ErmTable from "../../ermTable/ErmTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { INCLUDED_COLS } from "./SelectRiskTable";
import { SimpleGrid } from "@mantine/core";
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

const AssessTable = ({ accessData }: { accessData: any[] }) => {
  const { classes } = useStyle();
  const theme = useMantineTheme();

  const colArr: MRT_ColumnDef<any>[] = useMemo<MRT_ColumnDef<any>[]>(() => {
    return Object.keys(accessData?.[0] || {})
      ?.filter((item: string) => {
        return INCLUDED_COLS.includes(item);
      })
      ?.map((item: any) => {
        return {
          minSize: 200,
          accessorKey: item,
          header: item,
          Header: (
            <Text className={classes.tableHeaderText}>
              {item.toUpperCase().replace("_ID", "").replaceAll("_", " ")}
            </Text>
          ),
          // minSize: fetchedRisks?.[idx]?.[item]?.length > 50 ? 500 : 200,
          Cell: ({ cell }: { cell: any }) => {
            return <Text className={classes.tablecellText}>{cell?.getValue()}</Text>;
          },
        };
      });
  }, [accessData]);

  return (
    <>
      <div className={classes.tableContainer}>
        <Flex direction={"column"} gap={theme.other.spacing.s12}>
          <div>
            <Text className={`${classes.tableTitle} bodyB3`}>Upload History</Text>
            <Text className={`${classes.tableDescription} labelL3`}>A table with records of all previous uploads</Text>
          </div>
          <SimpleGrid cols={1} spacing={theme.other.spacing.s8}>
            <Paper bg={"none"} maw={"100%"}>
              <ErmTable
                columnOrder={INCLUDED_COLS}
                columns={colArr}
                data={accessData}
                density='xs'
                otherTableConfigurations={{
                  mantineTableContainerProps: {
                    sx: {
                      height: "300px",
                    },
                  },
                }}
              />
            </Paper>
          </SimpleGrid>
        </Flex>
      </div>
    </>
  );
};

export default AssessTable;
