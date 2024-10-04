import React from "react";
import {Grid, Paper, TextField} from "@mui/material";
import {TodolistDomainType} from "../TodoList/todolist-reducer";
type TaskType ={
    title: string,
    todolist: TodolistDomainType
}
export const Task=React.memo(({...props}:TaskType)=>{

    //console.log(props)
    return         <Grid item >
            <Paper style={{padding: '10px'}}>
        <TextField id="outlined-basic" label="Outlined"  variant="outlined" value={props.title} />
            </Paper>
        </Grid>

})