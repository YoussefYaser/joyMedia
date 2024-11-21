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
            query: ({formData, headers}) => ({
                url: `https://linked-posts.routemisr.com/posts`,
                method: 'POST',
                body : formData,
                headers : headers
            }),
        }),
        changeProfileImage: builder.mutation({
            query: ({formData, headers}) => ({
                url: `https://linked-posts.routemisr.com/users/upload-photo`,
                method: 'PUT',
                body : formData,
                headers : headers,
            }),
        
        }),
        createComment: builder.mutation({
            query: ({body, headers}) => ({
                url: `https://linked-posts.routemisr.com/comments`,
                method: 'POST',
                body,
                headers,
            }),
        
        }),
    })
})

export const { useSignUpMutation, useSignInMutation, useCreatePostMutation, useChangeProfileImageMutation, useCreateCommentMutation } = joyMediaApi;