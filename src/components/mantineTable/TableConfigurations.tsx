import { Box, Button, Flex, Menu, Paper, rem } from "@mantine/core";
import { IconFileTypeCsv, IconFileTypePdf } from "@tabler/icons-react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { ReactNode, useMemo } from "react";

export const defaultTableOptions = {
  layoutMode: "grid",
  initialState: {
    density: "md",
  },
  selectAllMode: "all",
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
  renderColumnFilterModeMenuItems: (props: any) => {
    // console.log('PPP', props);
    // return props.internalFilterOptions;
  },
  mantineTableHeadCellProps: () => ({
    sx: {
      flex: "0 0 auto",
    },
  }),
  mantineTableBodyCellProps: () => ({
    sx: {
      flex: "0 0 auto",
      // padding: '1rem',
    },
  }),
  mantineTableBodyProps: () => ({
    sx: {
      // padding: "1rem",
      // border: "5px solid black",
    },
  }),
  mantineTableProps: () => {
    return {
      sx: {
        //  padding: '1rem'
        // border: "25px solid red",
      },
    };
  },
  mantineTableContainerProps: () => {
    return {
      sx: {
        //  padding: '1rem'
      },
    };
  },

  // mantineTopToolbarProps: () => {
  //   return {
  //     sx: {},
  //   };
  // },
  // enableGrouping: true,
  // initialState: { showColumnFilters: true, showGlobalFilter: true },
  // mantineTableBodyRowProps: ({ row }: { row: any }) => ({
  //   onClick: (event: any) => {
  //     console.info(event, row.original.user_ID);
  //   },
  //   sx: {
  //     cursor: "pointer", //you might want to change the cursor too when adding an onClick
  //   },
  // }),
  state: {
    // isLoading: true,
  },
};

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

export const renderTableTopHeader = (columns: MRT_ColumnDef<any>[], children?: ReactNode) => {
  return {
    renderTopToolbarCustomActions: ({ table }: { table: any }) => {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              padding: "8px",
              flexWrap: "wrap",
              overflowY: "auto",
              justifyContent: "center",
            }}
          >
            <Menu shadow='md' width={200} trigger='hover' openDelay={100} closeDelay={100} position='bottom-start'>
              <Menu.Target>
                <Button disabled={table.getPrePaginationRowModel().rows.length === 0} variant='light'>
                  Export Table
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Export in pdf</Menu.Label>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "PDF")}
                  color='#228BE6'
                >
                  Include all rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getRowModel().rows, columns, "PDF")}
                  color='#228BE6'
                >
                  Include current page rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypePdf />}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "PDF")}
                  color='#228BE6'
                >
                  Include selected rows
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Export in csv</Menu.Label>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows, columns, "CSV")}
                  color='#228BE6'
                >
                  Include all rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getRowModel().rows, columns, "CSV")}
                  color='#228BE6'
                >
                  Include current page rows
                </Menu.Item>
                <Menu.Item
                  icon={<IconFileTypeCsv />}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows, columns, "CSV")}
                  color='#228BE6'
                >
                  Include selected rows
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {children}
          </Box>
        </>
      );
    },
  };
};

export const useContructColumn = (colArr: MRT_ColumnDef<any>[]) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => colArr, [colArr]);
  return columns;
};
