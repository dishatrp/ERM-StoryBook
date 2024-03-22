import { Flex, Paper, Text, rem, useMantineTheme } from "@mantine/core";
import { findColor } from "./helpers";
import { createHeatMapStyles } from "./HeatMapStyles";
import AxisNames from "./AxisNames";
import Legends from "./Legends";

interface HeatMap {
  title: string;
  desc: string;
}
const HeatMap = ({ title, desc }: HeatMap) => {
  const theme = useMantineTheme();
  const { classes } = createHeatMapStyles()();

  let col = 0,
    row = 6;

  return (
    <Paper mb={"s4"} p={rem(60)} bg={"none"}>
      <>
        <Flex direction={"column"} gap={"s2"}>
          <Text className='bodyB2' color={theme.colors.black[7]}>
            {title}
          </Text>
          <Text className='labelL3' color={theme.colors.black[4]}>
            {desc}
          </Text>
        </Flex>
      </>
      <Flex justify={"center"} align={"center"} p={"xl"}>
        <div className={classes.main_container}>
          {Array.from({ length: 25 })?.map((_, idx, arr) => {
            // console.log("kkkk", idx);

            if ((25 - idx) % 5 === 0) {
              col = 0;
              row--;
            }
            col++;
            console.log(col, row);
            return (
              <Flex key={idx} className={classes.blocks} bg={findColor(row * col)} justify={"center"} align={"center"}>
                <Text color='white' fz={"xs"} fw={500}>
                  {row * col}
                </Text>
                <Legends row={row} col={col} classes={classes} />
                <AxisNames row={row} col={col} classes={classes} />
              </Flex>
            );
          })}
        </div>
      </Flex>
    </Paper>
  );
};

export default HeatMap;
