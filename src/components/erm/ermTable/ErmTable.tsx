import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
  MRT_Row,
  MRT_DensityState,
  MRT_ColumnOrderState,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_TableInstance,
} from "mantine-react-table";
import { Container, Flex, MantineTheme, Paper, rem, useMantineTheme } from "@mantine/core";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { ReactNode, useMemo } from "react";
import { Box } from "@mantine/core";
import { Menu } from "@mantine/core";
import { IconFileArrowRight, IconFileTypeCsv, IconFileTypePdf } from "@tabler/icons-react";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";
import { Text } from "@mantine/core";

type MantineTable = {
  columns: MRT_ColumnDef<any>[];
  data: any[];
  otherTableConfigurations?: Partial<MRT_TableOptions<any>>;
  header?: (table: MRT_TableInstance<any>) => ReactNode;
  density?: MRT_DensityState | undefined;
  columnOrder?: MRT_ColumnOrderState | undefined;
};

const itemStyles = (theme: MantineTheme) => {
  return {
    color: theme.colors.gray[6],
  };
};
const checkboxStyles = (theme: MantineTheme) => ({
  input: {
    transition: "all 0.5s ease-out",
    cursor: "pointer",
    "&:checked": {
      transition: "all 0.5s ease-out",
      backgroundColor: theme.colors.waterfall[1],
      border: `1px solid ${theme.colors.waterfall[5]}`,
      "& + svg > path": {
        transition: "all 0.5s ease-out",
        fill: theme.colors.waterfall[5],
        strokeWidth: 5,
      },
    },
    "&:not(:checked)": {
      transition: "all 0.5s ease-out",
      backgroundColor: theme.colors.black[0],
      border: `1px solid ${theme.colors.black[1]}`,
    },
  },
});
export const handleExportRows = (rows: MRT_Row<any>[], columns: any, flag: "PDF" | "CSV") => {
  if (flag === "PDF") {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original).map((cell) => cell));
    const tableHeaders = columns.map((c: any) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData as RowInput[],
    });

    doc.save("mrt-pdf-example.pdf");
    return;
  }
  if (flag === "CSV") {
    const csvConfig = mkConfig({
      fieldSeparator: ",",
      decimalSeparator: ".",
      useKeysAsHeaders: true,
    });
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  }
};

const renderTableTopHeader = (columns: MRT_ColumnDef<any>[], children?: ReactNode, createBtn: boolean = false) => {
  const itemStyles = (theme: MantineTheme) => {
    return {
      color: theme.colors.gray[6],
    };
  };

  return {
    renderTopToolbarCustomActions: ({ table }: { table: any }) => {
      return (
        <>
          <Box
            sx={(theme) => {
              return {
                display: "flex",
                gap: theme.other.spacing.s16,
                padding: theme.other.spacing.s8,
                flexWrap: "wrap",
                overflowY: "auto",
                justifyContent: "center",
              };
            }}
          >
            <Menu shadow='md' width={200} trigger='hover' openDelay={100} closeDelay={100}>
              <Menu.Target>
                <Container p={0} m={0}>
                  <MantineBtn
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    size='sm'
                    // variant='secondary'
                  >
                    Export Table
                  </MantineBtn>
                </Container>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Export in pdf</Menu.Label>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "PDF")}
                  sx={itemStyles}
                >
                  Include all rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getRowModel().rows, columns, "PDF")}
                  sx={itemStyles}
                >
                  Include current page rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "PDF")}
                  sx={itemStyles}
                >
                  Include selected rows
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Export in csv</Menu.Label>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "CSV")}
                  sx={itemStyles}
                >
                  Include all rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getRowModel().rows, columns, "CSV")}
                  sx={itemStyles}
                >
                  Include current page rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "CSV")}
                  sx={itemStyles}
                >
                  Include selected rows
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {createBtn && (
              <Container p={0} m={0}>
                <MantineBtn
                  onClick={() => {
                    table.setCreatingRow(true);
                  }}
                  variant='primary'
                  size='sm'
                >
                  Create New Entry
                </MantineBtn>
              </Container>
            )}
            {children}
          </Box>
        </>
      );
    },
  };
};

const ErmTable = ({ columns, data, otherTableConfigurations, header, density = "md", columnOrder }: MantineTable) => {
  const theme = useMantineTheme();
  const table = useMantineReactTable({
    columns: useMemo<MRT_ColumnDef<any>[]>(() => columns, [columns]),
    data,
    layoutMode: "semantic",
    initialState: {
      density,
      columnOrder,
    },
    enableColumnResizing: true,
    enableStickyHeader: true,
    enableFacetedValues: true,
    enableFullScreenToggle: true,
    enableTableHead: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enablePinning: true,
    renderColumnActionsMenuItems: ({ internalColumnMenuItems }: { internalColumnMenuItems: any }) => (
      <Paper style={{ maxHeight: rem(300), overflow: "auto" }}>{internalColumnMenuItems}</Paper>
    ),
    mantineTableHeadCellProps: () => ({
      sx: {
        flex: "0 0 auto",
      },
    }),
    mantineTableBodyCellProps: () => ({
      sx: {
        flex: "0 0 auto",
      },
    }),
    // ...renderTableTopHeader(columns, header, createBtn),
    ...otherTableConfigurations,
    mantinePaperProps: ({ table }) => {
      return {
        shadow: "none",
        withBorder: false,
        radius: "16px",
        sx: (theme) => {
          return {
            width: "100%",
            maxWidth: "100%",
            border: `1px solid ${theme.colors.gray["4"]}`,
            height: "100%",
          };
        },
      };
    },
    mantineTableHeadProps: (props) => {
      return {
        sx: {
          boxShadow: "none",
        },
      };
    },
    mantineTableHeadRowProps: (props) => {
      return {
        sx: {
          boxShadow: "none",
        },
      };
    },
    // positionGlobalFilter: "left",
    // positionToolbarAlertBanner: "bottom",
    renderToolbarInternalActions: ({ table }) => (
      <Flex align={"center"} gap={"s16"}>
        <Flex gap={"s4"} align={"center"} justify={"center"}>
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ToggleFullScreenButton table={table} />
        </Flex>
        <Paper bg={"none"}>
          <Menu shadow='md' width={200} trigger='hover' openDelay={100} closeDelay={100}>
            <Menu.Target>
              <div>
                <MantineBtn
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  size='sm'
                  variant='secondary'
                  leftIcon={<IconFileArrowRight />}
                >
                  Export Table
                </MantineBtn>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Export in pdf</Menu.Label>
              <Menu.Item
                icon={<IconFileTypePdf />}
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "PDF")}
                sx={itemStyles}
              >
                Include all rows
              </Menu.Item>
              <Menu.Item
                icon={<IconFileTypePdf />}
                disabled={table.getRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getRowModel().rows, columns, "PDF")}
                sx={itemStyles}
              >
                Include current page rows
              </Menu.Item>
              <Menu.Item
                icon={<IconFileTypePdf />}
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "PDF")}
                sx={itemStyles}
              >
                Include selected rows
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Export in csv</Menu.Label>
              <Menu.Item
                icon={<IconFileTypeCsv />}
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "CSV")}
                sx={itemStyles}
              >
                Include all rows
              </Menu.Item>
              <Menu.Item
                icon={<IconFileTypeCsv />}
                disabled={table.getRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getRowModel().rows, columns, "CSV")}
                sx={itemStyles}
              >
                Include current page rows
              </Menu.Item>
              <Menu.Item
                icon={<IconFileTypeCsv />}
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "CSV")}
                sx={itemStyles}
              >
                Include selected rows
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Paper>
        {header && header(table)}
      </Flex>
    ),
    // enableClickToCopy: true,
    mantineSelectCheckboxProps: {
      sx: checkboxStyles(theme),
    },
    mantineSelectAllCheckboxProps: {
      sx: checkboxStyles(theme),
    },
    mantineTableBodyRowProps: ({ row }) => {
      return {
        onClick: row.getToggleSelectedHandler(),
        sx: { cursor: "pointer" },
      };
    },
    positionToolbarAlertBanner: "bottom",
    mantineToolbarAlertBannerProps: (props) => {
      return {
        sx: {
          backgroundColor: theme.colors.waterfall[0],
        },
      };
    },
    enableFilterMatchHighlighting: true,
    mantineSearchTextInputProps: {
      placeholder: "Search entire table",
      // sx: { minWidth: "300px" },
      // variant: "outlined",
    },
    // enableRowOrdering: true,
    // state: {
    //   isLoading: true,
    // },
    renderEmptyRowsFallback: ({ table }) => {
      return (
        <>
          <Flex
            justify={"center"}
            align={"center"}
            p={theme.other.spacing.s12}
            sx={{
              borderRadius: theme.other.spacing.s12,
              ":hover": {
                backgroundColor: "none",
              },
            }}
          >
            <Text className='labelL2' color={theme.colors.black[2]}>
              No records to display 😔
            </Text>
          </Flex>
        </>
      );
    },
  });

  return (
    <Box sx={{ width: "100%", overflowX: "auto", margin: 0, padding: 0 }}>
      <MantineReactTable table={table} />
    </Box>
  );
};

export default ErmTable;
