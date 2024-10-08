import React from "react";
import {TaskType} from "../../api/api";
import {Grid, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../store";
import {deleteTaskTC} from "./task-reducer";


type ForTaskType ={
    item:TaskType,
    todolistId:string
}
export const Task= React.memo(function({...props}: ForTaskType) {
const dispatch=useAppDispatch()
    const deleteTask=(e:any)=>{
    dispatch(deleteTaskTC(props.todolistId,props.item.id))
    }
    return <>
             <Grid container>
           <h3>{props.item.title}</h3>
           <IconButton aria-label="delete">
               <DeleteIcon id={props.item.id}  onClick={deleteTask}/>
           </IconButton>

       </Grid>

    </>

})