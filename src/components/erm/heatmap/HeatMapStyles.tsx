import { createStyles, rem } from "@mantine/core";
import { StyleClasses, params } from "./interface";

export const createHeatMapStyles = ({
  size = "lg",
}: params = {}): (() => StyleClasses) => {
  const blockDimension = size === "sm" ? 60 : 80;

  // Block gap
  const INITIAL_REDUCED_GAP = blockDimension / 15;
  const REDUCED_GAP_PRIMARY = blockDimension / 20;
  const REDUCED_GAP_SECONDARY = blockDimension / 30;

  // Blocks
  const INITIAL_BLOCK_DIMENSION = rem(blockDimension);
  const REDUCED_BLOCK_DIMENSION_PRIMARY = rem(blockDimension / 1.2);
  const REDUCED_BLOCK_DIMENSION_SECONDARY = rem(blockDimension / 1.5);
  const REDUCED_BLOCK_DIMENSION_TERTIARY = rem(blockDimension / 1.8);

  // Legends
  const INITIAL_FONT_SIZE_PRIMARY = rem(blockDimension / 6);
  const REDUCED_FONT_SIZE_SECONDARY = rem(blockDimension / 7);
  const REDUCED_FONT_SIZE_TERTIARY = rem(blockDimension / 10);

  return createStyles((theme) => ({
    main_container: {
      display: "grid",
      gridTemplateColumns: `repeat(5, minmax(${rem(
        INITIAL_BLOCK_DIMENSION
      )}, 1fr))`,
      gridTemplateRows: `repeat(5, minmax(${rem(
        INITIAL_BLOCK_DIMENSION
      )}, 1fr))`,
      gap: rem(5),
      // gap: rem(INITIAL_REDUCED_GAP),
      // ["@media (max-width:590px)"]: {
      //   gap: rem(REDUCED_GAP_PRIMARY),
      // },
      // ["@media (max-width:490px)"]: {
      //   gap: rem(REDUCED_GAP_SECONDARY),
      // },
    },
    blocks: {
      position: "relative",
      // minHeight: rem(INITIAL_BLOCK_DIMENSION),
      // minWidth: rem(INITIAL_BLOCK_DIMENSION),
      borderRadius: theme.radius.sm,
      // ["@media (max-width:590px)"]: {
      //   minHeight: REDUCED_BLOCK_DIMENSION_PRIMARY,
      //   minWidth: REDUCED_BLOCK_DIMENSION_PRIMARY,
      // },
      // ["@media (max-width:490px)"]: {
      //   minHeight: REDUCED_BLOCK_DIMENSION_SECONDARY,
      //   minWidth: REDUCED_BLOCK_DIMENSION_SECONDARY,
      // },
      // ["@media (max-width:440px)"]: {
      //   minHeight: REDUCED_BLOCK_DIMENSION_TERTIARY,
      //   minWidth: REDUCED_BLOCK_DIMENSION_TERTIARY,
      // },
    },
    xAxisLegends: {
      fontSize: INITIAL_FONT_SIZE_PRIMARY,
      position: "absolute",
      bottom: "-35%",
      // ["@media (max-width:590px)"]: { fontSize: REDUCED_FONT_SIZE_SECONDARY },
      // ["@media (max-width:440px)"]: {
      //   fontSize: REDUCED_FONT_SIZE_TERTIARY,
      // },
    },
    yAxisLegends: {
      fontSize: INITIAL_FONT_SIZE_PRIMARY,
      position: "absolute",
      left: size === "lg" ? "-75%" : "-95%",
      transform: " rotate(270deg)",
      width: rem(90),
      display: "flex",
      justifyContent: "center",
      // ["@media (max-width:590px)"]: {
      //   width: rem(80),
      //   fontSize: REDUCED_FONT_SIZE_SECONDARY,
      // },
      // ["@media (max-width:490px)"]: { width: rem(50) },
      // ["@media (max-width:440px)"]: {
      //   fontSize: REDUCED_FONT_SIZE_TERTIARY,
      // },
    },
    xAxisName: {
      fontSize: INITIAL_FONT_SIZE_PRIMARY,
      position: "absolute",
      bottom: "-60%",
      // ["@media (max-width:490px)"]: {
      //   bottom: "-70%",
      //   fontSize: REDUCED_FONT_SIZE_TERTIARY,
      // },
    },
    yAxisName: {
      fontSize: INITIAL_FONT_SIZE_PRIMARY,
      position: "absolute",
      transform: " rotate(270deg)",
      left: "-80%",
      // ["@media (max-width:490px)"]: {
      //   left: "-100%",
      //   fontSize: REDUCED_FONT_SIZE_TERTIARY,
      // },
    },
  }));
};
