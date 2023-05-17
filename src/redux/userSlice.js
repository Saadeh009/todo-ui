import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUsersAsync = createAsyncThunk('/users/getUsersAsync', async () => {
    const res = await fetch('http://localhost:3080/users')
    if (res.ok) {
        const data = await res.json()
        return { data }
    }
})
export const loginUserAsync = createAsyncThunk('/users/loginUserAsync', async (payload) => {
    const res = await fetch('http://localhost:3080/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: payload.email, password: payload.password})
    })
    if (res.ok) {
        const user = await res.json()
        return { user }
    } else {
        return "user not found"
    }
})

export const addUserAsync = createAsyncThunk('/users/addUserAsync', async (payload) => {
    const res = await fetch('http://localhost:3080/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: payload.email, password: payload.password})
    })
    if (res.ok) {
        const user = await res.json()
        return { user }
    } else {
        return false
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState: [
    ],
    reducers: {
        addUser: (state, action) => {
            state.push({id: Date.now(), email: action.payload.email, password: action.payload.email})
        }
    },
    extraReducers: {
        [loginUserAsync.fulfilled]: (state, action) => {
            if (action.payload) {
                const {id, email, password} = action.payload.user
                if(!state.find(s => s.id === id)) state.push({id, email, password})
            }
        },
        [addUserAsync.fulfilled]: (state, action) => {
            if (action.payload) {
                const {id, email, password} = action.payload.user
                state.push({id, email, password})
            }
        },
    }
})

export const { addUser } = userSlice.actions

export default userSlice.reducer