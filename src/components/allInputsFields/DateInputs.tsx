//Mantine Input
import { DatePickerInput } from "@mantine/dates";
//Import from react
import React from "react";
//React hook form
import { Controller, useFormContext } from "react-hook-form";
import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";

/* Type declared for props passed inside DateInputs component */
interface DateInputProps extends InputPorps {
  datetype?: "range" | "multiple" | "default";
  valueFormat?: string;
}

/******************** Functional Component ********************/

const DateInputs = ({
  /* Props of functions */
  placeholder,
  label,
  withAsterisk,
  description,
  disabled,
  name,
  datetype,
  valueFormat,
}: DateInputProps) => {
  /* function starts here */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <DatePickerInput
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            error: classes.error,
          }}
          // functionality props
          type={datetype || "default"}
          {...field}
          // Error coming from RHF
          error={errors[name]?.message as React.ReactNode}
          //Default props
          minDate={new Date()}
          label={label}
          id={name}
          placeholder={placeholder}
          withAsterisk={withAsterisk || true}
          disabled={disabled || false}
          description={description}
          clearable
          valueFormat={valueFormat}
        />
      )}
    />
  );
};

export default DateInputs;
