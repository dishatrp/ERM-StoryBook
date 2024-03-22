import { Text } from "@mantine/core";
import React from "react";
import { flags, legendPositions } from "./helpers";
import { LegendsAndAxisNames } from "./interface";

const Legends = ({ classes, row, col }: LegendsAndAxisNames) => {
  return (
    <>
      {legendPositions?.xAxis?.includes(`${row}${col}`) && (
        <Text color='dimmed' fw={500} className={classes.xAxisLegends}>
          {flags[col - 1]}
        </Text>
      )}
      {legendPositions.yAxis.includes(`${row}${col}`) && (
        <Text color='dimmed' fw={500} className={classes.yAxisLegends}>
          {[...flags].reverse()[row - 1]}
        </Text>
      )}
    </>
  );
};

export default Legends;
