import React, {useEffect, useState} from "react";
import Alert from "../../components/alerts/Alert.tsx";
import axios from "axios";
import {ENDPOINT_CONFIRMATION_ACCOUNT_BY_TOKEN_FROM_EMAIL} from "../../global/URLs.ts";
import {Link} from "react-router-dom";

const ConfirmationAccount:React.FC = ()=>{

    const[status,setStatus]=useState(false)
    const[message,setMessage]=useState("")


    useEffect(() => {

        // Pega a parte da URL após o "?" (os parâmetros da URL)
        const paramsString = window.location.search;
        // Cria um objeto URLSearchParams a partir dos parâmetros da URL
        const searchParams = new URLSearchParams(paramsString);
        // Pega o valor do parâmetro "id"
        const token = searchParams.get('token');

        console.log("Endpoint = "+ENDPOINT_CONFIRMATION_ACCOUNT_BY_TOKEN_FROM_EMAIL+token)
        axios.get(ENDPOINT_CONFIRMATION_ACCOUNT_BY_TOKEN_FROM_EMAIL+token)
            .then((response)=>{
                console.log(response.data.message)
                setMessage(response.data.message)
                setStatus(true)
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error confirmation by email!")
                setStatus(false)
            })
    }, []);

    return(
        <div>
            <div className={status ? "alert alert-success" : "alert alert-danger"} style={{height:"100vh",margin:"0",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <p style={{margin:"0 10px"}}>{message}</p>
                <button style={{margin:"0"}} className={"btn btn-success"}><Link to={"/"} style={{color:"white",textDecoration:"none"}}>Login</Link></button>
            </div>
        </div>
    )
}

export default ConfirmationAccount;