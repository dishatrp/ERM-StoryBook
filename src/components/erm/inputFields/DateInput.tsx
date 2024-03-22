import React, { ReactNode } from "react";
import { DatePickerInput } from "@mantine/dates";
import { InputFieldPorps } from "./InputInterface";
import { Tooltip, useMantineTheme } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useStyles } from "./Styles";
import { Controller, useFormContext } from "react-hook-form";
import { IconCalendarEvent } from "@tabler/icons-react";

const DateInput = ({ name, label, placeholder, disabled = false, error, tooltip }: InputFieldPorps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: {
            value: true,
            message: `${label} is a required field`,
          },
        }}
        render={({ field }) => (
          <DatePickerInput
            classNames={{
              root: classes.root,
              wrapper: classes.wrapper,
              error: classes.error,
              input: classes.input,
              label: `${classes.label} labelL1`,
            }}
            {...field}
            error={errors?.[name]?.message as ReactNode}
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
            placeholder={placeholder}
            disabled={disabled}
            rightSection={<IconCalendarEvent size={theme.other.spacing.s24} color={theme.colors.black[1]} />}
          />
        )}
      />
    </>
  );
};

export default DateInput;
