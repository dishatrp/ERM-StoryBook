import { ScrollArea, Table, createStyles, rem } from "@mantine/core";
import { useState } from "react";

export const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",
    zIndex: 9,

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface MantineBasicTable {
  scrollArea?: boolean;
  columns: any;
  rows: any;
  tableConfig?: {
    striped?: boolean;
    highlightOnHover?: boolean;
    withBorder?: boolean;
    withColumnBorders?: boolean;
    scrollH?: string | number;
    scrollW?: string | number | undefined;
    scrollHideDelay?: number;
    scrollbarSize?: number;
  };
}

const MantineBasicTable = ({ scrollArea = true, columns, rows, tableConfig }: MantineBasicTable) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const defaultTableConfig = {
    striped: false,
    withBorder: false,
    withColumnBorders: false,
    highlightOnHover: true,
    scrollH: 300,
    scrollHideDelay: 2,
    scrollbarSize: 5,
    ...tableConfig,
  };

  if (scrollArea) {
    return (
      <ScrollArea
        h={defaultTableConfig?.scrollH}
        // w={defaultTableConfig?.scrollW}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        scrollHideDelay={defaultTableConfig?.scrollHideDelay}
        scrollbarSize={defaultTableConfig?.scrollbarSize}
      >
        <Table
          striped={defaultTableConfig?.striped}
          highlightOnHover={defaultTableConfig?.highlightOnHover}
          withBorder={defaultTableConfig?.withBorder}
          withColumnBorders={defaultTableConfig?.withColumnBorders}
        >
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>{columns}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  }

  return (
    <Table
      striped={defaultTableConfig?.striped}
      highlightOnHover={defaultTableConfig?.highlightOnHover}
      withBorder={defaultTableConfig?.withBorder}
      withColumnBorders={defaultTableConfig?.withColumnBorders}
    >
      <thead>{columns}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default MantineBasicTable;
