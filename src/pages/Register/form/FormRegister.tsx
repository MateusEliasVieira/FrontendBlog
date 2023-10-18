import React, {useState} from "react"
import {BsCupHotFill} from "react-icons/bs";
import "./FormRegister.css"
import MyInput from "../../../components/myinput/MyInput.tsx";
import MyTextArea from "../../../components/mytextarea/MyTextArea.tsx";
import axios from "axios";
import Alert from "../../../components/alerts/Alert.tsx";

const FormRegister:React.FC = () => {

    const[status,setStatus]=useState(0)
    const[loading,setLoading]=useState(false)
    const[response,setResponse]=useState("")
    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        about: "",
        photo: "",
    });

    const sendMyData = ()=>{
        let count = 0;
        setStatus(0)
        setResponse("")
        Object.values(data).forEach((value) => {
            if(!value){
                count += 1
            }
        });
        if(count === 0){
            setLoading(true)
            axios.post("http://localhost:8080/user/new",data)
                .then((response)=>{
                    setResponse(response.data.message)
                    setStatus(response.status)
                    setLoading(false)
                    setTimeout(()=>{ setStatus(0); window.location.href = "/" },5000)
                })
                .catch((err)=>{
                    console.log("Erro = "+err)
                    setResponse("Error registering new user!")
                    setLoading(false)
                })
            console.log("status http = "+status)
        }else{
            alert("Informe todos os campos")
        }

    }
    return(
         <div className="form-create-account">
                <legend>Welcome user</legend>
                {
                    loading
                        ?
                        (
                            <div className={"box-loading"}>
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only"></span>
                                </div>
                                <p>Sending confirmation email...</p>
                            </div>

                        )
                        :
                        ""
                }

             {status !== 0 ? (<Alert typeAlert={status === 200 ? "alert alert-success" : "alert alert-danger"} message={response}/>) : ""}

                <div className="box-group-inputs-flex">
                    <MyInput
                        classGroup="box-label-input space-right"
                        textLabel="Name *"
                        typeInput="text"
                        valueInput={data.name}
                        fun={(newValue)=>{setData({...data, name:newValue})}}/>
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Email"
                        typeInput="email"
                        valueInput={data.email}
                        fun={(newValue)=>{setData({...data, email:newValue})}}/>
                </div>
                <div className="box-group-inputs-flex">
                    <MyInput
                        classGroup="box-label-input space-right"
                        textLabel="Username *"
                        typeInput="text"
                        valueInput={data.username}
                        fun={(newValue)=>{setData({...data, username:newValue})}}/>
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Password *"
                        typeInput="password"
                        valueInput={data.password}
                        fun={(newValue)=>{setData({...data, password:newValue})}}/>
                </div>
                 <MyTextArea
                     classGroup="mb-3"
                     textLabel="About"
                     rows={5}
                     valueTextArea={data.about}
                     fun={(newValue)=>{setData({...data, about:newValue})}}/>

                <MyInput
                    classGroup="mb-3"
                    textLabel="Your photo"
                    typeInput="file"
                    valueInput=""
                    fun={(newValue)=>{setData({...data, photo:newValue})}}/>

             <button
                    className="btn btn-dark"
                    onClick={(event)=>
                    {
                        event.preventDefault()
                        sendMyData()
                    }}>Register <BsCupHotFill/>
                </button>
                <a href="/">Sign-in</a>
         </div>
    )
}

export default FormRegister
