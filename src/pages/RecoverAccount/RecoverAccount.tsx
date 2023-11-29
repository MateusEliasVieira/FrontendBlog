import React, { useState } from 'react';
import axios from 'axios';
import { HTTP_STATUS_OK } from '../../global/HTTP_STATUS';
import { ENDPOINT_RECOVER_ACCOUNT } from '../../global/URLs';
import "./RecoverAccount.css";

const RecoverAccount: React.FC = () => {
    const [email, setEmail] = useState("")
    const [textButton, setTextButton] = useState("Submit")
    const [loading, setLoading] = useState(false)

    const send = () => {
        setTextButton("Sending...")
        setLoading(true)
        axios.get(ENDPOINT_RECOVER_ACCOUNT + email)
            .then((response) => {
                if (response.status === HTTP_STATUS_OK) {
                    console.log(response)
                    setTextButton("Submit")
                    setLoading(false)
                    alert(response?.data)
                }
            })
            .catch((error) => {
                console.log(error)
                setTextButton("Submit")
                setLoading(false)
                alert(error.response?.data)
            })
    }
    return (

        <section id="section-recover-account">
            <div className="form-recover">
                <h5>Recover your account</h5>
                <input className="form form-control" type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} />
                <button className="btn btn-primary" type="button" onClick={() => { send() }} >
                    {loading ? (<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>) : null}
                    {textButton}
                </button>
            </div>
        </section>
    )
}

export default RecoverAccount;