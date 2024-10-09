import React, {useCallback, useEffect} from 'react'
import {Grid} from "@mui/material";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "../../store";
import {addTodoListTC, deleteTodolistTC, getTodolistTC, updateTitleTodolistTC} from "./todolist-reducer";
import {AddItemForm} from "../AddItem/AddItem";


export const TodoLists : React.FC= () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state=>state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])
    const removeTodolist = useCallback(function (id: string) {
        const thunk = deleteTodolistTC(id)
        dispatch(thunk)
    }, [])
    const updateTitleTodolist = useCallback(function (todolistId: string,title:string) {
        dispatch(updateTitleTodolistTC(todolistId,title))
        console.log(todolistId + title)
    }, [updateTitleTodolistTC])
    return <>
        <Grid container style={{padding: '20px'}}>
       <AddItemForm addItem={addTodoList} />
            </Grid>
       <Grid container spacing={3}>
            {todolists.map(el => {
                let allTodolistTasks = tasks[el.id]
                return <Grid item key={el.id}>
                        <Todolist updateTitleTodolist={updateTitleTodolist} removeTodolist={removeTodolist} title={el.title}  todolist={el} tasks={allTodolistTasks}/>
                </Grid>
            })
            }

        </Grid>
    </>
}