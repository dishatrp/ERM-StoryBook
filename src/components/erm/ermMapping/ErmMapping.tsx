import { MRT_ColumnDef, MRT_Row, MRT_TableOptions } from "mantine-react-table";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setParsedData } from "@/store/slice/ermNewSlice";
import { ActionIcon, Paper, Text, Tooltip, createStyles, rem, useMantineTheme } from "@mantine/core";
import { Flex } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { ModalsProvider, modals } from "@mantine/modals";
import ErmTable from "../ermTable/ErmTable";
import { SimpleGrid } from "@mantine/core";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";

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

const ErmMapping = () => {
  const dispatch = useAppDispatch();
  const { parsedData } = useAppSelector((state) => state.ermNew);
  const theme = useMantineTheme();

  const { classes } = useStyles();

  const handleCreateUser: MRT_TableOptions<any>["onCreatingRowSave"] = async ({ values, exitCreatingMode }) => {
    dispatch(setParsedData({ data: [values, ...parsedData], type: "RESET" }));
    exitCreatingMode();
  };

  const handleSaveRow: MRT_TableOptions<any>["onEditingRowSave"] = ({ exitEditingMode, row, values }) => {
    let data = JSON.parse(JSON.stringify(parsedData));
    data[row.index] = values;
    dispatch(setParsedData({ data: [...data], type: "RESET" }));
    exitEditingMode();
  };

  const colArr: MRT_ColumnDef<any>[] = Object.keys(parsedData?.[0] || {})?.map((item: any, idx: number, arr) => {
    // console.log("cols", item);
    return {
      accessorKey: item,
      header: item,
      Header: (
        <Text className={classes.tableHeaderText}>
          {item
            .toLowerCase()
            .split("_")
            .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")}
        </Text>
      ),
      minSize: parsedData?.[idx]?.[item]?.length > 50 ? 500 : 200,
      Cell: ({ cell }: { cell: any }) => {
        return <Text className={classes.tablecellText}>{cell?.getValue()}</Text>;
      },
      mantineTableBodyCellProps: ({ cell }) => ({
        onClick: () => {
          console.log(cell.getValue(), cell.id);
        },
      }),
    };
  });

  const alphabatesValidation = (value: string) => /^[aA-zZ\s]+$/.test(value);

  const validation = () => {
    const fieldNames: any[] = parsedData.length > 0 ? Object.keys(parsedData?.[0]) : [];
    fieldNames.map((el) => {
      return {
        [el]: !alphabatesValidation ? `Only Alphbates are allowed` : "",
      };
    });
  };

  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Confirm your action",
      children: <Text>Are you sure you want to delete ? This action cannot be undone.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        let data = JSON.parse(JSON.stringify(parsedData));
        dispatch(
          setParsedData({
            data: data.filter((item: any, i: number) => {
              return i !== row.index;
            }),
            type: "RESET",
          })
        );
      },
      zIndex: 9999,
      centered: true,
    });

  return (
    <Flex justify={"center"} align={"center"}>
      <SimpleGrid cols={1} spacing={theme.other.spacing.s8}>
        <ModalsProvider>
          <ErmTable
            columns={colArr}
            data={parsedData}
            otherTableConfigurations={{
              enableEditing: true,
              createDisplayMode: "row",
              editDisplayMode: "row",
              onCreatingRowSave: handleCreateUser,
              onEditingRowSave: handleSaveRow,
              displayColumnDefOptions: {
                "mrt-row-actions": {
                  header: "Actions",
                  size: 96,
                  mantineTableHeadCellProps: {
                    sx: {
                      fontFamily: "latoRegular !important",
                      fontSize: `${rem(14)}!important`,
                      fontStyle: "normal  !important",
                      // lineHeight: "18px  !important",
                      color: "#767676 !important",
                    },
                  },
                },
              },
              renderRowActions: ({ row, table }) => (
                <Flex gap='md'>
                  <Tooltip label='Edit'>
                    <ActionIcon onClick={() => table.setEditingRow(row)}>
                      <IconEdit color={theme.colors.gray[5]} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label='Delete'>
                    <ActionIcon onClick={() => openDeleteConfirmModal(row)}>
                      <IconTrash color={theme.colors.red[5]} />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              ),
              mantineTableContainerProps: { sx: { maxHeight: rem(400) } },
              // mantinePaperProps: {
              //   sx: { maxHeight: rem(400), background: "blue", width: "400px", border: "10px dashed red" },
              // },
            }}
            header={(table) => {
              return (
                <>
                  <Tooltip label={"Add New Row"}>
                    <div>
                      <MantineBtn
                        onClick={() => {
                          table.setCreatingRow(true);
                        }}
                        variant='primary'
                        size='sm'
                        leftIcon={<IconPlus />}
                      >
                        Add Row
                      </MantineBtn>
                    </div>
                  </Tooltip>
                </>
              );
            }}
          />
        </ModalsProvider>
      </SimpleGrid>
    </Flex>
  );
};

export default ErmMapping;
