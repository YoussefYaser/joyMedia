import { createSlice } from '@reduxjs/toolkit'

const user = {
    name : '',
    dateOfBirth : '',
    gender : '',
    photo : ''
}

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState : user,
    reducers: {
        changeDetails: (state, actions) => { 
            const payload = Object.keys(actions.payload);
            
            for(let i=0; i<payload.length; i++){
                state[payload[i]] = actions.payload[payload[i]];
            }
        },
    },
})

export const { changeDetails } = userDetailsSlice.actions;

export  const userDetailsSliceReducer = userDetailsSlice.reducer;