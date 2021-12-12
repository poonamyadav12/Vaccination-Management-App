import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button,
} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {useFirebase} from "react-redux-firebase";
import {userSliceActions} from "../../store/userSlice";

const Navigationbar = () => {
    const user = useSelector(state => state.userSlice.user);

    console.log("User here", user);
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();

        await firebase.auth().signOut();
        dispatch(userSliceActions.clearUser(null));
    }

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
            {!user ? (<Link
                id="signUpLink"
                to={{
                    pathname: '/login',
                }}
            ><Button className="mr-sm-2 navbarbuttons">Login
            </Button></Link>) : (
                <>
                    <Link
                        id="addNewClinic"
                        to={{
                            pathname: '/clinic',
                        }}
                    ><Button className="mr-sm-2 navbarbuttons">New Clinic
                    </Button>
                    </Link>
                    <Link
                        id="addNewClinic"
                        to={{
                            pathname: '/disease',
                        }}
                    ><Button className="mr-sm-2 navbarbuttons">New Disease
                    </Button>
                    </Link>
                    <Link
                        id="addNewClinic"
                        to={{
                            pathname: '/vaccine',
                        }}
                    ><Button className="mr-sm-2 navbarbuttons">New Vaccine
                    </Button>
                    </Link>
                    <Link
                        id="logout"
                        to={{
                            pathname: '/login',
                        }}
                    ><Button className="mr-sm-2 navbarbuttons" onClick={handleLogout}>Logout
                    </Button>
                    </Link>
                </>)}
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {navLogin}
                </div>
            </Navbar>
        </div>
    );
}


export default Navigationbar
