import React from "react";
import { PasswordInput, Tooltip, createStyles } from "@mantine/core";
import { InputFieldPorps } from "./InputInterface";
import { useFormContext } from "react-hook-form";
import { useMantineTheme } from "@mantine/core";
import { useStyles } from "./Styles";
import { IconInfoCircle } from "@tabler/icons-react";
import { formatName } from "./StringInput";

const PasswordInputs = ({ label, placeholder, disabled, name, tooltip }: InputFieldPorps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <PasswordInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
        input: classes.input,
        label: `${classes.label} labelL1`,
      }}
      {...register(name, {
        required: {
          value: true,
          message: `${label} is required`,
        },
      })}
      // Error coming from RHF
      error={formatName(name, errors)}
      // default props of Mantine
      label={
        <>
          {label}
          <Tooltip
            zIndex={9999999}
            position='top'
            label={tooltip || false}
            classNames={{
              tooltip: `${classes.tooltip} labelL3`,
            }}
          >
            <IconInfoCircle color={theme.colors.black["1"]} size={16} />
          </Tooltip>
        </>
      }
      placeholder={placeholder}
      disabled={disabled || false}
    />
  );
};

export default PasswordInputs;
