import React, { useState } from "react";
import { Checkbox } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { useStyles } from "./styles";
import { InputPorps } from "../interface/InputFieldInterface";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setChecked } from "@/store/slice/checkedslice";

const Check = ({ name, label, disabled, description }: InputPorps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const checked = useAppSelector((state) => state.checkStatus.checked);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            classNames={{
              root: classes.root,
              //wrapper: classes.wrapper,
              error: classes.error,
            }}
            // functionality props

            onChange={(e) => {
              dispatch(setChecked(e.target.checked));
            }}
            //Error coming from RHF
            error={errors[name]?.message as React.ReactNode}
            //Default props
            label={label}
            disabled={disabled || false}
            description={description}
            checked={checked}
          />
        );
      }}
    />
  );
};

export default Check;
