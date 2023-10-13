import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./MyNavbar.css"
import {BsFillPersonFill} from "react-icons/bs";
import {AiOutlineLogout} from "react-icons/ai";

const MyNavbar:React.FC = ()=> {

    const[name,setName]=useState("")

    useEffect(()=>{
        const idUserString = localStorage.getItem("idUser");
        const token = localStorage.getItem("token");
        if (idUserString != null && token != null) {
            const idUser = parseInt(idUserString)
            findUser(idUser,token)
        }
    },[])

    const findUser = async (idUser:number,token:string)=>{
        try {
           const response = await fetch(`http://localhost:8080/user/find/${idUser}`,
               {
                   headers:{
                       "Content-Type":"application/json",
                       "Authorization":`Bearer ${token}`
                   },
                   method:"GET"
               });
           const json = await response.json();
           console.log(json)
           setName(json.name)
        }catch (e) {
            console.log(e)
        }
    }

  return (
    <Navbar className="bg-body-tertiary">
      <Container id="container-data-navbar">
        <Navbar.Brand href="/feed">{name && name ? `Hi ${name.split(" ")[0]}` : "Hi User"}<BsFillPersonFill/></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="link-navbar-options" href="/new-post">New</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="link-navbar-options" href="/feed">Feed</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="link-navbar-options" href="/logoff">Logoff <AiOutlineLogout/></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;