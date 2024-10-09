import {APITodolist, TodolistType} from "../../api/api";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, actions: ActionsType): Array<TodolistDomainType> => {
    switch (actions.type) {
        case 'GET-TODOLIST':
            return actions.todolist.map(tl => ({...tl}))
        case 'ADD-TODOLIST':
            return [...state, {...actions.todolist}]
        case 'DELETE-TODOLIST':
            return state.filter(fl => fl.id !== actions.id)
        case 'SET-TODOLIST-TITLE':
            return state.map(el => el.id === actions.todolistId ? {...el, title: actions.title} : el)
        default:
            return state
    }
}
export const getTodolist = (todolist: TodolistType[]) => ({type: 'GET-TODOLIST', todolist} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const addTask = (id: string, title: string) => ({type: 'ADD-TASK', title, id} as const)
export const deleteTodolist = (id: string) => ({type: 'DELETE-TODOLIST', id} as const)
export const updateTitleTodoList = (todolistId: string, title: string) => ({
    type: 'SET-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const getTodolistTC = () => {
    return (dispatch: ThunkDispatch) => {
        APITodolist.getTodoList().then(res => {
            dispatch(getTodolist(res.data))
        })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        APITodolist.setTodoList(title).then(res => {
            dispatch(addTodolist(res.data.data.item))
        })
    }
}
export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.deleteTodoList(id).then(res => {
            dispatch(deleteTodolist(id))
        })
    }
}
export const updateTitleTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.updateTitleTodoList(todolistId, title).then(res => {
            dispatch(updateTitleTodoList(todolistId, title))
        })
    }
}

type ActionsType =
    | ReturnType<typeof getTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTitleTodoList>

export type TodolistDomainType = TodolistType

type ThunkDispatch = Dispatch<ActionsType>
