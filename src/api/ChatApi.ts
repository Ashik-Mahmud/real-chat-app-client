/* chat api */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "universal-cookie";
import { server_url } from "../config/config";

const cookie = new Cookies();

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server_url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = cookie.get("user");
      if (token) {
        headers.set("authorization", `Bearer ${token?.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: "/chat/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    getChatByUser: builder.query({
      query: (search) => ({
        url: `/chat/user?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: () => "/messages",
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "/messages",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateChatMutation,
  useGetChatByUserQuery,
} = chatApi;
