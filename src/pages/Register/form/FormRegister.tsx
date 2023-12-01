import React, { useState } from "react"
import { BsCupHotFill } from "react-icons/bs";
import "./FormRegister.css"
import MyInput from "../../../components/myinput/MyInput.tsx";
import MyTextArea from "../../../components/mytextarea/MyTextArea.tsx";
import axios from "axios";
import Alert from "../../../components/alerts/Alert.tsx";
import { ENDPOINT_NEW_USER } from "../../../global/URLs.ts";

const FormRegister: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [aboutError, setAboutError] = useState("")
    const [imageError, setImageError] = useState("")
    const [arq, setArq] = useState<File | null>(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        about: "",
        image: ""
    });

    const clearErrors = () => {
        setNameError("");
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setAboutError("");
        setImageError("");
    };

    const isAnyFieldEmpty = () => {
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key].trim() === "") {
                return true; // Retorna true se encontrar algum campo vazio
            }
        }
        return false; // Retorna false se todos os campos estiverem preenchidos
    };

    const checkFieldWithProblem = (field: string, message: string) => {
        switch (field) {
            case "name":
                setNameError(message);
                break;
            case "email":
                setEmailError(message);
                break;
            case "username":
                setUsernameError(message);
                break;
            case "password":
                setPasswordError(message);
                break;
            case "about":
                setAboutError(message);
                break;
            case "image":
                setImageError(message);
                break;
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setArq(selectedFile);
    };

    const imageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const setImageConverted = async () => {
        if (arq instanceof File) {
            const base64Image = await imageToBase64(arq);
            setData({ ...data, image: base64Image });
        }
    }

    const sendMyData = async () => {
        await setImageConverted()
        if (!isAnyFieldEmpty()) {
            setLoading(true);
            axios.post(ENDPOINT_NEW_USER, data)
                .then((response) => {
                    clearErrors()
                    setLoading(false)
                    alert(response?.data?.message)
                    window.location.href = "/"
                })
                .catch((error) => {
                    setLoading(false)
                    clearErrors()
                    if (error?.response?.data?.list != undefined) {
                        if (error?.response?.data?.list.length > 0) {
                            error?.response?.data?.list.map((item: object) => {
                                checkFieldWithProblem(item?.nameField, item?.message)
                            })
                        }
                    }
                    alert(error?.response?.data?.title)
                })
        } else {
            alert("Informe todos os campos!")
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
                            <p> Aguarde um momento... </p>
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
                        <p className="p-error">{nameError}</p>
                    </div>

                    <div className="box-group-input-p">
                        <MyInput
                            classGroup="box-label-input"
                            textLabel="Email *"
                            typeInput="email"
                            valueInput={data.email}
                            fun={(newValue) => { setData({ ...data, email: newValue }) }} />
                        <p className="p-error">{emailError}</p>
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
                    <p className="p-error">{usernameError}</p>
                </div>
                <div className="box-group-input-p">
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Senha *"
                        typeInput="password"
                        valueInput={data.password}
                        fun={(newValue) => { setData({ ...data, password: newValue }) }} />
                    <p className="p-error">{passwordError}</p>
                </div>
            </div>
            <div className="box-group-input-p textarea">
                <MyTextArea
                    classGroup="mb-3"
                    textLabel="Sobre você *"
                    rows={5}
                    valueTextArea={data.about}
                    fun={(newValue) => { setData({ ...data, about: newValue }) }} />
                <p className="p-error">{aboutError}</p>
            </div>
            <div className="box-group-input-p">
                <label>Sua foto *</label>
                <input className="form-control" type="file" onChange={handleFileChange} />
                <p className="p-error">{imageError}</p>
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
