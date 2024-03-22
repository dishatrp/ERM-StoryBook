import { MantineSize, MantineThemeOverride, Tuple, rem } from "@mantine/core";

type ExtendedCustomSizes =
  | "s10"
  | "s2"
  | "s4"
  | "s6"
  | "s8"
  | "s12"
  | "s16"
  | "s20"
  | "s12"
  | "s16"
  | "s20"
  | "s24"
  | "s32"
  | "s40"
  | "s48"
  | "s56"
  | "s64"
  | "s72"
  | "s80"
  | "s96";

interface fonts {
  fontSize: string;
  //lineHeight: string;
  fontFamily: string;
  fontStyle: string;
}

interface CustomTypographyScales {
  headingH1: fonts;
  headingH2: fonts;
  bodyB1: fonts;
  bodyB2: fonts;
  bodyB3: fonts;
  bodyB4: fonts;
  labelL1: fonts;
  labelL2: fonts;
  labelL3: fonts;
  // Add more scales as needed
}

declare module "@mantine/core" {
  export interface MantineThemeOther {
    spacing: Record<ExtendedCustomSizes, string>;
    typographyScales: CustomTypographyScales;
  }
}

export const theme: MantineThemeOverride = {
  colors: {
    black: [
      "#e2e2e2",
      "#c6c6c6",
      "#ababab",
      "#909090",
      "#767676",
      "#5e5e5e",
      "#464646",
      "#303030",
      "#1b1b1b",
      "#080808",
    ],
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
    sea: ["#e5eaec", "#cbd5da", "#b2c0c8", "#99acb6", "#8198a4", "#698493", "#527181", "#3b5f71", "#234d60", "#053b50"],
    waterfall: [
      "#eef9f6",
      "#dcf2ec",
      "#caebe3",
      "#b8e5da",
      "#a6ded1",
      "#93d7c8",
      "#7fd1bf",
      "#69cab6",
      "#50c3ad",
      "#2ebca4",
    ],
    red: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
    sun: ["#fffcf1", "#fffae4", "#fff7d6", "#fff4c7", "#fff2b9", "#ffefaa", "#ffec9a", "#ffe889", "#ffe577", "#ffe263"],
    spring: [
      "#f0fbf0",
      "#e0f6e1",
      "#d0f2d2",
      "#c0edc3",
      "#b0e8b4",
      "#9fe4a5",
      "#8edf96",
      "#7cda86",
      "#68d477",
      "#51cf66",
    ],
  },
  primaryColor: "waterfall",
  // margin , padding and border radius
  spacing: {
    s2: "2px",
    s4: "4px",
    s6: "6px",
    s8: "8px",
    s10: "10px",
    s12: "12px",
    s16: "16px",
    s20: "20px",
    s24: "24px",
    s32: "32px",
    s40: "40px",
    s48: "48px",
    s56: "56px",
    s64: "64px",
    s72: "72px",
    s80: "80px",
    s96: "96px",
  },
  other: {
    spacing: {
      s2: "2px",
      s4: "4px",
      s6: "6px",
      s8: "8px",
      s10: "10px",
      s12: "12px",
      s16: "16px",
      s20: "20px",
      s24: "24px",
      s32: "32px",
      s40: "40px",
      s48: "48px",
      s56: "56px",
      s64: "64px",
      s72: "72px",
      s80: "80px",
      s96: "96px",
    },
    typographyScales: {
      headingH1: {
        fontFamily: "interDisplayBold",
        fontSize: rem(32),
        //lineHeight: "36px",
        fontStyle: "normal",
      },
      headingH2: {
        fontFamily: "interDisplaySemiBold",
        fontSize: rem(24),
        fontStyle: "normal",
        //lineHeight: "27px",
      },
      bodyB1: {
        fontFamily: "latoSemiBold",
        fontSize: rem(24),
        //lineHeight: "27px",
        fontStyle: "normal",
      },
      bodyB2: {
        fontFamily: "latoRegular",
        fontSize: rem(24),
        //lineHeight: "27px",
        fontStyle: "normal",
      },
      bodyB3: {
        fontFamily: "latoSemiBold",
        fontSize: rem(18),
        //lineHeight: "27px",
        fontStyle: "normal",
      },
      bodyB4: {
        fontFamily: "latoRegular",
        fontSize: rem(18),
        //lineHeight: "27px",
        fontStyle: "normal",
      },
      labelL1: {
        fontFamily: "latoBold",
        fontSize: rem(14),
        fontStyle: "normal",
        //lineHeight: "18px",
      },
      labelL2: {
        fontFamily: "latoRegular",
        fontSize: rem(14),
        fontStyle: "normal",
        //lineHeight: "18px",
      },
      labelL3: {
        fontFamily: "latoSemiBold",
        fontSize: rem(12),
        fontStyle: "normal",
        //lineHeight: "18px",
      },
    },
  },

  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    body: {
      backgroundColor: theme.colors.gray[0],
      ...theme.fn.fontStyles(),
      // background: "red",
    },

    headings: {},

    ".headingH1": {
      fontFamily: "interDisplayBold",
      fontSize: rem(32),
      //lineHeight: "36px",
      fontStyle: "normal",
    },
    ".headingH2": {
      fontFamily: "interDisplaySemiBold",
      fontSize: rem(24),
      fontStyle: "normal",
      //lineHeight: "27px",
    },
    ".bodyB1": {
      fontFamily: "latoSemiBold",
      fontSize: rem(24),
      //lineHeight: "27px",
      fontStyle: "normal",
    },
    ".bodyB2": {
      fontFamily: "latoRegular",
      fontSize: rem(24),
      //lineHeight: "27px",
      fontStyle: "normal",
    },
    ".bodyB3": {
      fontFamily: "latoSemiBold",
      fontSize: rem(18),
      //lineHeight: "27px",
      fontStyle: "normal",
    },
    ".bodyB4": {
      fontFamily: "latoRegular",
      fontSize: rem(18),
      //lineHeight: "27px",
      fontStyle: "normal",
    },
    ".labelL1": {
      fontFamily: "latoBold",
      fontSize: rem(14),
      fontStyle: "normal",
      //lineHeight: "18px",
    },
    ".labelL2": {
      fontFamily: "latoRegular",
      fontSize: rem(14),
      fontStyle: "normal",
      //lineHeight: "18px",
    },
    ".labelL3": {
      fontFamily: "latoSemiBold",
      fontSize: rem(12),
      fontStyle: "normal",
      //lineHeight: "18px",
    },
  }),
};
