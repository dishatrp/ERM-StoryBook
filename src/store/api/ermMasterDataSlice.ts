import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/config";
import { url } from "inspector";
import {
  CommonResponse,
  CreateProcessData,
  DeleteOrgNode,
  ExcelFile,
  FileHistoryRequest,
  FileHistoryResponse,
  OrgStructure,
  OrgStructuresResponse,
  PostOrgStructureData,
  Process,
  ProcessData,
  ProcessList,
  UpdateOrgStructureData,
  deleteProcessData,
} from "../interface/ermMasterinterfcae";

export const ermMasterData = createApi({
  reducerPath: "ermMasterData",
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
    uploadControls: builder.mutation<CommonResponse, FormData>({
      query: (body) => {
        return {
          url: "/master-data/save-control",
          method: "POST",
          body,
        };
      },
    }),
    uploadRiskRegister: builder.mutation<CommonResponse, FormData>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-register",
          method: "POST",
          body,
        };
      },
    }),
    saveOrgStructure: builder.mutation<any, PostOrgStructureData>({
      query: (body) => {
        return {
          url: "/master-data/save-org-structures",
          method: "POST",
          body,
        };
      },
    }),
    updateOrgStructure: builder.mutation<any, UpdateOrgStructureData>({
      query: (body) => {
        return {
          url: "/master-data/update-org-structure",
          method: "POST",
          body,
        };
      },
    }),
    deleteOrgNode: builder.mutation<any, DeleteOrgNode>({
      query: (body) => {
        return {
          url: "master-data/delete-org-structure",
          method: "POST",
          body,
        };
      },
    }),
    updateProcessAndSubprocess: builder.mutation<any, ProcessData>({
      query: (body) => {
        return {
          url: "master-data/update-ProcessSubProcess",
          method: "POST",
          body,
        };
      },
    }),
    createProcessAndSubProcess: builder.mutation<any, CreateProcessData>({
      query: (body) => {
        return {
          url: "master-data/save-process-subprocess-tree",
          method: "POST",
          body,
        };
      },
    }),
    deleteProcessOrSubProcess: builder.mutation<any, deleteProcessData>({
      query: (body) => {
        return {
          url: "master-data/delete-Process-structure",
          method: "POST",
          body,
        };
      },
    }),
    fetchOrgStructure: builder.query<OrgStructure, void>({
      query: () => {
        return {
          url: "/master-data/view-org-structures",
        };
      },
      transformResponse: (res: OrgStructuresResponse) => {
        return res.data.OrgStructuresList[0];
      },
    }),

    fetchProcessLIst: builder.query<Process[], void>({
      query: () => {
        return {
          url: "/master-data/view-process-subprocess-tree",
        };
      },
      transformResponse: (res: ProcessList) => {
        return res.data;
      },
    }),
    fetchUploadHistory: builder.mutation<ExcelFile[], FileHistoryRequest>({
      query: (body) => {
        return {
          url: "/master-data/excel-list",
          method: "POST",
          body,
        };
      },
      transformResponse: (res: FileHistoryResponse) => {
        return res.data.excelList;
      },
    }),
  }),
});

export const {
  useUploadControlsMutation,
  useUploadRiskRegisterMutation,
  useFetchOrgStructureQuery,
  useSaveOrgStructureMutation,
  useUpdateOrgStructureMutation,
  useDeleteOrgNodeMutation,
  useFetchProcessLIstQuery,
  useUpdateProcessAndSubprocessMutation,
  useFetchUploadHistoryMutation,
  useCreateProcessAndSubProcessMutation,
  useDeleteProcessOrSubProcessMutation
} = ermMasterData;
