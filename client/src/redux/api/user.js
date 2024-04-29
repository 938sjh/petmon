import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080/api/users",
        credentials: 'include'
    }),
    tagTypes: ['Cart'],
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
            query:({id}) => ({
                 url: `/cart/${id}`,
                 method: 'GET'
            }),
            providesTags: ['Cart']
        }),
        addCart: builder.mutation({
            query: ({id}) => ({
                url: '/cart',
                method: 'POST',
                body: {id}
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
            invalidatesTags: ['Cart']
        })
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation, useLazyAuthUserQuery, useAddCartMutation, useRemoveCartMutation, useBuyMutation,  useGetCartQuery } = usersApi;

