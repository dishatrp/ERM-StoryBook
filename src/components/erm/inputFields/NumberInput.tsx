import { TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import React from "react";
import { InputFieldPorps } from "./InputInterface";
import { useStyles } from "./Styles";
import { IconInfoCircle } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { formatName } from "./StringInput";

const NumberInput = ({ placeholder, label, disabled, name, max, min, tooltip }: InputFieldPorps) => {
  const { classes } = useStyles();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const theme = useMantineTheme();
  return (
    <TextInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
        input: classes.input,
        label: `${classes.label} labelL1`,
      }}
      // functionality props
      {...register(name, {
        required: {
          value: true,
          message: `${label} is required`,
        },
      })}
      //Error coming from RHF
      error={formatName(name, errors)}
      //Default props
      max={max}
      min={min}
      type={"number"}
      label={
        <>
          {label}
          <Tooltip
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

export default NumberInput;
