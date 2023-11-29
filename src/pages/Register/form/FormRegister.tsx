import React, { useState } from "react"
import { BsCupHotFill } from "react-icons/bs";
import "./FormRegister.css"
import MyInput from "../../../components/myinput/MyInput.tsx";
import MyTextArea from "../../../components/mytextarea/MyTextArea.tsx";
import axios from "axios";
import Alert from "../../../components/alerts/Alert.tsx";
import { ENDPOINT_NEW_USER } from "../../../global/URLs.ts";

const FormRegister: React.FC = () => {

    const [status, setStatus] = useState(0)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [responseError, setResponseError] = useState([])
    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        about: "",
        image: "",
    });

    const sendMyData = () => {
        let count = 0;
        setStatus(0)
        setResponse("")
        Object.values(data).forEach((value) => {
            if (!value) {
                count += 1
            }
        });
        if (count === 0) {
            setLoading(true)
            axios.post(ENDPOINT_NEW_USER, data)
                .then((response) => {
                    setLoading(false)
                    setResponse(response?.data?.message)
                    setStatus(response?.status)

                    if (status === 200) {
                        setTimeout(() => { setStatus(0); window.location.href = "/" }, 5000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setResponseError(err?.response?.data)
                    setStatus(err?.response?.status)
                    setLoading(false)
                })
        } else {
            setStatus(400)
            setResponse("Informe todos os campos!")
        }

    }
    return (
        <div className="form-create-account">
            <legend>Bem Vindo</legend>
            {
                loading
                    ?
                    (
                        <div className={"box-loading"}>
                            <div className="spinner-grow" role="status">
                                <span className="sr-only"></span>
                            </div>
                            <p> Enviando email de confirmação... </p>
                        </div>

                    )
                    :
                    ""
            }

            {status === 200 ? setTimeout(() => {
                setStatus(0)
            }, 10000) && (<Alert typeAlert={"alert alert-success"} message={response} />) : ""}

            {status >= 400 ? setTimeout(() => {
                setStatus(0)
            }, 10000) && (<Alert typeAlert={"alert alert-danger"} message={responseError[0]} />) : ""}

            <div className="box-group-inputs-flex">
                <MyInput
                    classGroup="box-label-input space-right"
                    textLabel="Nome *"
                    typeInput="text"
                    valueInput={data.name}
                    fun={(newValue) => { setData({ ...data, name: newValue }) }} />
                <MyInput
                    classGroup="box-label-input"
                    textLabel="Email *"
                    typeInput="email"
                    valueInput={data.email}
                    fun={(newValue) => { setData({ ...data, email: newValue }) }} />
            </div>
            <div className="box-group-inputs-flex">
                <MyInput
                    classGroup="box-label-input space-right"
                    textLabel="Nome de usuário *"
                    typeInput="text"
                    valueInput={data.username}
                    fun={(newValue) => { setData({ ...data, username: newValue }) }} />
                <MyInput
                    classGroup="box-label-input"
                    textLabel="Senha *"
                    typeInput="password"
                    valueInput={data.password}
                    fun={(newValue) => { setData({ ...data, password: newValue }) }} />
            </div>
            <MyTextArea
                classGroup="mb-3"
                textLabel="Sobre você *"
                rows={5}
                valueTextArea={data.about}
                fun={(newValue) => { setData({ ...data, about: newValue }) }} />

            <MyInput
                classGroup="mb-3"
                textLabel="Sua foto *"
                typeInput="file"
                valueInput=""
                fun={(newValue) => { setData({ ...data, image: newValue }) }} />

            <button
                id="button-create-account"
                className="btn btn-dark"
                onClick={(event) => {
                    event.preventDefault()
                    sendMyData()
                }}>Criar minha conta <BsCupHotFill />
            </button>
            <a href="/">Login</a>
        </div>
    )
}

export default FormRegister;