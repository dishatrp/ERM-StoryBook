export interface AccessToken {
  type: "Bearer";
  value: string;
  expiresIn: string;
}

interface RefreshToken {
  value: string;
  expiresIn: string;
}

export interface Page {
  pageMst_ID: string;
  pageMst_ITEM: string;
  pageMst_SLUG: string;
  pageMst_ACTION_URL: string | null;
  pageMst_HIERARCHY: string;
  pageMst_IS_ACTIVE: "Y";
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
  ICON: string | null;
  children?: Page[];
}

interface Client {
  IRM_CUST_GBL_MST_CUST_ID: string;
  IRM_CUST_GBL_MST_CUST_LEGAL_ENTITY_NAME: string;
}

export interface ResponseData {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  client: Client[];
  userName: string;
  policies?: Page[];
}

export interface LoginData {
  status: boolean;
  data: ResponseData;
  message: string;
  errors: any[]; // Use a more specific type instead of 'any' if you know the exact structure of the errors
}
