import {
    Form, Button, Container, Col, Row, Figure, Image
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';
import './Signup.css'
import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFirebase} from "react-redux-firebase";
import {GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const SignupMode = Object.freeze({
    GOOGLE: "google",
    EMAIL: "email",
});

const provider = new GoogleAuthProvider();

const SignupStart = () => {
    const navigate = useNavigate();

    const [signedOut, setSignedOut] = useState(false);

    const [error, setError] = useState('');

    const [emailSent, setEmailSent] = useState(false);

    const [verificationDone, setVerificationDone] = useState(false);

    const firebase = useFirebase();

    useEffect(() => {
        if (error) {
            toast.error(error, {position: "top-left", closeOnClick: true});
        }
    }, [error]);

    useEffect(() => {
        if (emailSent) {
            toast.success('Please check your email and verify using the link provided', {
                position: "top-left",
                closeOnClick: true,
                delay: 1
            });
        }
    }, [emailSent]);


    useEffect(async () => {
        await firebase.auth().signOut();
        setSignedOut(true);
    }, [])


    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (!verificationDone && signedOut && user?.emailVerified) {
                continueSignup();
            }
        });
        return () => {
            unsubscribe();
        } // unsubscribing from the listener when the component is unmounting.
    }, [signedOut]);

    const [loginInfo, setLoginInfo] = useState({
        email: 'poonam.yadav@sjsu.edu',
        password: 'Poonam@12313',
    });

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userInfo = await firebase.auth().createUserWithEmailAndPassword(loginInfo.email, loginInfo.password);
            console.log("User Info " + userInfo);
            await sendEmail(userInfo.user);
        } catch (e) {
            handlError(e);
        }
    }

    const onGoogleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userInfo = await firebase.auth().signInWithPopup(provider);
            console.log("User Info " + userInfo);
        } catch (e) {
            handlError(e);
        }
    }

    const sendEmail = async (user) => {
        await user.sendEmailVerification()
        setEmailSent(true);
        waitForEmailVerification(user);
    }

    const waitForEmailVerification = (user) => {
        let interval = setInterval(async () => {
            if (user.emailVerified) {
                clearInterval(interval);
                continueSignup();
            }
            user.reload();
        }, 2000);
    }

    const continueSignup = () => {
        toast.success('Verification successful', {
            toastId: "verification-success",
            position: "top-left",
            closeOnClick: true,
            delay: 3
        });
        setTimeout(() => {
            navigate('/signupContinue')
        }, 2000);
        setVerificationDone(true);
    }

    const handlError = (e) => {
        let msg = null;
        switch (e?.code) {
            case "auth/email-already-exists":
            case "auth/email-already-in-use":
                msg = "Email ID already exists, please login";
                break;
            default:
                msg = e?.message;
        }
        console.log("error " + msg);
        setError(msg);
    }

    const onChangeEmail = (e) => {
        setLoginInfo({...loginInfo, email: e.target.value});
    }

    const onChangePassword = (e) => {
        setLoginInfo({...loginInfo, password: e.target.value});
    }

    return (
        <div>
            <Navigationbar/>
            <ToastContainer/>
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <div id="signup-image">
                                    <Figure.Image
                                        src={`${window.location.origin}/signup.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form id="signup-form" onSubmit={onEmailSubmit}>
                                    <h1>Sign Up</h1>
                                    <p>Enter your details to create an account</p>
                                    <Form.Group className="signupbox" controlId="formEmail">
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email"
                                                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                      value={loginInfo.email}
                                                      onChange={onChangeEmail} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formPassword">
                                        <Form.Control type="password" name="password"
                                                      placeholder="Enter Your Password"
                                                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                      value={loginInfo.password}
                                                      onChange={onChangePassword} required/>
                                    </Form.Group>
                                    <br/>
                                    <small>
                                        Must contain at least one number and one uppercase and
                                        lowercase letter, and at least 8 or more characters
                                    </small>
                                    <br/>
                                    <br/>
                                    <Button id="signupbutton" type="submit">
                                        Submit
                                    </Button>
                                    <br/>
                                    <Form.Label>OR</Form.Label>
                                    <br/>
                                    <Image
                                        src={`${window.location.origin}/google_signin_dark_normal_web.png`}
                                        width={"30%"}
                                        id="loginbutton"
                                        type="submit"
                                        style={{border: "none"}}
                                        onClick={onGoogleLogin}
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default SignupStart;