//Mantine Import

import { TextInput, createStyles } from "@mantine/core";
import React from "react";
//React hook form import
import { useFormContext } from "react-hook-form";
import { InputPorps } from "../interface/InputFieldInterface";
import { useStyles } from "./styles";

/******************** Functional Component ********************/

function String({ label, withAsterisk, description, disabled, placeholder, name }: InputPorps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  // const error = useSelector((state: any) => state.errors.stringError);

  return (
    <TextInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
      }}
      // default props
      placeholder={placeholder || "Enter Your Name"}
      label={label || "Email"}
      withAsterisk={withAsterisk || true}
      description={description}
      disabled={disabled || false}
      // functionality props
      error={errors[name]?.message as React.ReactNode}
      type='text'
      {...register(name)}
    />
  );
}

export default String;
