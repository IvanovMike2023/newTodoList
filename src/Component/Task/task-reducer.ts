import {APITodolist, TaskPriorities, TaskStatuses, TaskType} from "../../api/api";
import {Dispatch} from "redux";
import {addTask, addTodolist, deleteTodolist, getTodolist} from "../TodoList/todolist-reducer";
import ex = CSS.ex;
import {AppRootStateType} from "../../store";


let initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, actions: ActionsType):TasksStateType => {
    switch (actions.type) {
        case 'GET-TASK':
            //console.log({...state,[actions.id]:actions.task})
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
            return {...state,[actions.todolistId]:state[actions.todolistId].filter(el=>el.id!==actions.taskId)}
        }
        case 'UPDATE-TASK-TITLE':{
            return {...state,[actions.todolistId]: state[actions.todolistId].map(el=>el.id===actions.taskId ? {...el,...actions.model}:el)}
        }
        default:
            return state
    }
}

export const getTask = (id: string,task:TaskType[]) => ({type: 'GET-TASK', id,task} as const)
export const addTaskAC = (tasks:TaskType) => ({type: 'ADD-TASK',tasks} as const)
export const deleteTaskAC = (todolistId:string,taskId:string) => ({type: 'DELETE-TASK',todolistId,taskId} as const)
export const updateTaskTitle = (todolistId:string,taskId:string,model:UpdateTaskType) => ({type: 'UPDATE-TASK-TITLE',todolistId,taskId,model} as const)
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
export const updateTaskTitleTC=(todolistId:string,taskId:string,model:UpdateTaskType)=>{
    return (dispatch : Dispatch,getSatet:()=>AppRootStateType)=>{
        const state = getSatet().tasks[todolistId].find(f=>f.id===taskId)
        if(!state){
            return
        }
        const newtask:UpdateTaskType={
            description: state.description,
            title: state.title,
            status: state.status,
            priority: state.priority,
            startDate: state.startDate,
            deadline: state.deadline,
            ...model
        }
        APITodolist.updateTasksTitle(todolistId,taskId,newtask).then(res=>{
            dispatch(updateTaskTitle(todolistId,taskId,model))
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
    | ReturnType<typeof updateTaskTitle>

export type UpdateTaskType={
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ThunkDispatch = Dispatch<ActionsType >

