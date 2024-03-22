import { Loader, Text, createStyles } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React from "react";
import { Squircle } from "@squircle-js/react";

type ButtonProps = {
  variant?: "default" | "filled" | "small" | "medium";
  fullWidth?: boolean;
  disabled?: boolean;
  mt?: string;
  type?: "button" | "reset" | "submit" | undefined;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  onSubmit?: (value: any) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const TestBtn = ({
  disabled = false,
  children,
  type = "button",
  variant = "filled",
  onClick,
  onSubmit,
  isLoading = false,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const useStyle = createStyles((theme) => {
    const RightPadding = (leftIcon: React.ReactNode, rightIcon: React.ReactNode) => {
      if (leftIcon) {
        return theme.other.spacing.s12;
      } else if (rightIcon) {
        return theme.other.spacing.s10;
      } else {
        return theme.other.spacing.s10;
      }
    };

    const LeftPadding = (leftIcon: React.ReactNode, rightIcon: React.ReactNode) => {
      if (leftIcon) {
        return theme.other.spacing.s10;
      } else if (rightIcon) {
        return theme.other.spacing.s12;
      } else {
        return theme.other.spacing.s10;
      }
    };

    const varientSmallRightPadding = (leftIcon: React.ReactNode, rightIcon: React.ReactNode) => {
      if (leftIcon) {
        return theme.other.spacing.s8;
      } else if (rightIcon) {
        return theme.other.spacing.s10;
      } else {
        return theme.other.spacing.s10;
      }
    };

    const varientSmallLeftPadding = (leftIcon: React.ReactNode, rightIcon: React.ReactNode) => {
      if (leftIcon) {
        return theme.other.spacing.s6;
      } else if (rightIcon) {
        return theme.other.spacing.s12;
      } else {
        return theme.other.spacing.s10;
      }
    };

    const varientMediumLeftPadding = (leftIcon: React.ReactNode, rightIcon: React.ReactNode) => {
      if (leftIcon) {
        return theme.other.spacing.s12;
      } else if (rightIcon) {
        return theme.other.spacing.s12;
      } else {
        return theme.other.spacing.s10;
      }
    };

    return {
      wrapper: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      },
      reset: {
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        minWidth: variant === "small" ? 70 : variant === "medium" ? 90 : 105,
        minHeight: variant === "small" ? 30 : variant === "medium" ? 40 : 47,
        paddingTop:
          variant === "small"
            ? theme.other.spacing.s6
            : variant === "medium"
            ? theme.other.spacing.s8
            : theme.other.spacing.s10,
        paddingBottom:
          variant === "small"
            ? theme.other.spacing.s6
            : variant === "medium"
            ? theme.other.spacing.s8
            : theme.other.spacing.s10,
        paddingRight:
          variant === "small"
            ? varientSmallRightPadding(leftIcon, rightIcon)
            : variant === "medium"
            ? theme.other.spacing.s10
            : RightPadding(leftIcon, rightIcon),
        paddingLeft:
          variant === "small"
            ? varientSmallLeftPadding(leftIcon, rightIcon)
            : variant === "medium"
            ? varientMediumLeftPadding(leftIcon, rightIcon)
            : LeftPadding(leftIcon, rightIcon),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: variant === "medium" ? 10 : 12,
        border: disabled ? `1px solid ${theme.colors.gray["2"]}` : "1px solid #527181",
        background: disabled ? theme.colors.gray["2"] : "linear-gradient(180deg, #234D60 0%, #212529 100%)",
        boxShadow: !disabled
          ? "0px 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.06), 0px 6px 6px -3px rgba(0, 0, 0, 0.06), 0px 12px 12px -6px rgba(0, 0, 0, 0.06), 0px 24px 24px -12px rgba(0, 0, 0, 0.06)"
          : "none",
        transition: "all 0.5s ease-out",

        ":hover": {
          background: disabled ? theme.colors.gray["2"] : "linear-gradient(180deg, #053B50 0%, #212529 100%)",
          boxShadow: "none",
          border: disabled
            ? "none"
            : `${
                variant === "filled" || variant === "small"
                  ? `1px solid ${theme.colors.sea[9]}`
                  : `1px soild ${theme.colors.black[0]}`
              }`,
        },

        ":active": {
          border: disabled ? theme.colors.gray["2"] : "1px solid #5E5E5E",
          background: disabled ? theme.colors.gray["2"] : "#1B1B1B",
          boxShadow: disabled
            ? "none"
            : "0px 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.06), 0px 6px 6px -3px rgba(0, 0, 0, 0.06), 0px 12px 12px -6px rgba(0, 0, 0, 0.06), 0px 24px 24px -12px rgba(0, 0, 0, 0.06)",
        },
      },
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
      },
      text: {
        fontSize:
          variant === "small"
            ? theme.other.typographyScales.labelL3.fontSize
            : variant === "medium"
            ? theme.other.typographyScales.labelL1.fontSize
            : theme.other.typographyScales.bodyB3.fontSize,
        lineHeight: 0,

        fontFamily:
          variant === "small"
            ? theme.other.typographyScales.labelL3.fontFamily
            : variant === "medium"
            ? theme.other.typographyScales.labelL1.fontFamily
            : theme.other.typographyScales.bodyB3.fontFamily,
        fontStyle:
          variant === "small"
            ? theme.other.typographyScales.labelL3.fontStyle
            : variant === "medium"
            ? theme.other.typographyScales.labelL1.fontStyle
            : theme.other.typographyScales.bodyB3.fontStyle,

        color: disabled
          ? theme.colors.gray["5"]
          : variant === "filled" || variant === "small" || variant === "medium"
          ? theme.colors.black[0]
          : theme.colors.black[5],
      },

      icon: {
        width: variant === "medium" ? "20px" : variant === "small" ? "16px" : "24px",
        height: variant === "medium" ? "20px" : variant === "small" ? "16px" : "24px",
        textAlign: "center",
        color: disabled ? theme.colors.gray["5"] : theme.colors.black["0"],
      },
    };
  });

  const { classes } = useStyle();

  return (
    <Squircle cornerRadius={variant === "medium" ? 10 : 12} cornerSmoothing={1} className={classes.wrapper}>
      <button
        className={classes.reset}
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}
        disabled={isLoading || disabled}
      >
        <div className={classes.container}>
          {isLoading && <Loader size='xs' className={classes.icon} />}
          {!isLoading && leftIcon && React.cloneElement(leftIcon as React.ReactElement, { className: classes.icon })}
          <Text className={classes.text}>{children}</Text>
          {!isLoading && rightIcon && React.cloneElement(rightIcon as React.ReactElement, { className: classes.icon })}
        </div>
      </button>
    </Squircle>
  );
};

export default TestBtn;
