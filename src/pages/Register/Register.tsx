import React from "react";
import "./Register.css"
import {Button, Form} from "react-bootstrap";
import {BsCupHotFill} from "react-icons/bs";
const Login:React.FC = () => {
    return(
        <section className="section-login">
            <Form className="form-login">
                <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button variant="dark">Register <BsCupHotFill/></Button>
                <a href="#">Sign-in</a>
            </Form>
        </section>
    )
}


export  default Login