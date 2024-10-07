import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { joyMediaApi } from './RTK Query/joyMediaApi';

export const store = configureStore({
    reducer: {
        [joyMediaApi.reducerPath]: joyMediaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(joyMediaApi.middleware),
})

setupListeners(store.dispatch);