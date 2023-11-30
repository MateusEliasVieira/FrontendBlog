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
        // setStatus(0);
        // setResponse("");
        // setResponseError([]);

        // try {
        //     const response = await axios.post(ENDPOINT_NEW_USER, data);
        //     setResponse(response.data.message);
        //     setStatus(response.status);

        //     if (response.status === 200) {
        //         setLoading(false);
        //         setTimeout(() => window.location.href = "/", 5000);
        //     }
        // } catch (error: Error) {
        //     console.error(error);
        //     if (error.response) {
        //         setResponseError(error.response.data);
        //         setStatus(error.response.status);
        //     } else if (error.request) {
        //         setResponseError(["Erro de rede. Tente novamente mais tarde."]);
        //         setStatus(500);
        //     } else {
        //         setResponseError(["Ocorreu um erro inesperado. Tente novamente mais tarde."]);
        //         setStatus(500);
        //     }

        //     setLoading(false);
        // }
    };

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

            <div className="box-group-inputs">

                <div className="box-group-inputs-block-one">

                    <div className="box-group-input-p">
                        <MyInput
                            classGroup="box-label-input space-right"
                            textLabel="Nome *"
                            typeInput="text"
                            valueInput={data.name}
                            fun={(newValue) => { setData({ ...data, name: newValue }) }} />
                        <p className="p-error">Erros</p>
                    </div>

                    <div className="box-group-input-p">
                        <MyInput
                            classGroup="box-label-input"
                            textLabel="Email *"
                            typeInput="email"
                            valueInput={data.email}
                            fun={(newValue) => { setData({ ...data, email: newValue }) }} />
                        <p className="p-error">Erros</p>
                    </div>

                </div>

            </div>
            <div className="box-group-inputs-flex">
                <div className="box-group-input-p">
                    <MyInput
                        classGroup="box-label-input space-right"
                        textLabel="Nome de usuário *"
                        typeInput="text"
                        valueInput={data.username}
                        fun={(newValue) => { setData({ ...data, username: newValue }) }} />
                    <p className="p-error">Erros</p>
                </div>
                <div className="box-group-input-p">
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Senha *"
                        typeInput="password"
                        valueInput={data.password}
                        fun={(newValue) => { setData({ ...data, password: newValue }) }} />
                    <p className="p-error">Erros</p>
                </div>
            </div>
            <div className="box-group-input-p textarea">
                <MyTextArea
                    classGroup="mb-3"
                    textLabel="Sobre você *"
                    rows={5}
                    valueTextArea={data.about}
                    fun={(newValue) => { setData({ ...data, about: newValue }) }} />
                <p className="p-error">Erros</p>
            </div>
            <div className="box-group-input-p">
                <MyInput
                    classGroup="mb-3"
                    textLabel="Sua foto *"
                    typeInput="file"
                    valueInput=""
                    fun={(newValue) => { setData({ ...data, image: newValue }) }} />
                <p className="p-error">Erros</p>
            </div>

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
