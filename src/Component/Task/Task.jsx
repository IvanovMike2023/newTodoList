import React from "react";
import {Grid, IconButton, Paper, TextField} from "@mui/material";
import {deleteTodolistTC, TodolistDomainType} from "../TodoList/todolist-reducer";
import {AddItemForm} from "../AddItem/AddItem";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";

type TaskType ={
    title: string,
    todolist: TodolistDomainType
}
export const Task=React.memo(({...props}:TaskType)=>{
    const dispatch = useDispatch()
    const addTodoList=()=>{
}
const deleteTodoList=()=>{
    dispatch(deleteTodolistTC(props.todolist.id))
}
    return         <Grid item id={props.todolist.id}>
            <Paper style={{padding: '10px'}}>
               <Grid container>
                <h3>{props.title}</h3>
                <IconButton aria-label="delete">
                <DeleteIcon onClick={deleteTodoList} />
            </IconButton>
               </Grid>
                <AddItemForm addItem={addTodoList} />
            </Paper>
        </Grid>

})