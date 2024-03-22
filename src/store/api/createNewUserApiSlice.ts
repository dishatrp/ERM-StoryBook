import { createApi } from "@reduxjs/toolkit/query/react";
import { resHeaderquery } from "./clientApiSlice";
import {
  ApiResponse,
  ApiResponseClientUpdate,
  ApiResponsePermission,
  ApiResponseUSerDetails,
  ErrorResponse,
  ErrorResponseNoDataPermission,
  ResponseNewClient,
  User,
  UserDetailsBody,
  UserUpdateApiResponse,
  permissionDetailsBody,
} from "../interface/CreateNewUserInterfcae";
import { UpdateClient } from "../interface/ClientInterface";

export const createNewUserApi = createApi({
  reducerPath: "createNewUserApi",
  baseQuery: resHeaderquery,
  endpoints: (builder) => ({
    createNewUser: builder.mutation<ResponseNewClient, User>({
      query: (body) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: ResponseNewClient) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    totalUsers: builder.query<ApiResponse, any>({
      query: () => ({
        url: "user/all-user",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    editSingleUser: builder.mutation<ApiResponseUSerDetails, UserDetailsBody>({
      query: (body) => ({
        url: "user/details",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponseUSerDetails) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    updateUser: builder.mutation<ApiResponseClientUpdate, UserUpdateApiResponse>({
      query: (body) => ({
        url: "user/update",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponseClientUpdate) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    permissionName: builder.mutation<ApiResponsePermission, permissionDetailsBody>({
      query: (body) => ({
        url: "permission/read",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponsePermission) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useTotalUsersQuery,
  useEditSingleUserMutation,
  useUpdateUserMutation,
  usePermissionNameMutation,
} = createNewUserApi;
