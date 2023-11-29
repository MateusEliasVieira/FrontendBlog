import React, { useEffect, useState } from "react"
import axios from "axios";
import Editor from "../../components/editor/Editor.tsx";
import "./NewPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import { ENDPOINT_FIND_USER, ENDPOINT_TEST_TOKEN_BY_REQUEST_CONTROLLER } from "../../global/URLs.ts";
import { HTTP_STATUS_ACCEPTED, HTTP_STATUS_FORBIDDEN } from "../../global/HTTP_STATUS.ts";
import { Link } from "react-router-dom";

const NewPost: React.FC = () => {

    const [tokenIsValid, setTokenIsValid] = useState(true)
    const [role, setRole] = useState("")

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            setTokenIsValid(false)
        } else {
            testValidationToken()
            if (tokenIsValid) {
                const axiosInstance = axios.create({
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Define o cabeçalho de autenticação com o token},
                    }
                });
                axiosInstance.get(`${ENDPOINT_FIND_USER}${localStorage.getItem("idUser")}`)
                    .then((response) => {
                        const data = response?.data;
                        setRole(data.role)
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        }

    }, []);

    const testValidationToken = () => {
        // Request for test of validation token
        const axiosInstance = axios.create({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`, // Define o cabeçalho de autenticação com o token},
            }
        });
        axiosInstance.get(ENDPOINT_TEST_TOKEN_BY_REQUEST_CONTROLLER)
            .then(async (response) => {
                let status = response?.status;
                if (status != HTTP_STATUS_ACCEPTED) {
                    setTokenIsValid(false)
                } else {
                    setTokenIsValid(true)
                }

            })
            .catch((err) => {
                let status = err.response?.status
                if (status == HTTP_STATUS_FORBIDDEN) {
                    setTokenIsValid(false)
                } else {
                    setTokenIsValid(true)
                }
            })

    }

    return (
        <section id="section-new-post">
            {tokenIsValid && role === "ROLE_ADMIN" ?
                (<MyNavbar /> && <Editor />)
                :
                (<h1 className="h1-token-expired">
                    {!tokenIsValid ? "Ops, session expired!" : ""}
                    {!tokenIsValid ? (<Link to={"/"}>Login</Link>) : null}</h1>)}
            <h1 className="h1-token-expired">{role == "ROLE_USER" ? "You do not have permission to access this page!" : ""}</h1>
        </section>
    )
}

export default NewPost;