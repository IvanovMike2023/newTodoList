// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {todolistReducer} from "./Component/TodoList/todolist-reducer";
import {AnyAction, combineReducers} from "redux";

import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "./Component/Task/task-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})
// непосредственно создаём store

export const store = configureStore({
    reducer: rootReducer

})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
