import React from "react";
import { createStyles, rem, Button } from "@mantine/core";

interface ButtonTypes {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

const ButtonUpload = ({ children, onClick, loading, leftIcon, disabled }: ButtonTypes) => {
  const useStyles = createStyles((theme) => ({
    control: {
      position: "absolute",
      width: rem(250),
      left: `calc(50% - ${rem(125)})`,
      bottom: rem(-20),
    },
  }));

  const { classes, theme } = useStyles();

  return (
    <Button
      className={classes.control}
      size='md'
      radius='xl'
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      leftIcon={leftIcon}
    >
      {children}
    </Button>
  );
};

export default ButtonUpload;
