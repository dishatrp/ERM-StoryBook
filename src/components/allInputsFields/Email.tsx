import React from "react";
//Mantine import
import { TextInput } from "@mantine/core";
//React hook form import
import { useFormContext } from "react-hook-form";

import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";

/******************** Functional Component ********************/
const EmailInput = ({
  /* Props of functions */
  name,
  label,
  withAsterisk,
  description,
  disabled,
  placeholder,
}: InputPorps) => {
  /* Function starts here */
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <TextInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
      }}
      // default prop
      placeholder={placeholder || "you@irmcloud.com"}
      label={label || "Email"}
      withAsterisk={withAsterisk || true}
      description={description}
      disabled={disabled || false}
      type='text'
      // functionality props
      {...register(name)}
      // Error coming from RHF
      error={errors[name]?.message as React.ReactNode}
    />
  );
};

export default EmailInput;
