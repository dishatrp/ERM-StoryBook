import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, MRT_TableOptions } from "mantine-react-table";
import { renderTableTopHeader } from "./TableConfigurations";
import { defaultTableOptions } from "./TableConfigurations";

type MantineTable = {
  columns: MRT_ColumnDef<any>[];
  data: any;
  otherTableConfigurations?: MRT_TableOptions<any>;
};

const MantineTable = ({ columns, data, otherTableConfigurations }: MantineTable) => {
  const table = useMantineReactTable({
    columns,
    data,
    ...(defaultTableOptions as object),
    ...renderTableTopHeader(columns),
    ...otherTableConfigurations,
  });

  return <MantineReactTable table={table} />;
};

export default MantineTable;
