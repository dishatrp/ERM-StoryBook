import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuditItem, GetTabledataInterface, ItemIds, fetchEditRes } from "../interface/ermAuditInterface";

export const ermAudit = createApi({
  reducerPath: 'ERMaudit',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ERM_BASE_URL,
    prepareHeaders(headers, api) {
      // const authToken = document.cookie;
      // const tokenValue = authToken.replace(/^authToken=/, "");
      // const newTok = authToken.replace(/^authToken=/, "")
      const authToken = localStorage.getItem("authToken");
      const tokenValue = authToken !== null ? authToken.replace(/^authToken=/, "") : ""
      // const splitToken = newTok.split(";")[0]
      // const tokenValue = splitToken
      headers.set("x-source-token", `${config.AUTH_TOKEN}`);
      headers.set("Authorization", `Bearer ${tokenValue}`);
    },
  }),
  endpoints: (builder) => ({
    fetchTableData: builder.query<AuditItem[], void>({
      query: () => {
        return {
          url: '/internal-audit/get-data-by-union',
          method: "GET",

        }
      },
      transformResponse: (res: GetTabledataInterface) => res.data
    }),
    fetchEditedData: builder.mutation<fetchEditRes, ItemIds>({
      query: (body) => {
        return {
          url: '/internal-audit/get-phase-tab-data',
          method: "POST",
          body
        }
      },
      transformResponse: (res: fetchEditRes) => res
    }),
  })
})

export const { useFetchTableDataQuery, useFetchEditedDataMutation } = ermAudit