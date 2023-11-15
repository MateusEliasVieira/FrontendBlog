import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewPassword.css"
import { HTTP_STATUS_FORBIDDEN, HTTP_STATUS_OK } from "../../global/HTTP_STATUS";
import { ENDPOINT_NEW_PASSWORD } from "../../global/URLs";

const NewPassword: React.FC = () => {
    const [newpassword, setNewPassword] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        let token = window.location.href
        token = token.split("token=")[1]
        setToken(token)
    })

    const send = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json', // Indica que o conteúdo é JSON
                'Authorization': 'Bearer ' + token, // Cabeçalho de autorização
            }
        };
        axios.post(ENDPOINT_NEW_PASSWORD, { token: token, newpassword: newpassword }, config)
            .then((response) => {
                console.log(response.data)
                if (response.status === HTTP_STATUS_OK) {
                    alert(response.data)
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 5000)
                } else {
                    alert(response.data)
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === HTTP_STATUS_FORBIDDEN) {
                    alert("Password change timeout!")
                } else {
                    alert(error.response.data)
                }
            })
    }

    return (
        <section id="section-new-password">
            <div className="form-new-password">
                <h5>Set new password</h5>
                <input className="form form-control" type="password" placeholder="New password" onChange={(event) => { setNewPassword(event.target.value) }} />
                <button onClick={() => { send() }} className="btn btn-outline-dark">Save</button>
            </div>
        </section>
    )
}

export default NewPassword;