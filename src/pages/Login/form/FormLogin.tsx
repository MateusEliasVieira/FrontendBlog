import React, {useEffect, useState} from "react";
import "./FormLogin.css"
import Alert from "../../../components/alerts/Alert.tsx";

const FormLogin:React.FC = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");

    useEffect(() => {
        localStorage.clear()
    }, []);

    const validate = () => {
        return username !== "" && password !== "";
    };

    const sendData = async ()=>{
        if(validate()){
            try{
                // Resolve()
                const response = await fetch(
                    "http://localhost:8080/login/enter", {
                        method:"POST",
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"username":username,"password":password})
                })
                const {idUser,token} = await response.json();
                console.log(token)
                localStorage.clear()
                localStorage.setItem("idUser",idUser);
                localStorage.setItem("token",token);
                window.location.href="/Feed"
            }catch (e) {
                // Reject()
                console.log(e)
                setMessage("Invalid login")
            }
        }else{
            setMessage("Fill in all fields!")
        }
    }
    return(
        <div className="form-login">
            {message != ""?<Alert typeAlert="alert alert-danger" message={message}/>:<h4>Hi User!</h4>}
            <input className="form form-control" type="text" placeholder="Username" onChange={event=>setUsername(event.target.value)}/>
            <input className="form form-control" type="password" placeholder="Password" onChange={event=>setPassword(event.target.value)}/>
            <button className="btn btn-outline-dark"
            onClick={(event)=>{
                event.preventDefault();sendData();
            }}>Enter</button>
            <a href="/create-account">Create account</a>
        </div>
    )
}

export  default FormLogin