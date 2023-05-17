import { createSlice } from "@reduxjs/toolkit";

const accessTokenSlice = createSlice({
    name: 'token',
    initialState: "",
    reducers: {
        addToken: (state, action) => {
            return action.payload
        }
    }
})

export const { addToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer