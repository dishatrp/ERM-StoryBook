/** @format */
/* Mantine import */
import { MultiSelect } from "@mantine/core";
import React from "react";
/* React-hook-form import */
import { Controller, useFormContext } from "react-hook-form";
import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";

/* Type declared for props passed inside MultiSelects component */
interface MultiSelectProps extends InputPorps {
  value?: string;
  data: any;
  id?: string;
}

const MultiSelects = ({
  /* Props of functions */
  placeholder,
  label,
  withAsterisk,
  description,
  disabled,
  name,
  data,
  id,
}: MultiSelectProps) => {
  /* Function starts here */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <MultiSelect
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            error: classes.error,
          }}
          // functionality props
          {...field}
          // Error coming from RHF
          error={errors[name]?.message as React.ReactNode}
          //Default props
          label={label}
          id={id}
          placeholder={placeholder}
          withAsterisk={withAsterisk || true}
          disabled={disabled || false}
          description={description}
          data={data}
          maxDropdownHeight={160}
          //Transition Props
          transitionProps={{
            duration: 200,
            transition: "pop",
            timingFunction: "ease in",
          }}
        />
      )}
    />
  );
};

export default MultiSelects;
