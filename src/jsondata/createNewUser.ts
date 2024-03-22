import { InputFieldsProps } from "@/components/FormGrid";

const CreateNewUserinputField: [InputFieldsProps[], InputFieldsProps[]] = [
  [
    {
      name: "userFName",
      label: "First Name",
      withAsterisk: true,
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      name: "userLName",
      label: "Last Name",
      type: "text",
      withAsterisk: true,
      placeholder: "Enter your last name",
    },
    {
      name: "userEmail",
      label: "email",
      type: "text",
      withAsterisk: true,
      placeholder: "Enter your email",
    },
    {
      name: "userContactNumber",
      label: "Contact No",
      type: "number",
      withAsterisk: true,
      placeholder: "Enter your contact no",
    },
    {
      name: "password",
      label: "Password",
      withAsterisk: true,
      type: "password",
      placeholder: "Enter your password",
    },
    {
      name: "passwordConfirm",
      label: "Confirm Password",
      withAsterisk: true,
      type: "password",
      placeholder: "Enter your password confirmation",
    },
    {
      name: "userName",
      label: "Username",
      withAsterisk: true,
      type: "text",
      placeholder: "Enter your username",
    },
    {
      name: "endDate",
      type: "date",
      withAsterisk: true,
      label: "End Date",
      placeholder: "Enter a date",
      datetype: "default",
    },
  ],
  [
    {
      name: "clientId",
      label: "Client",
      type: "dropdown",
      withAsterisk: true,
      placeholder: "Enter the client name",
      searchable: true,
      data: [],
    },
    {
      name: "policyId",
      label: "Permission Policy",
      withAsterisk: true,
      type: "dropdown",
      placeholder: "Enter permission of the user",
      data: [],
    },
  ],
];

export default CreateNewUserinputField;
