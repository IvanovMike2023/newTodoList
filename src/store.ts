// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {todolistReducer} from "./Component/TodoList/todolist-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";

import thunkMiddleware,{ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "./Component/Task/task-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})
// непосредственно создаём store
export const store = configureStore({ reducer: rootReducer })
//export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
//export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
