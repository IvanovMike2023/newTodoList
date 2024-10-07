import {Button, Grid, IconButton, Paper, TextField} from "@mui/material";
import {useState} from "react";
import React from "react";
import { AddBox } from '@mui/icons-material';

type AddItemType = {
    addItem: (title)=>void
}
export const AddItemForm = React.memo(({addItem}: AddItemType) => {
    let [title, settitle] = useState('')
    const addTodoListHandler = () => {
        addItem(title)
    }
    const onChangeHandler = (e) => {
        settitle(e.target.value)
    }
    return <div>
            <TextField id="outlined-basic" label="Title" onChange={onChangeHandler} variant="outlined"
                       value={title}/>
        <IconButton color="primary" onClick={addTodoListHandler} >
        <AddBox/>
    </IconButton>
    </div>
})