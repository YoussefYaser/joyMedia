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
    })
})

export const { useSignUpMutation } = joyMediaApi;