import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/config";
import {
  ControlDetailsResponse,
  Phase,
  PhaseListResponse,
  RiskData,
  Template,
  TemplateCreationResponse,
  TemplateResponse,
} from "../interface/ErmNewInterface";
import { sortedPhases } from "@/components/erm/phaseSteppers/PhasesStepper";

export const ermNewApi = createApi({
  reducerPath: "ermNewApi",
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
    createTemplate: builder.mutation<TemplateCreationResponse, Template>({
      query: (body) => {
        return {
          url: "/internal-audit/create-templete",
          method: "POST",
          body,
        };
      },
    }),
    fetchPhases: builder.query<Phase[], void>({
      query: () => {
        return {
          url: "/internal-audit/phase-data",
        };
      },
      transformResponse: (res: PhaseListResponse) => {
        return res.data.phaseList;
      },
    }),
    fetchUserSelectedPhases: builder.mutation<Phase[], { templateId: number }>({
      query: (body) => {
        return {
          url: "/internal-audit/phase-data-by-templateId",
          method: "POST",
          body,
        };
      },
      transformResponse: (res: PhaseListResponse) => {
        return res.data.phaseList.sort((a: Phase, b: Phase) => {
          return sortedPhases.indexOf(a.NAME) - sortedPhases.indexOf(b.NAME);
        });
      },
    }),
    fetchTemplateData: builder.query<TemplateResponse, void>({
      query: () => {
        return {
          url: "/internal-audit/template-list",
          method: "GET",
        };
      },
    }),
    fetchAllUser: builder.query<any, void>({
      query: () => {
        return {
          url: "/user-master/all-users",
          method: "GET",
        };
      },
    }),
    createIdentity: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-identity",
          method: "POST",
          body,
        };
      },
    }),
    registerRiskManually: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-register-manually",
          method: "POST",
          body,
        };
      },
    }),
    fetchAllControl: builder.query<any, void>({
      query: () => {
        return {
          url: "/master-data/control-list",
          method: "GET",
        };
      },
    }),
    fetchAssess: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/view-risk-register-assess",
          method: "POST",
          body,
        };
      },
    }),
    fetchRiskByUploadID: builder.mutation<ControlDetailsResponse, void>({
      query: () => {
        return {
          url: "/master-data/all-Risk",
        };
      },
    }),
    createControl: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-implement",
          method: "POST",
          body,
        };
      },
    }),
    fetchAllEvidence: builder.query<any, void>({
      query: () => {
        return {
          url: "/master-data/view-risk-evidence",
          method: "GET",
        };
      },
    }),
    createEvidence: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-evidence",
          method: "POST",
          body,
        };
      },
    }),
    createMonitor: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-monitor",
          method: "POST",
          body,
        };
      },
    }),
    saveSelectedRisks: builder.mutation<any, RiskData>({
      query: (body) => {
        return {
          url: "/master-data/save-risk-assess",
          method: "POST",
          body,
        };
      },
    }),
    getAuditItems: builder.query<any, void>({
      query: () => {
        return {
          url: "/master-data/view-report",
        };
      },
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useFetchPhasesQuery,
  useFetchUserSelectedPhasesMutation,
  useFetchTemplateDataQuery,
  useFetchAllUserQuery,
  useCreateIdentityMutation,
  useRegisterRiskManuallyMutation,
  useFetchAllControlQuery,
  useFetchAssessMutation,
  useFetchRiskByUploadIDMutation,
  useCreateControlMutation,
  useFetchAllEvidenceQuery,
  useCreateEvidenceMutation,
  useCreateMonitorMutation,
  useSaveSelectedRisksMutation,
  useGetAuditItemsQuery,
} = ermNewApi;
