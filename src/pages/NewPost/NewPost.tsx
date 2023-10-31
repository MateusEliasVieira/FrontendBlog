import React, {useEffect, useState} from "react"
import axios from "axios";
import Editor from "../../components/editor/Editor.tsx";
import "./NewPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import {ENDPOINT_TEST_TOKEN_BY_REQUEST_CONTROLLER} from "../../global/URLs.ts";
import {HTTP_STATUS_ACCEPTED, HTTP_STATUS_FORBIDDEN} from "../../global/HTTP_STATUS.ts";
import {Link} from "react-router-dom";

const NewPost:React.FC = ()=>{

    const[tokenIsValid,setTokenIsValid]=useState(true)

    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/";
        }else{
            testValidationToken()
        }
    }, []);

    const testValidationToken = ()=> {
        // Request for test of validation token
        const axiosInstance = axios.create({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`, // Define o cabeçalho de autenticação com o token},
            }
        });
        axiosInstance.get(ENDPOINT_TEST_TOKEN_BY_REQUEST_CONTROLLER)
            .then(async (response) => {
                    let status = response.status;
                    if (status != HTTP_STATUS_ACCEPTED) {
                        setTokenIsValid(false)
                    } else {
                        setTokenIsValid(true)
                    }
            })
            .catch((err)=>{
                    let status = err.response.status
                    if (status == HTTP_STATUS_FORBIDDEN) {
                        setTokenIsValid(false)
                    } else {
                        setTokenIsValid(true)
                    }
            })

    }

    return(
        <section id="section-new-post">
            <MyNavbar/>
            {tokenIsValid ? (<Editor/>) : (<h1 className="h1-token-expired">Ops, session expired! <Link to={"/"}>Login</Link> </h1>)}
        </section>
    )
}

export default NewPost;