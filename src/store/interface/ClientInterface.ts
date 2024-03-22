interface MasterData {
  status: boolean;
  data: {
    metaData: MetaData[];
  };
  message: string;
  errors: string[];
}

interface MetaData {
  MST_HDR_ID: string;
  MASTER_TYPE: string;
  MST_DTL: MasterDetail[];
}

interface MasterDetail {
  MST_DTL_ID: string;
  DESC: string;
}

export interface Module {
  ID: string;
  ITEM: string;
  SLUG: string;
}

export interface ResponseCLient {
  metaData: MetaData[];
  modules: Module[];
}

interface ClientDetail {
  CustomerTypeMasterId: string;
  ParentCustomerId: string;
  ClientLegalEntity: string;
  HeadQuarter: string;
  EmployeeRange: string;
  ScopeEntity: string;
  EngagementType: string;
  RevenueRange: string;
  Auditor: string;
  ContactNumber: string;
  Designation: string;
  EmailAddress: string;
  CustLogo: string;
  DataBaseType?: string | undefined | null;
  PrimaryContact: string;
  isActive?: string | undefined;
  image64?: string | ArrayBuffer | null | undefined;
  CustomerId?: undefined | null | number | string;
}

interface Deployment {
  DeploymentType: string;
  NumberOfProductionInstance: string;
}

export interface Modules {
  ModuleLicense: string;
  ModuleLicenseName: string;
  startDate: string;
  endDate: string;
}

export interface RequestNewClient {
  clientDetail: ClientDetail;
  ComplianceRequirement: string[];
  DataSourceFileUpload: string[];
  ERP: string[];
  deployment: Deployment;
  moduleLicenses: Modules[];
}

export interface ResponseNewClient {
  status: true;
  data: {
    custId: string;
    clientName: string;
  };
  message: string;
  errors: any[];
}

export interface ErrorResponse {
  status: number;
  data: {
    status: boolean;
    message: string;
    data: Record<string, unknown>;
    errors: string[];
  };
}

export interface ApiResponseClient {
  status: boolean;
  data: {
    globalCustomerMaster: GlobalCustomer[];
  };
  message: string;
  errors: string[];
}

interface GlobalCustomer {
  id: string;
  type: string;
}

interface ReadSingleCLient {
  CustomerId: string;
  ParentCustomerId: string;
  CustomerTypeMasterId: string;
  ClientLegalEntity: string;
  HeadQuarter: string;
  EmployeeRange: string;
  ScopeEntity: string;
  EngagementType: string;
  RevenueRange: string;
  Auditor: string;
  Designation: string;
  PrimaryContact: string;
  ContactNumber: string;
  EmailAddress: string;
  CustLogo: string;
}

interface ModuleLicense {
  ModuleLicense: string;
  ModuleLicenseName: string;
  StartDate: string | null;
  EndDate: string | null;
}

interface Deployment {
  DeploymentType: string;
  NumberOfProductionInstance: string;
}

export interface Data {
  clientDetail: ReadSingleCLient;
  ComplianceRequirement: string[];
  DataSourceFileUpload: string[];
  moduleLicenses: ModuleLicense[];
  ERP: string[];
  deployment: Deployment;
}

export interface ApiResponseSingleClient {
  status: boolean;
  data: Data;
  message: string;
  errors: string[];
}

export interface bodySingleClinet {
  clientId: string;
}

export interface ErrorResponseSingleClient {
  status: boolean;
  data: Record<string, never>; // Empty object as there is no data in the example
  message: string;
  errors: string[];
}

export interface UpdateClient {
  status: boolean;
  data: Record<string, any>; // You can replace "any" with the specific type if you know it
  message: string;
  errors: string[];
}

interface updateClientDetail {
  CustomerId: number;
  CustomerTypeMasterId: string;
  ParentCustomerId: string;
  ClientLegalEntity: string;
  HeadQuarter: string;
  EmployeeRange: string;
  ScopeEntity: string;
  EngagementType: string;
  RevenueRange: string;
  Auditor: string;
  CustLogo: string;
  isActive: string | boolean;
  PrimaryContact: string;
  Designation: string;
  EmailAddress: string;
  ContactNumber: string;
  image64: string | ArrayBuffer | null | undefined;
}

interface Deployment {
  DeploymentType: string;
  NumberOfProductionInstance: string;
}

interface ModuleLicense {
  ModuleLicense: string;
  ModuleLicenseName: string;
  startDate: string;
  endDate: string;
  index: number;
}

export interface updateClientRequest {
  clientDetail: ClientDetail;
  ComplianceRequirement: string[];
  DataSourceFileUpload: string[];
  ERP: string[];
  deployment: Deployment;
  moduleLicenses: Modules[];
}
