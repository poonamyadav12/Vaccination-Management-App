import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button,
} from 'react-bootstrap';

class Navigationbar extends Component {
    render() {
        let navLogin = null

        navLogin = (
            <Nav className="ml-auto">

                <Link
                    id="loginLink"
                    to={{
                        pathname: '/login',
                    }}
                ><Button className="mr-sm-2 navbarbuttons">Login
                        </Button></Link>

                <Link
                    id="signUpLink"
                    to={{
                        pathname: '/signup',
                    }}
                ><Button className="mr-sm-2 navbarbuttons">Sign Up
                        </Button></Link>
            </Nav>
        );

        return (
            <div>
                <Navbar id="nav-bar">
                    <div className="container">
                        <Navbar.Brand id="nav-brand">
                            <img
                                alt=""
                                src={`${window.location.origin}/vaccination-stand-logo.png`}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {' '}
                            <Link
                                id="landingPageLink"
                                to={{
                                    pathname: '/',
                                }}
                            >
                                Vaccination Management System
                            </Link>

                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {navLogin}
                    </div>
                </Navbar>
            </div>
        );
    }
}


export default Navigationbar
