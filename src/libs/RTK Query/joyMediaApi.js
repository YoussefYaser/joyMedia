import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const joyMediaApi = createApi({
    reducerPath: 'jotMediaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://linked-posts.routemisr.com/' }),
    endpoints: (builder) => ({
        SignUp: builder.mutation({
            query: ({values}) => ({
                url: `https://linked-posts.routemisr.com/users/signup`,
                method: 'POST',
                body : values
            }),
        }),
        SignIn: builder.mutation({
            query: ({values}) => ({
                url: `https://linked-posts.routemisr.com/users/signin`,
                method: 'POST',
                body : values
            }),
        }),
        createPost: builder.mutation({
            query: ({body, headers}) => ({
                url: `https://linked-posts.routemisr.com/posts`,
                method: 'POST',
                body,
                headers
            }),
        }),
    })
})

export const { useSignUpMutation, useSignInMutation, useCreatePostMutation } = joyMediaApi;