export interface CommonResponse {
  status: boolean;
  data: any;
  message: string;
  errors: any[];
}
export interface OrgStructuresResponse {
  status: boolean;
  data: Data;
  message: string;
  errors: any[];
}

export interface Data {
  OrgStructuresList: OrgStructure[];
}

export interface OrgStructure {
  ID: string;
  ORG_STRUCTURE_NAME: string;
  PARENT_ID: string;
  STATUS: string;
  CUST_ID: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string;
}

export interface PostOrgStructureData {
  ORG_STRUCTURE_NAME: string;
  PARENT_ID: number;
}
export interface UpdateOrgStructureData {
  ID: number;
  ORG_STRUCTURE_NAME: string;
}
export interface DeleteOrgNode {
  ID: number;
}
export interface ProcessList {
  status: boolean;
  data: Process[];
  message: string;
  errors: any[]; // You can replace 'any' with a more specific type if errors follow a specific structure
}

export interface Process {
  ID: string;
  PROCESS_NAME: string;
  PARENT_ID: string;
  PROCESS_SLUG: string;
  STATUS: string;
  FILE_ID: string | null;
  CUST_ID: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  children?: Process[]; // Optional property, an array of Process instances representing sub-processes
  level?: number;
  opened?: boolean;
}

export interface ExcelFile {
  ID: string;
  FILE_NAME: string;
  TYPE: string;
  CREATED_AT: string;
  CUST_ID: string;
}

export interface FileHistoryResponse {
  status: boolean;
  data: {
    excelList: ExcelFile[];
  };
  message: string;
  errors: string[];
}

export interface FileHistoryRequest {
  TYPE: "risk-register" | "control";
}

export interface ProcessData {
  ID: number;
  PROCESS_NAME: string;
  PARENT_ID: number;
  PROCESS_SLUG: string;
  STATUS: number;
}
export interface CreateProcessData {
  PROCESS_NAME: string;
  PARENT_ID: number;
}
export interface deleteProcessData {
  ID: number;
}
