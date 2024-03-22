import { TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import { useStyles } from "./Styles";
import { IconInfoCircle } from "@tabler/icons-react";
import { InputFieldPorps } from "./InputInterface";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";

export const formatName = (name: string, errors: FieldErrors<FieldValues>) => {
  if (name.includes(".")) {
    const [key1, key2] = name.split(".");
    return (errors as any)?.[key1]?.[key2]?.message;
  }
  return errors?.[name]?.message;
};

const StringInput = ({ name, label, placeholder, disabled = false, tooltip }: InputFieldPorps) => {
  const { classes } = useStyles();

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const theme = useMantineTheme();

  return (
    <>
      <TextInput
        type='text'
        classNames={{
          root: classes.root,
          wrapper: classes.wrapper,
          error: classes.error,
          input: classes.input,
          label: `${classes.label} labelL1`,
        }}
        autoComplete='new-password'
        placeholder={placeholder}
        error={formatName(name, errors)}
        disabled={disabled}
        {...register(name, {
          required: {
            value: true,
            message: `${label} is required`,
          },
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: `${label} must contains text only`,
          },
        })}
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
              <IconInfoCircle color={theme.colors.black[1]} size={16} />
            </Tooltip>
          </>
        }
      />
    </>
  );
};

export default StringInput;
