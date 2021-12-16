import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button, NavDropdown, Dropdown,
} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {useFirebase} from "react-redux-firebase";
import {userSliceActions} from "../../store/userSlice";
import {timeSliceActions} from "../../store/timeSlice";
import DateTimePicker from "react-datetime-picker";

const Navigationbar = () => {
    const user = useSelector(state => state.userSlice.user);

    const time = useSelector(state => state.timeSlice.time);

    const admin = user ? user.admin : false;

    console.log("User here", user);
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();

        await firebase.auth().signOut();
        dispatch(userSliceActions.clearUser(null));
    }

    let navLogin = null

    const onDateChange = async (date) => {
        dispatch(timeSliceActions.setCurrentTime(date));
    }

    const adminNav = <>
        <Dropdown>
            <Dropdown.Toggle className="mr-sm-2 navbarbuttons" id="dropdown-basic">
                Manage
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/clinic">New Clinic</Dropdown.Item>
                <Dropdown.Item href="/disease">New Disease</Dropdown.Item>
                <Dropdown.Item href="/vaccine">New Vaccine</Dropdown.Item>
                <Dropdown.Item href="/systemreport">System Report</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </>;

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    navLogin = (
        <>
            {user && <DateTimePicker
                onChange={onDateChange}
                value={time}
                // minDate={currentDate}
                maxDate={maxDate}
            />}
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
                    </Button></Link>) :
                    <>
                        {admin && adminNav}
                        <Link
                            id="appointments"
                            to={{
                                pathname: '/bookedAppointments',
                            }}
                        ><Button className="mr-sm-2 navbarbuttons">Appointments
                        </Button>
                        </Link>
                        <Link
                            id="appointments"
                            to={{
                                pathname: '/patientreport',
                            }}
                        ><Button className="mr-sm-2 navbarbuttons">Patient Report
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
                    </>}
            </Nav>
        </>
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
