import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todoSlice"
import userReducer from "./userSlice"
import tokenReducer from "./accessTokenSlice";
export const store = configureStore({
    reducer: {
        todos: todoReducer,
        users: userReducer,
        token: tokenReducer
    }
})