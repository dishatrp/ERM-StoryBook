
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData } from "../interface/LoginInterface";
import {
  ApiResponseClient,
  ApiResponseSingleClient,
  ErrorResponse,
  ErrorResponseSingleClient,
  RequestNewClient,
  ResponseCLient,
  ResponseNewClient,
  UpdateClient,
  bodySingleClinet,
  updateClientRequest,
} from "../interface/ClientInterface";

export const resHeaderquery = fetchBaseQuery({
  //baseUrl: `${config.BASE_URL}/${config.COMMON_URL}`,
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_COMMON_URL}`,
  prepareHeaders(headers, api) {
    // const authToken = document.cookie;
    // const tokenValue = authToken.replace(/^authToken=/, "");
    const authToken = localStorage.getItem("authToken");
    const tokenValue = authToken !== null ? authToken.replace(/^authToken=/, "") : ""
    // const splitToken = newTok.split(";")[0]
    // const tokenValue = splitToken
    //headers.set("x-source-token", `${config.AUTH_TOKEN}`);
    headers.set("x-source-token", `${process.env.NEXT_PUBLIC_AUTH_TOKEN}`)
    headers.set("Authorization", `Bearer ${tokenValue}`);
  },
});

export const clientApi = createApi({
  reducerPath: "clientAPi",
  baseQuery: resHeaderquery,
  endpoints: (builder) => ({
    clientMetaData: builder.query<ResponseCLient, void>({
      query: () => ({
        url: "client/metadata",
        method: "GET",
      }),
      transformResponse: (response: { data: ResponseCLient }) => response.data,
    }),
    registerNewClient: builder.mutation<ResponseNewClient, RequestNewClient>({
      query: (body) => ({
        url: "client/save",
        method: "POST",
        body,
      }),
      transformResponse: (response: ResponseNewClient) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    getAllCustomerList: builder.query<ApiResponseClient, any>({
      query: () => ({
        url: "client/read-customers",
        method: "GET",
      }),
      transformResponse: (response: ApiResponseClient) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    readSingleClinet: builder.mutation<ApiResponseSingleClient, bodySingleClinet>({
      query: (body) => ({
        url: "client/read-client",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponseSingleClient) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    updateClient: builder.mutation<UpdateClient, updateClientRequest>({
      query: (body) => ({
        url: "client/update",
        method: "POST",
        body,
      }),
      transformResponse: (response: UpdateClient) => response,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
  }),
});

export const {
  useClientMetaDataQuery,
  useRegisterNewClientMutation,
  useGetAllCustomerListQuery,
  useReadSingleClinetMutation,
  useUpdateClientMutation,
} = clientApi;
