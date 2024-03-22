import { createApi } from "@reduxjs/toolkit/query/react";
import { resHeaderquery } from "./clientApiSlice";
import {
  GetPermissionByIdRes,
  GetPermissionReq,
  GetPermissionResponse,
  GetPolicyByIdReq,
  PermissionRequest,
  PermissionResponse,
  UpdatePolicyReq,
  UpdatePolicyResponse,
} from "../interface/Permission";
import { ErrorResponse } from "../interface/ClientInterface";

export const PermissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: resHeaderquery,
  endpoints: (builder) => ({
    createPermission: builder.mutation<PermissionResponse, PermissionRequest>({
      query: (body) => ({
        url: "permission/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: PermissionResponse) => response,
      transformErrorResponse: (response: ErrorResponse) => response,
    }),
    getPermission: builder.mutation<GetPermissionResponse, GetPermissionReq>({
      query: (body) => ({
        url: "client/read-permissions",
        method: "POST",
        body,
      }),
      transformResponse: (response: GetPermissionResponse) => response,
      transformErrorResponse: (response: ErrorResponse) => response,
    }),
    getPermissionByPermissionId: builder.mutation<
      GetPermissionByIdRes,
      GetPolicyByIdReq
    >({
      query: (body) => ({
        url: "permission/get",
        method: "POST",
        body,
      }),
      transformResponse: (response: GetPermissionByIdRes) => response,
      transformErrorResponse: (response: ErrorResponse) => response,
    }),
    updatePermission: builder.mutation<UpdatePolicyResponse, UpdatePolicyReq>({
      query: (body) => ({
        url: "permission/update",
        method: "POST",
        body,
      }),
      transformResponse: (response: UpdatePolicyResponse) => response,
      transformErrorResponse: (response: ErrorResponse) => response,
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionMutation,
  useGetPermissionByPermissionIdMutation,
  useUpdatePermissionMutation,
} = PermissionApi;
