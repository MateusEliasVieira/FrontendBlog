import React from "react"
import {BsCupHotFill} from "react-icons/bs";
import "./FormRegister.css"
import MyInput from "../../../components/myinput/MyInput.tsx";
import MyTextArea from "../../../components/mytextarea/MyTextArea.tsx";

const FormRegister:React.FC = () => {
    return(
         <div className="form-create-account">
                <legend>Welcome user</legend>
                <div className="box-group-inputs-flex">
                    <MyInput
                        classGroup="box-label-input space-right"
                        textLabel="Name *"
                        typeInput="text"
                        valueInput=""
                        fun={()=>{}}/>
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Email"
                        typeInput="email"
                        valueInput=""
                        fun={()=>{}}/>
                </div>
                <div className="box-group-inputs-flex">
                    <MyInput
                        classGroup="box-label-input space-right"
                        textLabel="Username *"
                        typeInput="text"
                        valueInput=""
                        fun={()=>{}}/>
                    <MyInput
                        classGroup="box-label-input"
                        textLabel="Password *"
                        typeInput="password"
                        valueInput=""
                        fun={()=>{}}/>
                </div>
                 <MyTextArea
                     classGroup="mb-3"
                     textLabel="About"
                     rows={5}
                     valueTextArea=""
                     fun={()=>{}}
                 />
                <MyInput
                    classGroup="mb-3"
                    textLabel="Your photo"
                    typeInput="file"
                    valueInput=""
                    fun={()=>{}}/>
                <button className="btn btn-dark">Register <BsCupHotFill/></button>
                <a href="/">Sign-in</a>
         </div>
    )
}

export default FormRegister
