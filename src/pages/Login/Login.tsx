import React from "react";
import "./Login.css"
import FormLogin from "./form/FormLogin.tsx";

const Login:React.FC = () => {
    return(
        <section id="section-login">
            <FormLogin/>
        </section>
    )
}

export  default Login