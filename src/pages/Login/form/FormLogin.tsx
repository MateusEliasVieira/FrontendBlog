import React from "react";
import "./FormLogin.css"
import {Button, Form} from "react-bootstrap";
import MyInput from "../../../components/myinput/MyInput.tsx"
const FormLogin:React.FC = () => {
    return(
        <Form className="form-login">
            <MyInput classGroup="mb-3" typeInput="text" textLabel="Username"/>
            <MyInput classGroup="mb-3" typeInput="password" textLabel="Password"/>
            <Button variant="outline-dark">Enter</Button>
            <a href="#">Create account</a>
        </Form>
    )
}

export  default FormLogin