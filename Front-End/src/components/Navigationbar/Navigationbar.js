import React, {Component, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button,
} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {userSliceActions} from "../../store/userSlice";
import {render} from "react-dom";

const Navigationbar = () => {
    const user = useSelector(state => state.userSlice.user);
    console.log("User here",user);

        let navLogin = null

        navLogin = (
            <Nav className="ml-auto">
                {!user && (<Link
                    id="loginLink"
                    to={{
                        pathname: '/signup',
                    }}
                ><Button className="mr-sm-2 navbarbuttons">Sign Up
                        </Button></Link>)}
                {!user? (<Link
                    id="signUpLink"
                    to={{
                        pathname: '/login',
                    }}
                ><Button className="mr-sm-2 navbarbuttons">Login
                </Button></Link>) : (

                <Link
                    id="addNewClinic"
                    to={{
                        pathname: '/clinic',
                    }}
                ><Button className="mr-sm-2 navbarbuttons">Add New Clinic
                </Button></Link>)}
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


export default Navigationbar
