import React from "react";
import {Form} from "react-bootstrap";

interface Props{
    typeInput: string;
    textLabel: string;
    classGroup: string;
    valueInput:string;
    fun:(newValue: string) => void
}
const MyInput:React.FC<Props> = (props)=>{

    return(
        <Form.Group className={props.classGroup}>
            <Form.Label>{props.textLabel}</Form.Label>
            <Form.Control type={props.typeInput} onChange={()=>props.fun(props.valueInput)}/>
        </Form.Group>
    )
}

export default MyInput;