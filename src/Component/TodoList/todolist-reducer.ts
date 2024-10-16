import {APITodolist, TodolistType} from "../../api/api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        getTodolist: (state, action: PayloadAction<{ todolist: TodolistType[] }>) => {
            return action.payload.todolist.map(tl => ({...tl, filter: 'all'}))
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all'})
        },
        deleteTodolist: (state, action: PayloadAction<{ id: string }>) => {
           const index= state.findIndex(todo=>todo.id===action.payload.id)
            if(index!==-1) state.splice(index,1)
        },
        updateTitleTodoList: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
           const index= state.findIndex(todo=>todo.id===action.payload.todolistId)
            if(index!==-1) state[index].title=action.payload.title
        },
        changeFilterTodolis: (state, action: PayloadAction<{todolistId: string, filter: FilterValuesType }>) => {
           //            return state.map(el => el.id === actions.id ? {...el, filter: actions.filter} : el)
            const index= state.findIndex(todo=>todo.id===action.payload.todolistId)
            if(index!==-1) state[index].filter=action.payload.filter
        }
    }
})

const initialState: Array<TodolistDomainType> = []


export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        APITodolist.getTodoList().then(res => {
            dispatch(todolistAction.getTodolist({todolist: res.data}))
        })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.setTodoList(title).then(res => {
            dispatch(todolistAction.addTodolist({todolist:res.data.data.item}))
        })
    }
}
export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.deleteTodoList(id).then(res => {
            dispatch(todolistAction.deleteTodolist({id}))
        })
    }
}
export const updateTitleTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.updateTitleTodoList(todolistId, title).then(res => {
            dispatch(todolistAction.updateTitleTodoList({todolistId, title}))
        })
    }
}


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export const todolistReducer = slice.reducer
export const todolistAction = slice.actions