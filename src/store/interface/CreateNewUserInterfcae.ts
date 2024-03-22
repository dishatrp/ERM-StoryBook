export interface ResponseNewClient {
  status: boolean;
  data: Record<string, any>; // You can replace 'any' with a more specific type if needed
  message: string;
  errors: string[];
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

interface ClientWithPolicy {
  clientid: number;
  policyid: number;
}

interface Users {
  appUser_IRM_USER_ID: string;
  appUser_APP_USERNAME: string;
}

interface UserData {
  users: Users[];
}

export interface User {
  userFName: string;
  userLName: string;
  userEmail: string;
  userContactNumber: string;
  password: string;
  userName: string;
  clientId: string[] | undefined;
  clientwithpolicy: {
    clientId: string;
    policyId: string;
  }[];
  endDate: string;
}
export interface UserSchema {
  IRM_USER_ID: string;
  APP_USERNAME: string;
  USER_FNAME: string;
  USER_LNAME: string;
  USER_EMAIL: string;
  USER_CONTACT_NUM: string;
}

export interface ApiResponse {
  status: boolean;
  data: {
    users: UserSchema[];
  };
  message: string;
  errors: string[];
}

export interface UserDetails {
  userName: string;
  userFName: string;
  userLName: string;
  userEmail: string;
  userContactNumber: string;
  endDate: string;
  clientId: any[];
  clientwithpolicy: ClientWithPolicys[];
}

interface ClientWithPolicys {
  CUST_ID: string;
  POLICY_ID: string;
  POLICY_NAME: string;
}

export interface ApiResponseUSerDetails {
  status: boolean;
  data: {
    userDetails: UserDetails;
  };
  message: string;
  errors: any[]; // Change the type accordingly based on the actual data type
}

export interface UserDetailsBody {
  userId: string;
}

export interface permissionDetailsBody {
  CUST_ID: number;
}

interface PermissionData {
  ID: string;
  CUST_ID: string;
  POLICY_NAME: string;
}

export interface ApiResponsePermission {
  status: boolean;
  data: {
    permissionNameData: PermissionData[];
  };
  message: string;
  errors: string[];
}

export interface ErrorResponseNoDataPermission {
  status: false;
  data: {};
  message: string;
  errors: string[];
}

export interface UserUpdate {
  id: number | undefined;
  userName: string;
  userFName: string;
  userLName: string;
  userEmail: string;
  userContactNumber: string;
  clientId: number[];
  endDate: string; // You might want to use a Date type if working with dates in your application
  clientwithpolicy: ClientWithPolicy[];
}

interface ClientWithPolicy {
  CUST_ID: number;
  POLICY_ID: number;
}

export interface UserUpdateApiResponse {
  status: boolean;
  data: {
    userDetails: UserUpdate;
  };
  message: string;
  errors: string[];
}

interface CustomerData {
  CUST_ID: string;
  CUST_LEGAL_ENTITY_NAME: string;
}

export interface ApiResponseClientUpdate {
  status: boolean;
  data: {
    customers: CustomerData[];
  };
  message: string;
  errors: any[]; // You might want to replace 'any' with a more specific type for errors
}
