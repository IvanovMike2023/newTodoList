import React from "react";

type TaskType = {
    title: string,

}
export const Task= React.memo(({...props}: TaskType) => {
    return <>
    <h3>{props.title}</h3>
    </>

})