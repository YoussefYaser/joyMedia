import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { joyMediaApi } from './RTK Query/joyMediaApi';
import { userDetailsSliceReducer } from './slices/userDetailsSlice';

export const store = configureStore({
    reducer: {
        [joyMediaApi.reducerPath]: joyMediaApi.reducer,
        userDetails : userDetailsSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(joyMediaApi.middleware),
})

setupListeners(store.dispatch);