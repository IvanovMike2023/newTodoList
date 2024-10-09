import React, {ChangeEvent, ChangeEventHandler, MouseEvent, useEffect, useState} from "react";
import {Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import {deleteTodolistTC, TodolistDomainType, updateTitleTodoList, updateTitleTodolistTC} from "./todolist-reducer";
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
    updateTitleTodolist: (todolistId: string,title:string) => void
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
        dispatch(getTaskTC(props.todolist.id))
    }
    const onActiveClickHandler = () => {
        dispatch(getTaskTC(props.todolist.id))
    }
    const onAllClickHandler = () => {
        dispatch(getTaskTC(props.todolist.id))
    }
    const setTitleTodo = () => {
        setEditableSpan(false)
    }
    const onChangeTitleTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value)
        //dispatch(updateTitleTodolistTC(props.todolist.id,e.target.value))
    }
    const CloseSetTitle = () => {
        setEditableSpan(true)
        dispatch(updateTitleTodolistTC(props.todolist.id,value))

       // props.updateTitleTodolist(props.todolist.id,value)

    }

    let tasksForTodolist = props.tasks
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
            {tasksForTodolist.map(el => <Task key={el.id} todolistId={el.todoListId} item={el}/>)}
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