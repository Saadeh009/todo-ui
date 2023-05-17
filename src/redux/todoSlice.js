import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk('/todos/getTodosAsync', async (payload) => {
    const res = await fetch(`http://localhost:3080/todo/${payload.userId}`, {
        headers: {
            authorization: "Bearer " + payload.accessToken
        }
    })
    if (res.ok) {
        const data = await res.json()
        const response = data.data.todos
        console.log("TODOS:", response);
        return { response }
    }
})

export const addTodoAsync = createAsyncThunk('/todo/addTodoAsync', async (payload) => {
    const res = await fetch(`http://localhost:3080/todo/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + payload.accessToken
        },
        body: JSON.stringify({title: payload.title, userId: payload.userId})
    })
    if (res.ok) {
        const {data} = await res.json()
        return { data }
    }
})

export const completedTodoAsync = createAsyncThunk('/todo/completedTodoAsync', async (payload) => {
    const res = await fetch(`http://localhost:3080/todo/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + payload.accessToken
        },
        body: JSON.stringify({completed: payload.completed})
    })
    if (res.ok) {
        const {todo} = await res.json()
        return { todo }
    }
})
export const deleteTodoAsync = createAsyncThunk('todo/deleteTodoAsync', async (payload) => {
    const res = await fetch(`http://localhost:3080/todo/${payload.id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            authorization: "Bearer " + payload.accessToken
        }
    })
    if (res.ok) {
        const {todos} = await res.json()
        return { todos }
    }
} )
const todoSlice = createSlice({
    name: 'todos',
    initialState: [
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push({id: Date.now(), title: action.payload.title, completed: false})
        },
        toggleComplete: (state, action) => {
            for (let s of state) {
                if(s.id === action.payload.id) {
                    s.completed = !s.completed
                    return
                }
            }
        },
        deleteTodo: (state, action) => {
            return state.filter(s => s.id !== action.payload.id )
        }
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) =>{
            return action.payload?.response
        } ,
        [getTodosAsync.rejected]: (state, action) => "not authenticated",
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.data)
        },
        [completedTodoAsync.fulfilled]: (state, action) => {
            const todoCompleteIndex = state.findIndex((todo) => todo.id === action.payload.todo.id)
            state[todoCompleteIndex].completed = action.payload.todo.completed
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return action.payload.todos
        }
    }
})

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions

export default todoSlice.reducer