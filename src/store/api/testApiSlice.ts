import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    createPermission: builder.query<any, any>({
      query: (body) => ({
        url: "posts",
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response.data,
    }),
  }),
});
