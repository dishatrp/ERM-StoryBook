// Mantine Import
import { TextInput, createStyles } from "@mantine/core";
//import from react hook form
import { useFormContext } from "react-hook-form";
import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";

/* Type declared for props passed inside Number component */
interface numberType extends InputPorps {
  max?: number;
  min?: number;
}

/******************** Functional Component ********************/

function Number({
  /* Props of functions */
  label,
  name,
  placeholder,
  withAsterisk,
  description,
  disabled,
  max,
  min,
}: numberType) {
  /* Function starts here */
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <TextInput
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
      }}
      // functionality props
      {...register(name)}
      //Error coming from RHF
      error={errors[name]?.message as React.ReactNode}
      //Default props
      max={max}
      min={min}
      type={"number"}
      label={label}
      placeholder={placeholder}
      withAsterisk={withAsterisk || true}
      description={description}
      disabled={disabled || false}
    />
  );
}

export default Number;
