import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/config";
import {
  Department,
  DepartmentDetailsResponse,
  DepartmentId,
  DepartmentResponse,
  FileItem,
  uploadedDependecies,
} from "../interface/ErmInterface";

export const ermApi = createApi({
  reducerPath: "ermApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ERM_BASE_URL,
    prepareHeaders(headers, api) {
      // const authToken = document.cookie;
      // const tokenValue = authToken.replace(/^authToken=/, "");
      const authToken = localStorage.getItem("authToken");
      const tokenValue = authToken !== null ? authToken.replace(/^authToken=/, "") : ""
      // const splitToken = newTok.split(";")[0]
      // const tokenValue = splitToken
      headers.set("x-source-token", `${config.AUTH_TOKEN}`);
      headers.set("Authorization", `Bearer ${tokenValue}`);
    },
  }),
  endpoints: (builder) => ({
    viewExcelFile: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "upload",
          method: "POST",
          body,
        };
      },
    }),

    fetchAllDepartmentData: builder.query<Department[], void>({
      query: () => {
        return {
          url: "department-list",
        };
      },
      transformResponse: (res: DepartmentResponse) => {
        return res.data.departmentDetails;
      },
    }),

    fetchDepartmentDetails: builder.mutation<DepartmentDetailsResponse, DepartmentId>({
      query: (depId) => {
        return {
          url: `single-risk`,
          method: "POST",
          body: depId,
        };
      },
      transformResponse: (res: DepartmentDetailsResponse) => {
        return res;
      },
    }),

    fetchUploadedDependencies: builder.query<FileItem[], void>({
      query: () => {
        return {
          url: "filename-list",
        };
      },
      transformResponse: (res: uploadedDependecies) => {
        return res.data.filelist;
      },
    }),
  }),
});

export const {
  useViewExcelFileMutation,
  useFetchAllDepartmentDataQuery,
  useFetchDepartmentDetailsMutation,
  useFetchUploadedDependenciesQuery,
} = ermApi;
