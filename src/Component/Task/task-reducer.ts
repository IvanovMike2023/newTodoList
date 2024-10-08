import {APITodolist, TaskType} from "../../api/api";
import {Dispatch} from "redux";
import {addTask, addTodolist, deleteTodolist, getTodolist} from "../TodoList/todolist-reducer";
import ex = CSS.ex;


let initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, actions: ActionsType):TasksStateType => {
    switch (actions.type) {
        case 'GET-TASK':
            return {...state,[actions.id]:actions.task}//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'ADD-TODOLIST':
            return {...state, [actions.todolist.id]: []}
        case 'DELETE-TODOLIST':
            const copyState = {...state}
            delete copyState[actions.id]
            return copyState
        case 'GET-TODOLIST': {
            const copyState = {...state}
            actions.todolist.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'ADD-TASK':{
            let r = actions.tasks

            return {...state,[actions.tasks.todoListId]:[actions.tasks,...state[actions.tasks.todoListId]]}
        }
        case 'DELETE-TASK':{
            console.log(state[actions.todolistId].filter(el=>el.id!==actions.taskId))
            return {...state,[actions.todolistId]:state[actions.todolistId].filter(el=>el.id!==actions.taskId)}
        }
        default:
            return state
    }
}

export const getTask = (id: string,task:TaskType[]) => ({type: 'GET-TASK', id,task} as const)
export const addTaskAC = (tasks:TaskType) => ({type: 'ADD-TASK',tasks} as const)
export const deleteTaskAC = (todolistId:string,taskId:string) => ({type: 'DELETE-TASK',todolistId,taskId} as const)
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const getTaskTC=(todolistid:string)=>{
    return (dispatch: ThunkDispatch)=>{
        APITodolist.getTasks(todolistid).then(res=>{
            dispatch(getTask(todolistid,res.data.items))
        })
    }
}
export const addTaskTC=(todolistId:string,title:string)=>{
    return (dispatch: Dispatch)=>{
APITodolist.addTasks(todolistId,title).then(res=>{
    dispatch(addTaskAC(res.data.data.item))
})
    }
}
export const deleteTaskTC=(todolistId:string,taskId:string)=>{
    return (dispatch:Dispatch)=>{
        APITodolist.deleteTasks(todolistId,taskId).then(res=>{
            dispatch(deleteTaskAC(todolistId,taskId))
        })
    }
}
type ActionsType =
    | ReturnType<typeof getTask>
    | ReturnType<typeof getTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>

type ThunkDispatch = Dispatch<ActionsType >
