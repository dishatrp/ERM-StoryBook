/** @format */

import {
  Email,
  Number,
  Password,
  String,
  SelectInput,
  DateInputs,
} from "@/components/allInputsFields";
import { Container, Paper, SimpleGrid } from "@mantine/core";
import Buttons from "./Button";
import FileUpload from "./allInputsFields/FileUpload";
import MultiSelects from "./allInputsFields/MultiSelects";
import Switchs from "./allInputsFields/Switchs";
import { useSelector } from "react-redux";
import Check from "./allInputsFields/Check";

/* Props for Input Field  */
export type InputFieldsProps = {
  name: string;
  label: string;
  withAsterisk: boolean;
  type: string;
  placeholder?: string;
  data?: any;
  datetype?: "range" | "multiple" | "default";
  accept?: string;
  onLabel?: string;
  offLabel?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  searchable?: boolean;
  valueFormat?: string;
};

let btn: boolean = true;

/******************** Functional Component ********************/

/* This function will take the inputField as an arry of object and map over the array and check the type of the input field and it will return that components as the condition matches with the input field. */

const FormGrid = ({
  inputFields,
  colsNo,
  btn,
  children,
  disablebtn,
  isLoadingBtn,
}: {
  inputFields: InputFieldsProps[];
  colsNo: number;
  btn: boolean;
  children?: React.ReactNode;
  disablebtn: boolean;
  isLoadingBtn?: boolean;
}) => {
  return (
    <Container size={"lg"} p={0}>
      <Paper withBorder shadow='md' p={30} radius='md'>
        <SimpleGrid
          // Style prop
          cols={colsNo}
          spacing='lg'
          verticalSpacing='lg'
        >
          {inputFields.map((el, i) => {
            if (el.type === "text" && el.name === "email")
              return (
                <Email key={i} name={el.name} description={el.description} disabled={el.disabled} />
              );
            else if (el.type === "text") {
              return (
                <String
                  name={el.name}
                  key={i}
                  label={el.label}
                  placeholder={el.placeholder}
                  description={el.description}
                  disabled={el.disabled}
                />
              );
            } else if (el.type === "number")
              return (
                <Number
                  key={i}
                  name={el.name}
                  label={el.label}
                  placeholder={el.placeholder}
                  description={el.description}
                  disabled={el.disabled}
                />
              );
            else if (el.type === "dropdown")
              return (
                <SelectInput
                  name={el.name}
                  placeholder={el.placeholder}
                  key={i}
                  label={el.label}
                  data={el.data}
                  description={el.description}
                  disabled={el.disabled}
                  searchable={el.searchable}
                />
              );
            else if (el.type === "password")
              return (
                <Password
                  key={i}
                  description={el.description}
                  disabled={el.disabled}
                  name={el.name}
                  label={el.label}
                  placeholder={el.placeholder}
                />
              );
            else if (el.type === "date")
              return (
                <DateInputs
                  label={el.label}
                  placeholder={el.placeholder}
                  key={i}
                  name={el.name}
                  datetype={el.datetype}
                  description={el.description}
                  disabled={el.disabled}
                  valueFormat={el.valueFormat}
                />
              );
            else if (el.type === "multiSelect")
              return (
                <MultiSelects
                  name={el.name}
                  placeholder={el.placeholder}
                  key={i}
                  label={el.label}
                  data={el.data}
                  description={el.description}
                  disabled={el.disabled}
                />
              );
            else if (el.type === "fileUpload")
              return (
                <FileUpload
                  name={el.name}
                  placeholder={el.placeholder}
                  key={i}
                  label={el.label}
                  accept={el.accept}
                  description={el.description}
                  disabled={el.disabled}
                />
              );
            else if (el.type === "switch")
              return (
                <Switchs
                  name={el.name}
                  key={i}
                  label={el.label}
                  onLabel={el.onLabel}
                  offLabel={el.offLabel}
                  description={el.description}
                />
              );
            else if (el.type === "checkbox")
              return (
                <Check
                  name={el.name}
                  key={i}
                  label={el.label}
                  disabled={el.disabled}
                  description={el.description}
                />
              );
          })}
        </SimpleGrid>
        {btn ? (
          <Buttons
            fullWidth={true}
            mt='xl'
            type='submit'
            disabled={disablebtn}
            isLoading={isLoadingBtn}
          >
            Submit
          </Buttons>
        ) : (
          children
        )}
      </Paper>
    </Container>
  );
};

export default FormGrid;
