/** @format */
//Import from mantine
import { Select } from "@mantine/core";
//Import from RHF
import { Controller, useFormContext } from "react-hook-form";
import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";
import { useState } from "react";

/* Type declared for props passed inside SelectInput component */
interface SelectInputProps extends InputPorps {
  data: any;
  id?: string;
  searchable?: boolean;
}

/******************** Functional Component ********************/

const SelectInput = ({
  /* Props of functions */
  name,
  placeholder,
  label,
  disabled,
  description,
  withAsterisk,
  data,
  id,
  searchable,
}: SelectInputProps) => {
  /* Function starts here */
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { classes } = useStyles();

  const [searchValue, onSearchChange] = useState("");

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => {
        return (
          <Select
            classNames={{
              root: classes.root,
              wrapper: classes.wrapper,
              error: classes.error,
            }}
            // functionality props
            {...field}
            //Error coming from RHF
            error={errors[name]?.message as React.ReactNode}
            //Default props
            label={label}
            id={id}
            placeholder={placeholder}
            withAsterisk={withAsterisk || true}
            disabled={disabled || false}
            description={description}
            clearable
            maxDropdownHeight={160}
            //searchable props
            searchable={searchable || false}
            onSearchChange={onSearchChange}
            searchValue={searchValue}
            nothingFound='No options'
            //Transition props
            transitionProps={{
              duration: 200,
              transition: "pop",
              timingFunction: "ease out",
            }}
            withinPortal={false}
            data={data}
          />
        );
      }}
    />
  );
};

export default SelectInput;

//disabled || false
//height: "126%",
