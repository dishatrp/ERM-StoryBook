// Fetching template data
export interface Phase {
  ID: string;
  NAME: string;
  TYPE: string;
  PARENT_ID: string;
  DATA_TYPE: null | string;
  INPUT_FIELD: null | string;
  PLACE_HOLDER: null | string;
  CREATED_AT: string;
  UPDATED_AT: string;
  children?: Phase[];
}
export interface PhaseListResponse {
  status: boolean;
  data: {
    phaseList: Phase[];
  };
  message: string;
  errors: any[];
}

export interface FormattedPhase extends Phase {
  ID: string;
  NAME: string;
  TYPE: string;
  PARENT_ID: string;
  DATA_TYPE: null | string;
  INPUT_FIELD: null | string;
  PLACE_HOLDER: null | string;
  CREATED_AT: string;
  UPDATED_AT: string;
  children?: FormattedPhase[];
  checked: boolean;
}

// Create template
export interface Template {
  templateId?: number;
  templateData: TemplateDataItem[];
}

export interface TemplateDataItem {
  phaseId: number;
}

export interface TemplateCreationResponse {
  status: boolean;
  data: any;
  message: string;
  errors: string[];
}

interface getTemplate {
  ID: string;
  NAME: string;
}

interface TemplateResponseData {
  data: getTemplate[];
}

export interface TemplateResponse {
  status: boolean;
  data: TemplateResponseData;
  message: string;
  errors: any[]; // Assuming errors can be of any type, adjust as necessary
}

export interface ControlDetail {
  ID: string;
  FUNCTION: string;
  PROCESS_ID: string;
  SUB_PROCESS_ID: string;
  FILE_ID: string;
  SOP_AVAILABLE: string;
  RISK_EVENT_REFERENCE: string;
  RISK_DESCRIPTION: string;
  RISK_CASUAL_FACTORS: string;
  RISK_CATEGORY: string;
  ROOT_CAUSE: string;
  RISK_IMPACT_DESCRIPTION: string;
  RISK_DATA_SOURCE: string;
  REF_DESCRIPTION: string | null;
  RISK_LIKELIHOOD: string;
  RISK_IMPACT: string;
  COMBINED_RISK_ASSESSMENT: string;
  RISK_OWNER: string;
  CONTROL_REF: string;
  CONTROL: string | null;
  CONTROL_DESCRIPTION: string | null;
  CONTROL_FREQUENCY: string | null;
  CONTROL_TYPE: string | null;
  CONTROL_CATEGORY: string | null;
  CONTROL_CLASSIFICATION: string | null;
  CONTROL_DESIGN_EFFECTIVENESS: string | null;
  CONTROL_OPERATIVE_EFFECTIVENESS: string | null;
  CONTROL_OWNER: string;
  RESIDUAL_RISK: string | null;
  REMARKS: string | null;
  ACTION_REQUIRED: string | null;
  ACTION_PLAN_REFEERNCE: string | null;
  ACTION_PLAN_ITEM: string | null;
  TARGET_DATE: string | null;
  STATUS: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  CREATED_BY: string;
  UPDATED_BY: string | null;
}

export interface ControlDetailsResponse {
  status: boolean;
  data: {
    controlDetails: ControlDetail[];
  };
  message: string;
  errors: any[];
}
export interface RiskItem {
  RISK_IDENTITY_ID: number;
  RISK_ID: number;
}

export interface RiskData {
  items: RiskItem[];
}
