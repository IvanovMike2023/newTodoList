import axios, {AxiosResponse} from "axios";
import {UpdateTaskType} from "../Component/Task/task-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {'API-KEY': 'a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6'}
})
export const APITodolist = {
    getTodoList() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    setTodoList(title:string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title});
    },
    deleteTodoList(id:string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`);
    },
    updateTitleTodoList(todolistId:string,title:string) {
        return instance.put<TodolistType[]>(`/todo-lists/${todolistId}`, {title});
    },
    addTasks(todolistId:string,title:string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTasks(todolistId:string,taskid:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskid}`)
    },
    updateTasksTitle(todolistId: string, taskid: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskid}`,model)
    }
}
export type TodolistType={
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type ResponseDelete={
    resultCode: number
    messages: Array<string>
    data: {}
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse={
    items:TaskType []
    totalCount: number
    error:string
}
