// Mantine Import
import { PasswordInput, createStyles } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { InputPorps } from "../interface/InputFieldInterface";
import { useStyles } from "./styles";

/******************** Functional Component ********************/
function Password({ label, description, withAsterisk, placeholder, disabled, name }: InputPorps) {
  /* Function starts here */
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <PasswordInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
      }}
      // Error coming from RHF
      error={errors[name]?.message as React.ReactNode}
      // default props of Mantine
      label={label}
      placeholder={placeholder}
      description={description}
      withAsterisk={withAsterisk || true}
      disabled={disabled || false}
      //functional props
      {...register(name)}
    />
  );
}

export default Password;
