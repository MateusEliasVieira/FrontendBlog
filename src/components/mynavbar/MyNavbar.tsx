import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./MyNavbar.css"
import {BsFillPersonFill} from "react-icons/bs";
import {AiOutlineLogout} from "react-icons/ai";

const MyNavbar:React.FC = ()=> {
  return (
    <Navbar className="bg-body-tertiary">
      <Container id="container-data-navbar">
        <Navbar.Brand href="#home">Hi Mateus <BsFillPersonFill/></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="link-navbar-options" href="#login">New</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="link-navbar-options" href="#login">Feed</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="link-navbar-options" href="#login">Logoff <AiOutlineLogout/></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;