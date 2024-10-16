import {APITodolist, TaskPriorities, TaskStatuses, TaskType} from "../../api/api";
import {Dispatch} from "redux";
import ex = CSS.ex;
import {AppRootStateType} from "../../store";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";

let initialState: TasksStateType = {}
const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {
        getTask: (state, action: PayloadAction<{ id: string, task: TaskType[] }>) => {
            state[action.payload.id]=action.payload.task
        },
        addTask: (state, action: PayloadAction<{ tasks: TaskType }>) => {
            //            return {...state,[actions.tasks.todoListId]:[actions.tasks,...state[actions.tasks.todoListId]]}
            const stateCurrentTask = state[action.payload.tasks.todoListId]
            stateCurrentTask.unshift(action.payload.tasks)
        },
        deleteTask: (state, action: PayloadAction<{todolistId: string, taskId: string }>) => {
            const stateCurrentTask = state[action.payload.todolistId]
            const index = stateCurrentTask.findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) stateCurrentTask.splice(index, 1)
        },
        updateTaskTitle: (state, action: PayloadAction<{todolistId: string, taskId: string, model: UpdateTaskType }>) => {
           const a = current(state)
            const stateCurrentTask = state[action.payload.todolistId]
            const b =a[action.payload.todolistId]
            console.log(b)
            const index = stateCurrentTask.findIndex(todo => todo.id === action.payload.taskId)
            const index2 = b.findIndex(todo => todo.id === action.payload.taskId)
            console.log(b[index2])
            if (index !== -1) stateCurrentTask[index] = {...stateCurrentTask[index],...action.payload.model}
        }
    }
})


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const getTaskTC = (todolistid: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.getTasks(todolistid).then(res => {
            dispatch(taskAction.getTask({id:todolistid,task: res.data.items}))
        })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.addTasks(todolistId, title).then(res => {
            dispatch(taskAction.addTask({tasks:res.data.data.item}))
        })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        APITodolist.deleteTasks(todolistId, taskId).then(res => {
            dispatch(taskAction.deleteTask({todolistId, taskId}))
        })
    }
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, model: UpdateTaskType) => {
    return (dispatch: Dispatch, getSatet: () => AppRootStateType) => {
        const state = getSatet().tasks[todolistId].find(f => f.id === taskId)
        if (!state) {
            return
        }
        const newtask: UpdateTaskType = {
            description: state.description,
            title: state.title,
            status: state.status,
            priority: state.priority,
            startDate: state.startDate,
            deadline: state.deadline,
            ...model
        }
        APITodolist.updateTasksTitle(todolistId, taskId, newtask).then(res => {
            dispatch(taskAction.updateTaskTitle({todolistId, taskId, model}))
        })
    }
}


export type UpdateTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const taskReducer = slice.reducer
export const taskAction = slice.actions