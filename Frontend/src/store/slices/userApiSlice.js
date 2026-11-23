import { apiSlice } from "./apiSlice";

const USER_ENDPOINT = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/logout`,
        method: "POST",
      }),
    }),
    registerAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfileAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    forgetPasswordAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/forgetPassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordAPI: builder.mutation({
      query: ({ password, token }) => ({
        url: `${USER_ENDPOINT}/resetPassword/${token}`,
        method: "PUT",
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginAPIMutation,
  useLogoutAPIMutation,
  useRegisterAPIMutation,
  useUpdateProfileAPIMutation,
  useForgetPasswordAPIMutation,
  useResetPasswordAPIMutation,
} = userApiSlice;
