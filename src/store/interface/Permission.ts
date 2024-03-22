interface Policy {
  ID: string;
  READOPS: string;
  CREATEOPS: string;
  UPDATEOPS: string;
  DELETEOPS: string;
}

export interface PermissionRequest {
  CUST_ID: number;
  POLICY_NAME: string;
  IS_ACTIVE: string;
  POLICY: Policy[];
}

export interface PermissionResponse {
  status: boolean;
  data: {
    permissionData: {
      CUST_ID: number;
      POLICY_NAME: string;
      IS_ACTIVE: string;
      CRD_USER_ID: string;
      CRD_USR_ID: string;
      UPD_USR_ID: string;
      ID: string;
      CRD_DATE: string;
      LAST_UPD_DATE: string;
    };
  };
  message: string;
  errors: any[];
}

export interface ErrorResponse {
  status: boolean;
  message: string;
  data: Record<string, never>;
  errors: string[];
}

export interface GetPermissionReq {
  clientId: number;
}

// interface GetPermissionPolicy {
//   ID: string;
//   ITEM: string;
//   SLUG: string;
//   ACTION_URL: string | null;
//   HIERARCHY: string;
//   IS_ACTIVE: string;
//   READOPS: string;
//   CREATEOPS: string;
//   UPDATEOPS: string;
//   DELETEOPS: string;
//   ICON: string | null;
//   children?: Policy[];
// }

interface GetPermissionPolicy {
  pageMst_ID: string;
  pageMst_ITEM: string;
  pageMst_SLUG: string;
  ACTION_URL: string | null;
  pageMst_HIERARCHY: string;
  pageMst_IS_ACTIVE: string;
  ICON: string | null;
  READOPS: string;
  CREATEOPS: string;
  UPDATEOPS: string;
  DELETEOPS: string;
  children?: GetPermissionPolicy[];
}

export interface GetPermissionResponse {
  status: boolean;
  data: {
    policies: GetPermissionPolicy[];
  };
  message: string;
  errors: any[];
}

export interface GetPolicyByIdReq {
  POLICY_ID: number;
}

interface Policys {
  pageMst_ID: string;
  pageMst_ITEM: string;
  pageMst_SLUG: string;
  pageMst_ACTION_URL: string | null;
  pageMst_HIERARCHY: string;
  pageMst_IS_ACTIVE: "Y" | "N";
  ID: string;
  POLICY_ID: string;
  ITEM_ID: string;
  READOPS: string;
  CREATEOPS: string;
  UPDATEOPS: string;
  DELETEOPS: string;
  CRD_DATE: string;
  LAST_UPD_DATE: string;
  CRD_USR_ID: string;
  UPD_USR_ID: string;
  children?: Policys[];
}

export interface GetPermissionByIdRes {
  status: boolean;
  data: {
    policy: Policys[];
  };
  message: string;
  errors: string[];
}

interface CustomerPolicy {
  ID: number;
  READOPS: string;
  CREATEOPS: string;
  UPDATEOPS: string;
  DELETEOPS: string;
}

export interface UpdatePolicyReq {
  CUST_ID: number;
  POLICY_ID: number;
  POLICY_NAME: string;
  IS_ACTIVE: string;
  POLICY: CustomerPolicy[];
}

interface UpdatePermissionData {
  CUST_ID: number;
  POLICY_NAME: string;
  IS_ACTIVE: string;
  CRD_USER_ID: string;
  CRD_USR_ID: string;
  UPD_USR_ID: string;
  ID: string;
  CRD_DATE: string; // Assuming it's a string representation of a date
  LAST_UPD_DATE: string; // Assuming it's a string representation of a date
}

export interface UpdatePolicyResponse {
  status: boolean;
  data: {
    permissionData: UpdatePermissionData;
  };
  message: string;
  errors: any[]; // You might want to replace this with a more specific type for errors
}
