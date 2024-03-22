import { Textarea, Tooltip, useMantineTheme } from "@mantine/core";
import React from "react";
import { InputFieldPorps } from "./InputInterface";
import { IconInfoCircle } from "@tabler/icons-react";
import { useStyles } from "./Styles";
import { useFormContext } from "react-hook-form";
import { formatName } from "./StringInput";

const TextAreaInput = ({ name, label, placeholder, disabled = false, error, tooltip }: InputFieldPorps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Textarea
        placeholder={placeholder}
        autosize
        minRows={7}
        error={formatName(name, errors)}
        disabled={disabled}
        {...register(name, {
          required: {
            value: true,
            message: `${label} is required`,
          },
        })}
        classNames={{
          root: classes.root,
          wrapper: classes.wrapper,
          error: classes.error,
          input: classes.input,
          label: `${classes.label} labelL1`,
        }}
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
      />
    </>
  );
};

export default TextAreaInput;
