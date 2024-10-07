import react, {useCallback, useEffect, useState} from 'react'
import s from './TodoList.module.css'
import {Button, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";
import {Task} from "../Task/Task";
import {APITodolist} from "../../api/api";
import {useAppDispatch} from "../../store";
import {addTodoListTC, setTodolistTC} from "./todolist-reducer";
import {useSelector, UseSelector} from "react-redux";
import {AddItemForm} from "../AddItem/AddItem";


export const TodoList = () => {

    const dispatch = useAppDispatch()
    const todolists = useSelector((state) => state.todolists)
    useEffect(() => {
        dispatch(setTodolistTC())
    }, [])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
        dispatch(setTodolistTC())
    }, [dispatch])


    return <>
        <Grid container style={{padding: '20px'}}>
       <AddItemForm addItem={addTodoList} />
            </Grid>
       <Grid container spacing={3}>
            {todolists.map(el => {
                return <Grid item key={el.id}>
                        <Task title={el.title} todolist={el}/>

                </Grid>
            })
            }

        </Grid>
    </>
}