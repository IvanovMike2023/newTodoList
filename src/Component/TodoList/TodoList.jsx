import react, {useCallback, useEffect, useState} from 'react'
import s from './TodoList.module.css'
import {Button, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";
import {Task} from "../Task/Task";
import {APITodolist} from "../../api/api";
import {useAppDispatch} from "../../store";
import {addTodoListTC, setTodolistTC} from "./todolist-reducer";
import {useSelector, UseSelector} from "react-redux";


export const TodoList = () => {
    let [title, settitle] = useState('')
const dispatch = useAppDispatch()
    const todolists= useSelector((state)=>state.todolists)
    useEffect(() => {
        dispatch(setTodolistTC())
    }, [])
    const addTodoList = useCallback((title:string)=>{
dispatch(addTodoListTC(title))
    },[dispatch])
    const addTodoListHandler=()=>{
        addTodoList(title)
    }
    const onChangeHandler = (e) => {
        settitle(e.target.value)
    }
    return <>
            <Grid container style={{padding: '20px'}} >
                <Paper style={{padding: '10px'}}>
            <TextField id="outlined-basic" label="Outlined" onChange={onChangeHandler} variant="outlined"
                       value={title}/>
            <Button onClick={addTodoListHandler} variant="contained">Contained</Button>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => {
                    return <Grid item key={el.id}>
                        <Paper style={{padding: '10px'}}>
                            <Task title={el.title} todolist={el}/>
                        </Paper>
                    </Grid>
                })
                }

            </Grid>
    </>
}