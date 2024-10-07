import {APITodolist, TodolistType} from "../../api/api";
import {Dispatch} from "redux";


let initialState: Array<TodolistDomainType> = []
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, actions: ActionsType) => {
    switch (actions.type) {
        case 'SET-TODOLIST':
            return actions.todolist.map(tl => ({...tl})) //actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'ADD-TODOLIST':
            return [...state, {...actions.todolist}]//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'DELETE-TODOLIST':
            return [...state,state.filter(fl=>fl.id!=actions.id)]//[...state, {...actions.todolist}]//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}
export const setTodolist = (todolist: TodolistType[]) => ({type: 'SET-TODOLIST', todolist} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const deleteTodolist = (id: string) => ({type: 'DELETE-TODOLIST', id} as const)
export const setTodolistTC = () => {
    return (dispatch: Dispatch) => {
        APITodolist.getTodoList().then(res => {
            dispatch(setTodolist(res.data))
        })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.setTodoList(title).then(res => {
            console.log(res)
            addTodolist(res.data.data.item)
        })
    }
}
export const deleteTodolistTC=(id:string)=>{
    return (dispatch: Dispatch)=>{
APITodolist.deleteTodoList(id).then(res=>{
    deleteTodolist(id)
})
    }

}
type ActionsType =
    | ReturnType<typeof setTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof deleteTodolist>
export type TodolistDomainType = TodolistType