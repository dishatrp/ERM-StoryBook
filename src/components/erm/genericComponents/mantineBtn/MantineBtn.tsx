import { Button, MantineTheme, rem } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { ReactNode } from "react";

interface ButtonPadding {
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

interface ButtonFonts {
  fontSize: string;
  fontFamily: string;
  fontStyle: string;
}

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: (e: any) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onlyIcon?: boolean;
};

type PaddingFunction = (
  theme: MantineTheme,
  leftIcon: ReactNode,
  rightIcon: ReactNode,
  size: "lg" | "md" | "sm"
) => ButtonPadding;

type FontsFunction = (theme: MantineTheme, size: "lg" | "md" | "sm") => ButtonFonts;

const constructPadding: PaddingFunction = (theme, leftIcon, rightIcon, size) => {
  let padding: ButtonPadding = {} as ButtonPadding;

  if (size === "lg") {
    if (leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s10,
        paddingBottom: theme.other.spacing.s10,
        paddingLeft: theme.other.spacing.s10,
        paddingRight: theme.other.spacing.s12,
      };
    }
    if (rightIcon) {
      padding = {
        paddingTop: theme.other.spacing.s10,
        paddingBottom: theme.other.spacing.s10,
        paddingLeft: theme.other.spacing.s12,
        paddingRight: theme.other.spacing.s10,
      };
    }
    if (!rightIcon && !leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s10,
        paddingBottom: theme.other.spacing.s10,
        paddingLeft: theme.other.spacing.s10,
        paddingRight: theme.other.spacing.s10,
      };
    }
  }

  if (size === "md") {
    if (leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s8,
        paddingBottom: theme.other.spacing.s8,
        paddingLeft: theme.other.spacing.s12,
        paddingRight: theme.other.spacing.s10,
      };
    }
    if (rightIcon) {
      padding = {
        paddingTop: theme.other.spacing.s10,
        paddingBottom: theme.other.spacing.s10,
        paddingLeft: theme.other.spacing.s10,
        paddingRight: theme.other.spacing.s12,
      };
    }
    if (!rightIcon && !leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s8,
        paddingBottom: theme.other.spacing.s8,
        paddingLeft: theme.other.spacing.s10,
        paddingRight: theme.other.spacing.s10,
      };
    }
  }
  if (size === "sm") {
    if (leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s6,
        paddingBottom: theme.other.spacing.s6,
        paddingLeft: theme.other.spacing.s6,
        paddingRight: theme.other.spacing.s8,
      };
    }
    if (rightIcon) {
      padding = {
        paddingTop: theme.other.spacing.s6,
        paddingBottom: theme.other.spacing.s6,
        paddingLeft: theme.other.spacing.s12,
        paddingRight: theme.other.spacing.s10,
      };
    }
    if (!rightIcon && !leftIcon) {
      padding = {
        paddingTop: theme.other.spacing.s6,
        paddingBottom: theme.other.spacing.s6,
        paddingLeft: theme.other.spacing.s8,
        paddingRight: theme.other.spacing.s8,
      };
    }
  }
  return padding;
};

const constructFonts: FontsFunction = (theme, size) => {
  let fonts: ButtonFonts = {} as ButtonFonts;

  if (size === "lg") {
    fonts = theme.other.typographyScales.bodyB3;
  }
  if (size === "md") {
    fonts = theme.other.typographyScales.labelL1;
  }
  if (size === "sm") {
    fonts = theme.other.typographyScales.labelL3;
  }

  return fonts;
};

export default function MantineBtn({
  variant = "primary",
  size = "lg",
  disabled,
  type = "button",
  children,
  isLoading,
  onClick,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onlyIcon = false,
}: ButtonProps) {
  const { classes } = createStyles((theme) => {
    const paddingObj: ButtonPadding = constructPadding(theme, leftIcon, rightIcon, size);
    const fontObj: ButtonFonts = constructFonts(theme, size);

    return {
      leftIcon: {
        // height: size === "lg" ? "24px" : size === "md" ? "20px" : "16px",
        // width: size === "lg" ? "24px" : size === "md" ? "20px" : "16px",
        margin: 0,
        // color: "red",
        height: "16px !important",
        width: "16px !important",
      },
      rightIcon: {
        height: size === "lg" ? "24px" : size === "md" ? "20px" : "16px",
        width: size === "lg" ? "24px" : size === "md" ? "20px" : "16px",
        margin: 0,
      },
      label: {
        textAlign: "center",
        lineHeight: 0,
      },
      root: {
        border: variant === "primary" ? "1px solid #527181" : "",
        ...paddingObj,
        color: disabled ? theme.colors.gray[5] : variant === "secondary" ? theme.colors.sea[8] : theme.colors.black[0],
        boxShadow:
          variant === "primary"
            ? `0px 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.06), 0px 6px 6px -3px rgba(0, 0, 0, 0.06), 0px 12px 12px -6px rgba(0, 0, 0, 0.06), 0px 24px 24px -12px rgba(0, 0, 0, 0.06)`
            : "",
        borderRadius:
          size === "lg" ? theme.other.spacing.s12 : size === "md" ? theme.other.spacing.s10 : theme.other.spacing.s8,
        ...fontObj,
        minHeight: rem(String(theme.other.spacing.s40)),
        background: disabled
          ? theme.colors.gray[2]
          : variant === "secondary"
          ? theme.colors.gray[3]
          : `linear-gradient(180deg, #234D60 0%, #212529 100%)`,
        transition: "all 0.5s ease-in-out",
        ":hover": {
          background:
            variant === "primary"
              ? "linear-gradient(180deg, #053B50 0%, #212529 100%)"
              : variant === "secondary"
              ? theme.colors.gray[4]
              : "",
          boxShadow: "none",
        },
        ":disabled": {
          boxShadow: "none",
        },
      },
      inner: {
        display: "flex",
        alignItems: "center",
        gap: size === "lg" ? theme.other.spacing.s4 : theme.other.spacing.s2,
      },
    };
  })();

  const minWidth = size === "lg" ? 105 : size === "md" ? 90 : 70;
  const minHeight = size === "lg" ? 47 : size === "md" ? 40 : 30;

  return (
    <Button
      classNames={{
        leftIcon: classes.leftIcon,
        rightIcon: classes.rightIcon,
        label: classes.label,
        root: classes.root,
        inner: classes.inner,
      }}
      miw={onlyIcon ? "" : minWidth}
      mih={minHeight}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      leftIcon={leftIcon}
      onClick={onClick}
      loading={isLoading}
      rightIcon={rightIcon}
    >
      {children}
    </Button>
  );
}
