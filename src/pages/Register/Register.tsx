import React from "react";
import "./Register.css"
import FormRegister from "./form/FormRegister.tsx";

const Login:React.FC = () => {
    return(
        <section className="section-login">
            <FormRegister/>
        </section>
    )
}


export  default Login