import react, {useEffect, useState} from 'react'
import s from './TodoList.module.css'
import {Button, Grid, Paper, TextField} from "@mui/material";
import axios from "axios";
import {Task} from "../Task/Task";
import {APITodolist} from "../../api/api";
import {useAppDispatch} from "../../store";
import {setTodolistTC} from "./todolist-reducer";
import {useSelector, UseSelector} from "react-redux";


export const TodoList = () => {
    let [title, settitle] = useState('')
    let [mas, setmas] = useState([])
const dispatch = useAppDispatch()
    const todolists= useSelector((state)=>state.todolists)
    useEffect(() => {
        dispatch(setTodolistTC())
    }, [])
    console.log(todolists)
    const addTodoList = (e) =>  APITodolist.setTodoList(e).then(res => {
        mas = res.data
        //setmas(mas)

        //console.log(res.data)
    })
    const onChangeHandler = (e) => {
        settitle(e.target.value)

    }
    return <>
            <Grid container style={{padding: '20px'}} >
                <Paper style={{padding: '10px'}}>
            <TextField id="outlined-basic" label="Outlined" onChange={onChangeHandler} variant="outlined"
                       value={title}/>
            <Button onClick={addTodoList} variant="contained">Contained</Button>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => {
                    return <Grid item key={el.id}>
                        <Paper style={{padding: '10px'}}>
                            <Task title={el.title} ds={false}/>
                        </Paper>
                    </Grid>
                })
                }

            </Grid>
    </>
}