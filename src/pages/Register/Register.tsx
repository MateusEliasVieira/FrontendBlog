import React from "react";
import "./Register.css"
import {BsCupHotFill} from "react-icons/bs";
const Login:React.FC = () => {
    return(
        <section className="section-login">
            <div className="form-create-account">
                <legend>Welcome user</legend>
                <div className="box-group-inputs-flex">
                    <div className="box-label-input space-right">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="box-label-input">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"/>
                    </div>
                </div>
                <div className="box-group-inputs-flex">
                    <div className="box-label-input space-right">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="box-label-input">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">About</label>
                    <textarea rows={5} className="form-control"></textarea>
                </div>
                <div className="mb-3">
                   <label className="form-label">Your photo</label>
                   <input type="file" className="form-control file"/>
                </div>
                <button className="btn btn-dark">Register <BsCupHotFill/></button>
                <a href="/">Sign-in</a>
            </div>
        </section>
    )
}


export  default Login