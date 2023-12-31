import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./MyNavbar.css"
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { ENDPOINT_FIND_USER } from "../../global/URLs.ts";
import axios from "axios";

const MyNavbar: React.FC = () => {

  const [name, setName] = useState("")
  const [role, setRole] = useState("")


  useEffect(() => {
    const idUserString = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    if (idUserString != null && token != null) {
      const idUser = parseInt(idUserString)
      findUser(idUser, token)
    }
  }, [])

  const findUser = async (idUser: number, token: string) => {

    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`, // Define o cabeçalho de autenticação com o token},
      }
    });
    axiosInstance.get(`${ENDPOINT_FIND_USER}${idUser}`)
      .then((response) => {
        const data = response.data;
        setName(data.name)
        setRole(data.role)
      })
      .catch((e) => {
        console.log(e);
      })

  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container id="container-data-navbar">
        <Navbar.Brand href="/feed">{name ? `Olá ${name.split(" ")[0]}` : ""}<BsFillPersonFill /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {
            role === "ROLE_ADMIN" ?
              (<Navbar.Text>
                <a className="link-navbar-options" href="/new-post">Novo</a>
              </Navbar.Text>) : null
          }
          <Navbar.Text>
            <a className="link-navbar-options" href="/feed">Feed</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="link-navbar-options" href="/logoff">Sair <AiOutlineLogout /></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;