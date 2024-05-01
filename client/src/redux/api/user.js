import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080/api/users",
        credentials: 'include'
    }),
    tagTypes: ['Cart', 'Order'],
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: ({ email, password, userName, phoneNum}) => ({
                url: '/',
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
        getCart: builder.query({
            query:() => ({
                 url: `/cart`,
                 method: 'GET'
            }),
            providesTags: ['Cart']
        }),
        addCart: builder.mutation({
            query: ({id,quantity}) => ({
                url: '/cart',
                method: 'POST',
                body: {id, quantity}
            }),
            invalidatesTags: ['Cart']
        }),
        removeCart: builder.mutation({
            query: ({id}) => ({
                url: `/cart/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        buy: builder.mutation({
            query: () => ({
                url: '/payment',
                method: 'POST'
            }),
            invalidatesTags: ['Cart', 'Order']
        }),
        getOrder: builder.query({
            query:() => ({
                 url: '/order',
                 method: 'GET'
            }),
            providesTags: ['Order']
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation, useLazyAuthUserQuery, useAddCartMutation, useRemoveCartMutation, useBuyMutation,  useGetCartQuery, useGetOrderQuery } = usersApi;

