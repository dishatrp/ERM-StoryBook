

export type ApiResponse = {
  status: boolean;
  data: any; // Use 'any' if the data can be of any type, otherwise specify a more specific type or interface
  message: string;
  errors: any[]; // Use 'any[]' if errors can be of any type, otherwise specify a more specific type or interface for the errors
};


export interface FormPhases {
  items: {
    createAuditItem?: {
      SCOPE?: string;
      AUDIT_TITLE?: string;
      AUDIT_TYPE?: string;
      AUDITORS?: string;
      AUDIT_OWNER?: string;
      DEPARTMENT?: string;
      RISK_ASSESSMENT?: string;
      PLANNING_START_DATE?: string;
      PLANNING_END_DATE?: string;
    };
    createAuditPlans?: {
      TITLE?: string;
      PLANNED_EFFORT?: number;
      DESCRIPTION?: string;
      TIME_PERIOD?: Date;
      FINANCIAL_BUDGET?: number;
      STATUS?: string;
    };
    createAudit?: {
      TITLE?: string;
      AUDIT_SCOPE?: string;
      TIME_PERIOD?: string;
      TYPE?: string;
      GROUP?: string;
      COUNTRY?: string;
      OPERATING_UNITS?: string;
      ESTIMATED_EFFORTS?: number;
      ESTIMATED_COST?: number;
      TAGS?: string;
    };
    backgroundInformation?: {
      BACKGROUND_INFORMATION?: string;
      ROOT_CAUSE_ANALYSIS?: string;
      IMPACT_DESCRIPTION?: string;
      TARGET_DATE?: Date;
      AUDIT_PROGRAM?: string;
      PROCESS_OWNER?: string;
      AUDIT_STATUS?: string;
    };
    auditExecutionDetails?: {
      PROCEDURE_CHECKLIST?: string;
      FINDINGS?: string;
      INTERVIEW_SUMMARIES?: string;
      PROGRESS_NOTE?: string;
      EXECUTION_TITLE?: string;
      EVIDENCE_ATTACHMENT?: File;
      INTERVIEWS?: string;
    };
    auditReportDetails?: {
      DATA_REPORT?: string;
      RECOMMENDATION?: string;
      MANAGEMENT_RESPONSE?: string;
      REVIEWER_NOTE?: string;
      ROOT_CAUSE: string;
      IMPACT_IN_REPORTING?: string;
      ATTACH_FINAL_REPORT?: File;
    };
    auditReport?: {
      DETAIL_OBSERVATION?: string;
      ROOT_CAUSE?: string;
    };
  }

}