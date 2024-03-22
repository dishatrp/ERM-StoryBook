export interface Department {
  ID: string;
  USER_EMAIL: string;
  USER_FIRST_NAME: string;
  USER_LAST_NAME: string;
  USER_CONTACT_NUMBER: string;
  DEPARTMENT_NAME: string;
  RISK_CATEGORY: string;
  OWNER: string;
  RISK: string;
  KEY_RISK_DESCRIPTION: string;
  KEY_RISK_INDICATOR: string;
  INHERENT_IMPACT_RECEPTOR: string;
  INHERENT_IMPACT_VALUE: string;
  INHERENT_IMPACT_RATING: string;
  INHERENT_LIKELIHOOD_VALUE: string;
  INHERENT_LIKELIHOOD_RATING: string;
  INHERENT_SIGNIFICANCE_IMPACTLIKELIHOOD: string;
  INHERENT_RISK_RATING: string;
  CONTROL_NAME: string;
  EXISTING_CONTROL_DESCRIPTION: string;
  CONTROL_METHOD: string;
  ENFORCEMENT_TYPE: string;
  RESIDUAL_IMPACT_RECEPTOR: string;
  RESIDUAL_IMPACT_VALUE: string;
  RESIDUAL_IMPACT_RATING: string;
  RESIDUAL_LIKELIHOOD_VALUE: string;
  RESIDUAL_LIKELIHOOD_RATING: string;
  RESIDUAL_SIGNIFICANCE_IMPACTLIKELIHOOD: string;
  RESIDUAL_RISK_RATING: string;
  REMARK: string | null;
  EXCEL_FILE_ID: string;
  STATUS: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  CREATED_AT: string;
  UPDATED_AT: string;
}

export interface DepartmentResponse {
  status: boolean;
  data: {
    departmentDetails: Department[];
  };
  message: string;
  errors: any[];
}

export interface DepartmentDetails {
  ID: string;
  USER_EMAIL: string;
  USER_FIRST_NAME: string;
  USER_LAST_NAME: string;
  USER_CONTACT_NUMBER: string;
  DEPARTMENT_NAME: string;
  RISK_CATEGORY: string;
  OWNER: string;
  RISK: string;
  KEY_RISK_DESCRIPTION: string;
  KEY_RISK_INDICATOR: string;
  INHERENT_IMPACT_RECEPTOR: string;
  INHERENT_IMPACT_VALUE: string;
  INHERENT_IMPACT_RATING: string;
  INHERENT_LIKELIHOOD_VALUE: string;
  INHERENT_LIKELIHOOD_RATING: string;
  INHERENT_SIGNIFICANCE_IMPACTLIKELIHOOD: string;
  INHERENT_RISK_RATING: string;
  CONTROL_NAME: string;
  EXISTING_CONTROL_DESCRIPTION: string;
  CONTROL_METHOD: string;
  ENFORCEMENT_TYPE: string;
  RESIDUAL_IMPACT_RECEPTOR: string;
  RESIDUAL_IMPACT_VALUE: string;
  RESIDUAL_IMPACT_RATING: string;
  RESIDUAL_LIKELIHOOD_VALUE: string;
  RESIDUAL_LIKELIHOOD_RATING: string;
  RESIDUAL_SIGNIFICANCE_IMPACTLIKELIHOOD: string;
  RESIDUAL_RISK_RATING: string;
  REMARK: string;
  EXCEL_FILE_ID: string;
  STATUS: string;
  CREATED_BY: string;
  UPDATED_BY: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
}

export interface DepartmentDetailsResponse {
  status: boolean;
  data: {
    riskDetails: DepartmentDetails;
  };
  message: string;
  errors: any[];
}

export interface DepartmentId {
  ID: number;
}

// For uploaded files
export interface FileItem {
  ID: string;
  FILE_NAME: string;
  ORIGINAL_NAME: string;
  CREATED_AT: string;
}

export interface uploadedDependecies {
  status: boolean;
  data: {
    filelist: FileItem[];
  };
  message: string;
  errors: any[];
}
