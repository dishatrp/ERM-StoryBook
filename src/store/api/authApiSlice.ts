
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginData, ResponseData } from "../interface/LoginInterface";
import { RootState } from "../store";


interface UserCheckRequest {
  username: string;
  password: string;
}

interface LoginRequest {
  custId: number;
}

interface Response {
  status: number;
  data: LoginData;
}



const authBasequery = fetchBaseQuery({
  //baseUrl: `${config.BASE_URL}/${config.AUTH_URL}`,
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_URL}`,
  prepareHeaders: (headers, { getState }) => {
    //headers.set("x-source-token", `${config.AUTH_TOKEN}`);
    headers.set("x-source-token", `${process.env.NEXT_PUBLIC_AUTH_TOKEN}`);

    // Use the RootState type to type the state
    const state = getState() as RootState;
    const accessToken = state.auth.accesstoken;
    //console.log("accessToken", accessToken);

    if (accessToken?.value) {
      headers.set("Authorization", `${accessToken?.type} ${accessToken?.value}`);
    }
    headers.set("Access-Control-Allow-Origin", "*");

    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBasequery,
  endpoints: (builder) => ({
    userCheck: builder.mutation<ResponseData, UserCheckRequest>({
      query: (body) => ({
        url: "user/check",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: ResponseData }) => response.data,
      transformErrorResponse: (response: Response) => response.data,
    }),
    login: builder.mutation<LoginData, LoginRequest>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: LoginData) => response,
      transformErrorResponse: (response: Response) => response.data,
    }),
  }),
});

export const { useUserCheckMutation, useLoginMutation } = authApi;
