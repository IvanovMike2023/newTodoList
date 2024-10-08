import React, {useEffect} from "react";
import {Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import {deleteTodolistTC, TodolistDomainType} from "./todolist-reducer";
import {AddItemForm} from "../AddItem/AddItem";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, getTaskTC, TasksStateType} from "../Task/task-reducer";
import {Task} from "../Task/Task";
import {useAppDispatch} from "../../store";
import {TaskType} from "../../api/api";

type TodolistType = {
    tasks: TaskType[],
    title: string,
    todolist: TodolistDomainType,
    removeTodolist: (id: string) => void
}
export const Todolist = React.memo(function({...props}: TodolistType)  {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTaskTC(props.todolist.id))
    }, [])
    //console.log(props.todolist.id)
    const addTodoList = (e:any) => {
        dispatch(addTaskTC(props.todolist.id,e))
    }
    const deleteTodoList = () => {
        props.removeTodolist(props.todolist.id)
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
            {tasksForTodolist.map(el=><Task key={el.id} todolistId={el.todoListId} item={el}/>)}
            {/*<Task item={tasksForTodolist}  todolistId={props.todolist.id} />*/}
            <div>

            {/*{tasksForTodolist.map(el=>*/}
            {/*    <Task key={el.id} title={el.title}/>*/}
            {/*)}*/}
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                {/*variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}*/}
                <Button
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </Paper>
    </Grid>

})