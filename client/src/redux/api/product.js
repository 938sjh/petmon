import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080/api/product",
        credentials: 'include'
    }),
    tagTypes: ['Product', 'NewProduct', 'PopularProduct'],
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: ( formData ) => ({
                url: '/image',
                method: 'POST',
                body: formData
            })
        }),
        uploadProduct: builder.mutation({
            query: (dataToSubmit) => ({
                url: '/',
                method: 'POST',
                body: dataToSubmit
            }),
            invalidatesTags: ['Product','NewProduct', 'PopularProduct']
        }),
        getAllProducts: builder.query({
            query: ({ page = 1, category, searchTerm}) => ({
                url: `/?page=${page}&category=${category}&searchTerm=${searchTerm}`,
                method: 'GET'
            }),
            providesTags: ['Product'],               
        }),
        getPopularProducts: builder.query({
            query: () => ({
                url: `/popular`,
                method: 'GET'
            }),
            providesTags: ['PopularProduct'],               
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `/new`,
                method: 'GET'
            }),
            providesTags: ['NewProduct'],               
        }),
        getDetailProduct: builder.query({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
    }),
});

export const { useUploadImageMutation, useUploadProductMutation, useGetAllProductsQuery, useGetNewProductsQuery, useGetPopularProductsQuery, useGetCategoryProductsQuery, useGetDetailProductQuery } = productApi;