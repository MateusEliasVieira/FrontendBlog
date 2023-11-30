import React, { useState } from 'react';
import axios from 'axios';
import { HTTP_STATUS_OK } from '../../global/HTTP_STATUS';
import { ENDPOINT_RECOVER_ACCOUNT } from '../../global/URLs';
import "./RecoverAccount.css";

const RecoverAccount: React.FC = () => {
    const [email, setEmail] = useState("")
    const [textButton, setTextButton] = useState("Enviar")
    const [loading, setLoading] = useState(false)

    const send = () => {
        if (email) {
            setTextButton("Enviando email...")
            setLoading(true)
            axios.get(ENDPOINT_RECOVER_ACCOUNT + email)
                .then((response) => {
                    if (response.status === HTTP_STATUS_OK) {
                        console.log(response)
                        setTextButton("Enviar")
                        setLoading(false)
                        alert(response?.data?.message) // operador de coalescência nula (?.)
                        setEmail("")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setTextButton("Enviar")
                    setLoading(false)
                    alert(error.response?.data?.title)
                })
        } else {
            alert("Informe o email!")
        }
    }
    return (

        <section id="section-recover-account">
            <div className="form-recover">
                <h5>Recuperar minha conta!</h5>
                <input className="form form-control" type="email" value={email} placeholder="Email" onChange={event => setEmail(event.target.value)} />
                <button className="btn btn-primary" type="button" disabled={loading ? true : false} onClick={() => { send() }} >
                    {loading ? (<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>) : null}
                    {textButton}
                </button>
            </div>
        </section>
    )
}

export default RecoverAccount;