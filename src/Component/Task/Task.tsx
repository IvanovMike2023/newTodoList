import React, {ChangeEvent, useState} from "react";
import {TaskStatuses, TaskType} from "../../api/api";
import {Checkbox, Grid, IconButton, Paper, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../store";
import {deleteTaskTC, updateTaskTitleTC} from "./task-reducer";
import {updateTitleTodolistTC} from "../TodoList/todolist-reducer";


type ForTaskType = {
    item: TaskType,
    todolistId: string
}
export const Task = React.memo(function ({...props}: ForTaskType) {
    let [EditableSpan, setEditableSpan] = useState(true)
    let [value, setvalue] = useState(props.item.title)

    const dispatch = useAppDispatch()
    const deleteTask = (e: any) => {
        dispatch(deleteTaskTC(props.todolistId, props.item.id))
    }

    const setTitleTodo = () => {
        setEditableSpan(false)
    }
    const onChangeTitleTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value)
    }
    const CloseSetTitle = () => {
        setEditableSpan(true)
        dispatch(updateTaskTitleTC(props.todolistId, props.item.id, {title: value}))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskTitleTC(props.todolistId, props.item.id, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}))
    };
    return <>
        <Grid container>
            <Checkbox  checked={props.item.status===TaskStatuses.Completed} onChange={handleChange} />
            {EditableSpan ? <h3 onDoubleClick={setTitleTodo}>{props.item.title}</h3> :
                <TextField onBlur={CloseSetTitle} value={value} onChange={onChangeTitleTodo}></TextField>}
            <IconButton aria-label="delete">
                <DeleteIcon id={props.item.id} onClick={deleteTask}/>
            </IconButton>
        </Grid>

    </>

})