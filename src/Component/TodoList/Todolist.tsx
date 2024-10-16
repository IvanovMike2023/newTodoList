import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import {todolistAction, TodolistDomainType, updateTitleTodolistTC} from "./todolist-reducer";
import {AddItemForm} from "../AddItem/AddItem";
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskTC, getTaskTC} from "../Task/task-reducer";
import {Task} from "../Task/Task";
import {useAppDispatch} from "../../store";
import {TaskStatuses, TaskType} from "../../api/api";

type TodolistType = {
    tasks: TaskType[],
    title: string,
    todolist: TodolistDomainType,
    removeTodolist: (id: string) => void
    updateTitleTodolist: (todolistId: string, title: string) => void
}


export const Todolist = React.memo(function ({...props}: TodolistType) {
    const dispatch = useAppDispatch()
    let [EditableSpan, setEditableSpan] = useState(true)
    let [value, setvalue] = useState(props.todolist.title)

    useEffect(() => {
        dispatch(getTaskTC(props.todolist.id))
    }, [])
    const addTodoList = (e: any) => {
        dispatch(addTaskTC(props.todolist.id, e))
    }
    const deleteTodoList = () => {
        props.removeTodolist(props.todolist.id)
    }
    const onCompletedClickHandler = () => {
        dispatch(todolistAction.changeFilterTodolis({todolistId:props.todolist.id,filter: 'completed'}))
    }
    const onActiveClickHandler = () => {
        console.log(props.todolist.id)
        dispatch(todolistAction.changeFilterTodolis({todolistId:props.todolist.id,filter: 'active'}))
    }
    const onAllClickHandler = () => {
        console.log(props.todolist.id)

        dispatch(todolistAction.changeFilterTodolis({todolistId:props.todolist.id,filter: 'all'}))
    }
    const setTitleTodo = () => {
        setEditableSpan(false)
    }
    const onChangeTitleTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value)
    }
    const CloseSetTitle = () => {
        setEditableSpan(true)
        dispatch(updateTitleTodolistTC(props.todolist.id, value))
    }

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(fl => fl.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(fl => fl.status === TaskStatuses.Completed)
    }
    return <Grid item>
        <Paper style={{padding: '10px'}}>
            <Grid container>
                {EditableSpan ? <h3 id={props.todolist.id} onDoubleClick={setTitleTodo}>{props.title}</h3> :
                    <TextField onBlur={CloseSetTitle} value={value} onChange={onChangeTitleTodo}></TextField>
                }


                <IconButton aria-label="delete">
                    <DeleteIcon onClick={deleteTodoList}/>
                </IconButton>

            </Grid>
            <AddItemForm addItem={addTodoList}/>
            {tasksForTodolist?.map(el => <Task key={el.id} todolistId={el.todoListId} item={el}/>)}
            <div>
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