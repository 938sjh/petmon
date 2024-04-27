import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080/api/users",
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: ({ email, password, userName, phoneNum}) => ({
                url: '/signup',
                method: 'POST',
                body: { email, password, userName, phoneNum }
            })
        }),
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password }
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        authUser: builder.query({
            query: () => ({
                url: '/auth',
                method: 'GET'
            })
        }),
        addCart: builder.mutation({
            query: ({id}) => ({
                url: '/addCart',
                method: 'POST',
                body: {id}
            })
        }),
        removeCart: builder.mutation({
            query: ({id}) => ({
                url: `/removeCart/${id}`,
                method: 'GET'
            })
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation, useLazyAuthUserQuery, useAddCartMutation, useRemoveCartMutation } = usersApi;

