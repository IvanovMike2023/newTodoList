import react from "react";
import {Grid, Paper, TextField} from "@mui/material";
type TaskType ={
    title: string
}
export const Task=(props:TaskType)=>{

    //console.log(props)
    return         <Grid item >
            <Paper style={{padding: '10px'}}>
        <TextField id="outlined-basic" label="Outlined"  variant="outlined" value={props.title} />
            </Paper>
        </Grid>

}