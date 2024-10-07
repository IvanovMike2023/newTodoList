import react, {useCallback, useEffect, useState} from 'react'
import s from './TodoList.module.css'
import {Button, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";
import {Todolist} from "./Todolist";
import {APITodolist} from "../../api/api";
import {useAppDispatch, useAppSelector} from "../../store";
import {addTodoListTC, getTodolistTC, TodolistDomainType} from "./todolist-reducer";
import {useSelector, UseSelector} from "react-redux";
import {AddItemForm} from "../AddItem/AddItem";
import {getTaskTC, TasksStateType} from "../Task/task-reducer";
import React from "react";


export const TodoLists : React.FC= () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector((state) => state.todolists)
    const tasks = useAppSelector(state => state.tasks)

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
        dispatch(getTodolistTC())
    }, [dispatch])
    return <>
        <Grid container style={{padding: '20px'}}>
       <AddItemForm addItem={addTodoList} />
            </Grid>
       <Grid container spacing={3}>
            {todolists.map(el => {
                let allTodolistTasks = tasks[el.id]
                console.log(allTodolistTasks)
                return <Grid item key={el.id}>
                        <Todolist title={el.title}  todolist={el} tasks={allTodolistTasks}/>

                </Grid>
            })
            }

        </Grid>
    </>
}