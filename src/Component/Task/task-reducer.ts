import {APITodolist, TaskType} from "../../api/api";
import {Dispatch} from "redux";


let initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, actions: ActionsType):TasksStateType => {
    switch (actions.type) {
        case 'GET-TASK':
            return {...state,[actions.id]:actions.task}//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // case 'GET-TASK': return {...state, [action.todolistId]: action.tasks}
        //     return //actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // case 'ADD-TODOLIST':
        //     return [...state, {...actions.todolist}]//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // case 'ADD-TASK':
        //     return //[...state,state.map(el=>el.id===actions.id? {...el,actions.title} | el)]//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // case 'DELETE-TODOLIST':
        //     return [...state,state.filter(fl=>fl.id!=actions.id)]//[...state, {...actions.todolist}]//actions.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

export const getTask = (id: string,task:TaskType[]) => ({type: 'GET-TASK', id,task} as const)
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const getTaskTC=(todolistid:string)=>{
    return (dispatch: ThunkDispatch)=>{
        APITodolist.getTasks(todolistid).then(res=>{
            dispatch(getTask(todolistid,res.data.items))
           // console.log(res)
        })
    }
}
type ActionsType =
    | ReturnType<typeof getTask>
type ThunkDispatch = Dispatch<ActionsType >
