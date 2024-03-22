/** @format */

import * as yup from "yup";

const registerNewClientSchema: any = [
  yup.object().shape({
    CustomerTypeMasterId: yup.string().required().label("Client Type"),
    ParentCustomerId: yup.string().required().label("Parent Compnay"),
    ClientLegalEntity: yup
      .string()
      .required()
      .matches(/^[^0-9]*$/, "Input cannot contain numbers")
      .trim("Client Legal Entity cannot include leading and trailing spaces")
      .strict(true)
      .label("Client Legal Entity"),
    HeadQuarter: yup
      .string()
      .required()
      .matches(/^[^0-9]*$/, "Input cannot contain numbers")
      .trim("HeadQuarter cannot include leading and trailing spaces")
      .test(
        "no-spaces-between-words",
        "Spaces between words are not allowed",
        (value: any) => !/\s/.test(value)
      )
      .strict(true)
      .label("Head Quarter"),
    EmployeeRange: yup.string().required().label("Employee Range"),
    ScopeEntity: yup
      .string()
      .required()
      .matches(/^[^0-9]*$/, "Input cannot contain numbers")
      .trim("ScopeEntity cannot include leading and trailing spaces")
      .strict(true)
      .label("Scope Entity"),
    EngagementType: yup.string().required().label("Engagement Type"),
    RevenueRange: yup.string().required().label("Revenue Range"),
    Auditor: yup.string().required().label("Auditor"),
    DataSourceFileUpload: yup.array().min(1).required().label("Data Source"),
    ComplianceRequirement: yup.array().min(1).required().label("Compliance Requirement"),
    CustLogo: yup
      .mixed()
      .label("Logo Upload")
      .test("fileType", "Invalid file format", (value: any) => {
        if (!value) return true; // No file selected is considered valid
        const allowedFileTypes = ["image/jpeg", "image/png"]; // Add the allowed file types here
        return allowedFileTypes.includes(value.type);
      })
      .test("fileSize", "File size is too large", (value: any) => {
        if (!value) return true; // No file selected is considered valid
        const maxSizeInBytes = 5242880; // 5MB (adjust as needed)
        return value.size <= maxSizeInBytes;
      })
      .required(),
  }),
  yup.object().shape({
    PrimaryContact: yup
      .string()
      .required()
      .matches(/^[^0-9]*$/, "Input cannot contain numbers")
      .trim("PrimaryContact cannot include leading and trailing spaces")
      .strict(true)
      .label("Primary Contact Person"),
    ContactNumber: yup
      .string()
      .required()
      .label("Contact Number")
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    Designation: yup
      .string()
      .matches(/^[^0-9]*$/, "Input cannot contain numbers")
      .required()
      .label("Designation")
      .trim("Designation cannot include leading and trailing spaces")
      .strict(true),
    EmailAddress: yup
      .string()
      .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "Email is not valid")
      .required()
      .label("Email"),
  }),
  yup.object().shape({
    DeploymentType: yup.string().required().label("Deployment Type"),
    NumberOfProductionInstance: yup.string().required().label("Number Of Production Instances"),
  }),
  yup.object().shape({
    DataBaseType: yup.string().required().label("Source Database"),
  }),
  yup.object().shape({
    ERP: yup.array().min(1).required().label("Source Erp value"),
  }),
  yup.object().shape({}),
];

export default registerNewClientSchema;
