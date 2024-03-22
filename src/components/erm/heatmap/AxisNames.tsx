import { Text } from "@mantine/core";
import React from "react";
import { LegendsAndAxisNames } from "./interface";


const AxisNames = ({ classes, row, col }: LegendsAndAxisNames) => {
  return (
    <>
      {`${row}${col}` === "31" && (
        <Text color='red' fw={500} className={classes.yAxisName}>
          Likelihood
        </Text>
      )}
      {`${row}${col}` === "13" && (
        <Text color='red' fw={500} className={classes.xAxisName}>
          Impact
        </Text>
      )}
    </>
  );
};

export default AxisNames;
