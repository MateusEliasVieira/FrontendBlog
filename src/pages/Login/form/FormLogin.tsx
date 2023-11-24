import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./FormLogin.css"
import Alert from "../../../components/alerts/Alert.tsx";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ENDPOINT_LOGIN, ENDPOINT_LOGIN_GOOGLE } from "../../../global/URLs.ts";
import axios from "axios";

const FormLogin: React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        localStorage.clear()
    }, []);

    const validate = () => {
        return username !== "" && password !== "";
    };

    const sendData = () => {
        if (validate()) {
            // Resolve()
            axios.post(ENDPOINT_LOGIN, { "username": username, "password": password })
                .then((response) => {
                    const idUser = response.data.idUser
                    const token = response.data.token
                    if (idUser && token) {
                        localStorage.clear()
                        localStorage.setItem("idUser", idUser);
                        localStorage.setItem("token", token);
                        window.location.href = "/Feed"
                    } else { console.log("Empty token of the request login!") }
                })
                .catch((error) => {
                    console.log(error)
                    setMessage(error.response.data.message)
                })
        } else {
            setMessage("Fill in all fields!")
        }
    }
    return (
        <div className="form-login">
            {message != "" ? <Alert typeAlert="alert alert-danger" message={message} /> : <h4>Hi User!</h4>}
            <input className="form form-control" type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} />
            <input className="form form-control" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
            <button className="btn btn-outline-dark"
                onClick={(event) => {
                    event.preventDefault(); sendData();
                }}>Enter</button>
            <div id="box-button-login-google">
                <GoogleOAuthProvider
                    clientId="35562681448-pvo40n919fgpra4o5sr96p7re3t0vlrp.apps.googleusercontent.com">
                    <GoogleLogin size="large" width={320}
                        onSuccess={credentialResponse => {
                            if (credentialResponse.credential != null) {
                                var decoded = jwt_decode(credentialResponse.credential)
                                const { email_verified, email, sub, name, picture } = decoded as {
                                    email_verified: boolean;
                                    email: string;
                                    sub: string;
                                    name: string;
                                    picture: string;
                                };
                                if (email_verified) {
                                    const axiosInstance = axios.create({
                                        headers: {
                                            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Define o cabeçalho de autenticação com o token},
                                        }
                                    });
                                    axiosInstance.post(ENDPOINT_LOGIN_GOOGLE, {
                                        name: name,
                                        email: email,
                                        username: name,
                                        password: sub,
                                        about: "Empty about",
                                        photo: picture,
                                    })
                                        .then((response) => {
                                            localStorage.setItem("idUser", response.data.idUser);
                                            localStorage.setItem("token", response.data.token)
                                            window.location.href = "/feed"
                                        })
                                        .catch((err) => {
                                            console.log(err.response)
                                        })
                                } else {
                                    console.log("não validado")
                                }
                                //console.log(decoded);
                            }
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </GoogleOAuthProvider>
            </div>
            <div id="div-links">
                <a href="/create-account">Create account</a>
                <a href="/recover-account">Forgot my password</a>
            </div>

        </div>
    )
}

export default FormLogin