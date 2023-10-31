import React from "react";
import {Form} from "react-bootstrap";

interface Props{
    textLabel: string;
    classGroup: string;
    valueTextArea:string;
    rows:number;
    fun:(newValue: string) => void
}
const MyTextArea:React.FC<Props> = (props)=>{

    return(
        <Form.Group className={props.classGroup}>
            <Form.Label>{props.textLabel}</Form.Label>
            <Form.Control value={props.valueTextArea} as="textarea" rows={props.rows} onChange={(event)=>props.fun(event.target.value)}/>
        </Form.Group>
    )
}

export default MyTextArea;