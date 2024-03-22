import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/config";
import { ApiResponse, FormPhases } from "../interface/ErmPhases";


export const ermPhases = createApi({
  reducerPath: 'phasesApi',
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
    saveStepperdata: builder.mutation<ApiResponse, FormPhases>({
      query: (body) => {
        return {
          url: '/internal-audit/save-phase-data',
          method: "POST",
          body
        }
      },
      transformResponse: (res: ApiResponse) => res
    })
  })
})

export const { useSaveStepperdataMutation } = ermPhases