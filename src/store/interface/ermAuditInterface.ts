export interface AuditItem {
  ITEM_ID: string;
  ITEM_AUTO_ID: string;
  SCOPE: string;
  AUDIT_TITLE: string;
  AUDIT_TYPE: string;
  AUDITORS: string;
  AUDIT_OWNER: string;
  DEPARTMENT: string;
  RISK_ASSESSMENT: string;
  PLANNING_START_DATE: string; // ISO Date string
  PLANNING_END_DATE: string; // ISO Date string
  ITEM_STATUS: string | null;
  ITEM_FILE_ID: string | null;
  ITEM_IS_UPLOADED: string | null;
  ITEM_CREATED_AT: string; // ISO Date string
  ITEM_CREATED_BY: string;
  TEMPLATE_ID: string;
  PREP_ID: string | null;
  PREP_AUTO_ID: string | null;
  BACKGROUND_INFORMATION: string | null;
  ROOT_CAUSE_ANALYSIS: string | null;
  IMPACT_DESCRIPTION: string | null;
  TARGET_DATE: string | null; // ISO Date string
  AUDIT_PROGRAM: string | null;
  PROCESS_OWNER: string | null;
  AUDIT_STATUS: string | null;
  PREP_FILE_ID: string | null;
  PREP_IS_UPLOADED: string | null;
  PLAN_ID: string;
  PLAN_AUTO_ID: string;
  AUDIT_PLANS_TITLE: string;
  PLANNED_EFFORT: string;
  DESCRIPTION: string;
  AUDIT_PLANS_TIME_PERIOD: string; // ISO Date string
  FINANCIAL_BUDGET: string;
  PLAN_STATUS: string | null;
  PLAN_FILE_ID: string | null;
  PLAN_IS_UPLOADED: string | null;
  AUDIT_ID: string | null;
  AUDIT_AUTO_ID: string | null;
  CREATE_AUDIT_TITLE: string | null;
  AUDIT_SCOPE: string | null;
  CREATE_AUDIT_TIME_PERIOD: string | null; // ISO Date string
  TYPE: string | null;
  AUDIT_GROUP: string | null;
  COUNTRY: string | null;
  OPERATING_UNITS: string | null;
  ESTIMATED_EFFORTS: string | null;
  ESTIMATED_COST: string | null;
  TAGS: string | null;
  AUDIT_FILE_ID: string | null;
  AUDIT_IS_UPLOADED: string | null;
  AUDITREPORT_ID: string | null;
  AUDITREPORT_AUTO_ID: string | null;
  DATA_REPORT: string | null;
  RECOMMENDATION: string | null;
  MANAGEMENT_RESPONSE: string | null;
  REVIEWER_NOTE: string | null;
  REPORT_DETAILS_ROOT_CAUSE: string | null;
  IMPACT_IN_REPORTING: string | null;
  ATTACH_FINAL_REPORT: string | null;
  AUDITREPORT_STATUS: string | null;
  AUDITREPORT_FILE_ID: string | null;
  AUDITREPORT_IS_UPLOADED: string | null;
  AUDITEXE_ID: string | null;
  AUDITEXE_AUTO_ID: string | null;
  PROCEDURE_CHECKLIST: string | null;
  FINDINGS: string | null;
  INTERVIEW_SUMMARIES: string | null;
  PROGRESS_NOTE: string | null;
  EXECUTION_TITLE: string | null;
  EVIDENCE_ATTACHMENT: string | null;
  INTERVIEWS: string | null;
  AUDITEXE_STATUS: string | null;
  AUDITEXE_FILE_ID: string | null;
  AUDITEXE_IS_UPLOADED: string | null;
  FOLLREP_ID: string | null;
  FOLLREP_AUTO_ID: string | null;
  DETAILS_OBSERVATION: string | null;
  AUDIT_REPORT_ROOT_CAUSE: string | null;
  FOLLREP_STATUS: string | null;
  FOLLREP_FILE_ID: string | null;
  FOLLREP_IS_UPLOADED: string | null;
}

export interface GetTabledataInterface {
  status: boolean;
  data: AuditItem[];
  message: string;
  errors: any[];
}

export interface ItemIds {
  ITEM_ID: string;
  PREP_ID: string;
  PLAN_ID: string;
  AUDIT_ID: string;
  AUDITREPORT_ID: string;
  AUDITEXE_ID: string;
  FOLLREP_ID: string;
}

interface Item {
  ID: string;
  AUTO_ID: string;
  SCOPE: string | null;
  AUDIT_TITLE: string | null;
  AUDIT_TYPE: string | null;
  AUDITORS: string | null;
  AUDIT_OWNER: string | null;
  DEPARTMENT: string | null;
  RISK_ASSESSMENT: string | null;
  PLANNING_START_DATE: string | null;
  PLANNING_END_DATE: string | null;
  STATUS: string | null;
  CREATED_AT: string;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  TEMPLATE_ID: string;
  FILE_ID: string | null;
  IS_UPLOADED: string | null;
}

interface Items {
  createAuditItem: Item;
  createAuditPlans: Item;
  createAudit: Item;
  backgroundInformation: Item;
  auditExecutionDetails: Item;
  auditReportingDetails: Item;
  auditReport: Item;
}

interface Data {
  items: Items;
}

export interface fetchEditRes {
  status: boolean;
  data: Data;
  message: string;
  errors: any[]; // You can specify the type of errors if needed
}
