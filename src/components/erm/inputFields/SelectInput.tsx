/** @format */
//Import from mantine
import { Select, Tooltip, useMantineTheme } from "@mantine/core";
//Import from RHF
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { InputFieldPorps } from "./InputInterface";
import { useStyles } from "./Styles";
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react";
import { formatName } from "./StringInput";

/******************** Functional Component ********************/

const SelectBox = ({
  /* Props of functions */
  name,
  placeholder,
  label,
  disabled,
  data,
  id,
  tooltip,
  searchable,
  onBlur,
  onChange,
  value,
  error,
}: InputFieldPorps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [searchValue, onSearchChange] = useState("");

  return (
    <Select
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        error: classes.error,
        input: classes.input,
        label: `${classes.label} labelL1`,
      }}
      //functionality props
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={error}
      name={name}
      //Default props
      label={
        <>
          {label}
          <Tooltip
            position='top'
            label={tooltip || false}
            classNames={{
              tooltip: `${classes.tooltip} labelL3`,
            }}
          >
            <IconInfoCircle color={theme.colors.black[1]} size={theme.other.spacing.s16} />
          </Tooltip>
        </>
      }
      id={id}
      rightSection={<IconChevronDown size={theme.other.spacing.s24} color={theme.colors.black[1]} />}
      rightSectionWidth={30}
      styles={{ rightSection: { pointerEvents: "none" } }}
      placeholder={placeholder}
      disabled={disabled || false}
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
};

const SelectInput = ({
  /* Props of functions */
  name,
  placeholder,
  label,
  disabled,
  data,
  id,
  tooltip,
  searchable,
  controller = true,
  onChange,
  onBlur,
  value,
  error,
}: InputFieldPorps) => {
  /* Function starts here */
  const form = useFormContext();

  if (!controller) {
    return (
      <SelectBox
        name={name}
        tooltip={tooltip}
        placeholder={placeholder}
        disabled={disabled}
        data={data}
        id={id}
        label={label}
        searchable={searchable}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={error}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={form?.control}
      rules={{
        required: {
          value: true,
          message: `${label} is a required field`,
        },
      }}
      defaultValue=''
      render={({ field }) => {
        const handleOnChange = (value: any) => {
          field.onChange(value);
          if (onChange) {
            onChange(value);
          }
        };
        return (
          <SelectBox
            tooltip={tooltip}
            placeholder={placeholder}
            disabled={disabled}
            data={data}
            id={id}
            searchable={searchable}
            {...field}
            error={formatName(name, form?.formState?.errors)}
            label={label}
            onChange={handleOnChange}
            // value={value}
          />
        );
      }}
    />
  );
};

export default SelectInput;
