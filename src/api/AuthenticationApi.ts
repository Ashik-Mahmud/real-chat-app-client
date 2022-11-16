/* create api for rtk query */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server_url } from "../config/config";

import Cookie from "universal-cookie";
const cookie = new Cookie();

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server_url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = cookie.get("user");
      if (token?.token) {
        headers.set("authorization", `Bearer ${token?.token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (id: string) => ({
        url: `/user/logout/${id}`,
        method: "GET",
      }),
    }),
    getMe: builder.query({
      query: () => "/user/me",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authenticationApi;
