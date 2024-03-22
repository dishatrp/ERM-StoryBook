/** @format */

import { InputFieldsProps } from "@/components/FormGrid";

export const generalInputPorps: InputFieldsProps[] = [
  {
    name: "CustomerTypeMasterId",
    id: "CUST_TYPES",
    label: "Client Type",
    withAsterisk: true,
    type: "dropdown",
    placeholder: "Enter your client type",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "ParentCustomerId",
    label: "Parent Company",
    withAsterisk: true,
    type: "dropdown",
    placeholder: "Enter your client type",
    data: [{ value: '1', label: "iRM Super Admin" }],
  },
  {
    name: "ClientLegalEntity",
    type: "text",
    label: "Client Legal Entity",
    withAsterisk: true,
    placeholder: "Client Legal Entity",
  },
  {
    name: "HeadQuarter",
    type: "text",
    label: "Head Quarter",
    withAsterisk: true,
    placeholder: "Enter Head Quarter",
  },
  {
    name: "EmployeeRange",
    id: "CUST_EMPLOYEE_RANGE",
    type: "dropdown",
    label: "Employee Range",
    withAsterisk: true,
    placeholder: "Enter Employee Range",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "ScopeEntity",
    type: "text",
    label: "Scope Entity",
    withAsterisk: true,
    placeholder: "Enter Scope Entity",
  },
  {
    name: "EngagementType",
    id: "CUST_ENGAGEMENT_TYPE",
    type: "dropdown",
    label: "Engagement Type",
    withAsterisk: true,
    placeholder: "Enter Head Quarter",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "RevenueRange",
    id: "CUST_REVENUE_RANGE",
    type: "dropdown",
    label: "Revenue Range",
    withAsterisk: true,
    placeholder: "Enter Revenue Range",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "Auditor",
    id: "CUST_AUDITOR_NAMES",
    type: "dropdown",
    label: "Auditor",
    withAsterisk: true,
    placeholder: "Enter auditior",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "DataSourceFileUpload",
    id: "DATASOURCE_TYPES",
    type: "multiSelect",
    label: "Data Source",
    withAsterisk: true,
    placeholder: "Enter data source",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "ComplianceRequirement",
    id: "CUST_COMPLIANCE_TYPES",
    type: "multiSelect",
    label: "Compliance Requirement",
    withAsterisk: true,
    placeholder: "Enter data source",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "CustLogo",
    type: "fileUpload",
    label: "Logo",
    accept: "image/png, image/jpeg",
    withAsterisk: true,
    placeholder: "Choose an Logo",
  },
  {
    name: "isActive",
    type: "checkbox",
    label: "User Status",
    withAsterisk: true,
    //placeholder: "Choose an Logo",
  },
];

export const conctactInitial: InputFieldsProps[] = [
  {
    name: "PrimaryContact",
    label: "Primary Contact Person",
    withAsterisk: true,
    type: "text",
    placeholder: "Enter Your Contact Person",
  },
  {
    name: "ContactNumber",
    label: "Contact Number",
    withAsterisk: true,
    type: "number",
    placeholder: "Enter Your Contact Number",
  },
  {
    name: "Designation",
    label: "Designation",
    withAsterisk: true,
    type: "text",
    placeholder: "Enter Your Designation",
  },
  {
    name: "EmailAddress",
    label: "Email",
    withAsterisk: true,
    type: "text",
    placeholder: "Enter Your Email",
  },
];

export const deployment: InputFieldsProps[] = [
  {
    name: "DeploymentType",
    id: "CUST_DEPLOYMENT_TYPES",
    type: "dropdown",
    label: "Deployment Type",
    withAsterisk: true,
    placeholder: "Enter Deployment Type",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "NumberOfProductionInstance",
    type: "number",
    label: "Number Of Production Instances",
    withAsterisk: true,
    placeholder: "Enter No Of Production Instances",
  },
];

export const selectDatabase: InputFieldsProps[] = [
  {
    name: "DataBaseType",
    id: "DATABASE",
    type: "dropdown",
    label: "Source Database",
    withAsterisk: true,
    placeholder: "Enter Source Database",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
];

export const erpSelection: InputFieldsProps[] = [
  {
    name: "ERP",
    id: "CUST_SOURCE_ERP_TYPES",
    type: "multiSelect",
    label: "Source Erp Value",
    withAsterisk: true,
    placeholder: "Enter Erp Value",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
];

export const moduleSelection: InputFieldsProps[] = [
  {
    name: "ModuleLicense", //PRODUCT_FAMILY
    type: "dropdown",
    label: "Module",
    withAsterisk: true,
    placeholder: "Enter module name",
    data: [{ value: 'No Data Found', label: 'No data found', disabled: true }],
  },
  {
    name: "moduleDate",
    type: "date",
    label: "Date",
    withAsterisk: true,
    placeholder: "Enter Start Date",
    datetype: "range",
  },
];

export const inputField = [
  generalInputPorps,
  conctactInitial,
  deployment,
  selectDatabase,
  erpSelection,
  moduleSelection,
];
