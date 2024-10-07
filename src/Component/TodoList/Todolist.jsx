import React, {useEffect} from "react";
import {Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import {deleteTodolistTC, TodolistDomainType} from "./todolist-reducer";
import {AddItemForm} from "../AddItem/AddItem";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {getTaskTC} from "../Task/task-reducer";
import {Task} from "../Task/Task";
import {useAppDispatch} from "../../store";

type TaskType = {
    tasks: TaskType,
    title: string,
    todolist: TodolistDomainType
}
export const Todolist = React.memo(({...props}: TaskType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskTC(props.todolist.id))
    }, [])
    //console.log(props.tasks)

    const addTodoList = (e) => {
        console.log(e)
    }
    const deleteTodoList = () => {
        dispatch(deleteTodolistTC(props.todolist.id))
    }
    const onCompletedClickHandler = () => {
        dispatch(getTaskTC(props.todolist.id))
    }
    const onActiveClickHandler = () => {
        dispatch(getTaskTC(props.todolist.id))
    }
    const onAllClickHandler = () => {
        dispatch(getTaskTC(props.todolist.id))
    }
    let tasksForTodolist = props.tasks
    return <Grid item id={props.todolist.id}>
        <Paper style={{padding: '10px'}}>
            <Grid container>
                <h3>{props.title}</h3>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={deleteTodoList}/>
                </IconButton>

            </Grid>
            <AddItemForm addItem={addTodoList}/>
            <Task />
            <div>

            {/*{tasksForTodolist.map(el=>*/}
            {/*    <Task key={el.id} title={el.title}/>*/}
            {/*)}*/}
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </Paper>
    </Grid>

})