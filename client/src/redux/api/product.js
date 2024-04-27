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
                url: '/upload',
                method: 'POST',
                body: dataToSubmit
            }),
            invalidatesTags: ['Product','NewProduct']
        }),
        getAllProducts: builder.query({
            query: ({ page = 1}) => ({
                url: `all?page=${page}`,
                method: 'GET'
            }),
            providesTags: ['Product'],               
        }),
        getPopularProducts: builder.query({
            query: () => ({
                url: `Popular`,
                method: 'GET'
            }),
            providesTags: ['PopularProduct'],               
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `new`,
                method: 'GET'
            }),
            providesTags: ['NewProduct'],               
        }),
        getCategoryProducts: builder.query({
            query: ({ page = 1, category}) => ({
                url: `category?page=${page}&category=${category}`,
                method: 'GET'
            }),
            providesTags: ['Product'],               
        }),
        getDetailProduct: builder.query({
            query: ({id}) => ({
                url: `detail/${id}`,
                method: 'GET'
            })
        }),
        getCart: builder.query({
            query:(cartItems) => ({
                 url: `cart/?id=${cartItems}`,
                 method: 'GET'
            })
        })

    }),
});

export const { useUploadImageMutation, useUploadProductMutation, useGetAllProductsQuery, useGetNewProductsQuery, useGetPopularProductsQuery, useGetCategoryProductsQuery, useGetDetailProductQuery, useLazyGetCartQuery } = productApi;