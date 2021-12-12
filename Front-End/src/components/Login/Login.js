import {Form, Button, Container, Col, Row, Figure, Image} from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import "./Login.css";
import {useFirebase} from "react-redux-firebase";
import 'react-toastify/dist/ReactToastify.css';
import {GoogleAuthProvider} from "firebase/auth";
import {userSliceActions} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {GetUser} from "../../services";

const provider = new GoogleAuthProvider();

const Login = () => {
    const [email, setEmail] = useState('poonam.yadav@sjsu.edu');
    const [password, setPassword] = useState('Poonam@12313');

    const [emailVerified, setEmailVerified] = useState(null);

    const isSuccess = useSelector(state => state.userSlice.isSuccess);

    const error = useSelector(state => state.userSlice.error);

    const firebase = useFirebase();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error, {position: "top-left", closeOnClick: true});
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Login success', {position: "top-left", closeOnClick: true, delay: 1});
            dispatch(userSliceActions.setIsSuccess(false));
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [isSuccess]);

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(userSliceActions.setError(''));
        try {
            const userInfo = await firebase.auth().signInWithEmailAndPassword(email, password);
            setEmailVerified(userInfo.user.emailVerified);
        } catch (err) {
            handleError(err);
        }
    }

    const onGoogleLogin = async (e) => {
        e.preventDefault();
        dispatch(userSliceActions.setError(''));
        try {
            const userInfo = await firebase.auth().signInWithPopup(provider);
            setEmailVerified(userInfo.user.emailVerified);
            console.log("User Info " + userInfo);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        if (emailVerified) {
            dispatch(GetUser(email));
        }
        if (emailVerified === false) {
            toast.error('Please verify the email first before using the account', {
                toastId: "verification-pending",
                position: "top-left",
                closeOnClick: true,
                delay: 3
            });
        }
    }, [emailVerified]);

    const handleError = (e) => {
        let msg;
        switch (e?.code) {
            case "auth/email-already-exists":
            case "auth/email-already-in-use":
                msg = "Email ID already exists, please login";
                break;
            default:
                msg = e?.message;
        }
        console.log("error " + msg);
        dispatch(userSliceActions.setError(msg));
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <ToastContainer/>
            <Navigationbar/>
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <div id="login-image">
                                    <Figure.Image src={`${window.location.origin}/login.svg`}/>
                                </div>
                            </Col>
                            <Col>
                                <Form id="login-form" method="post">
                                    <h1>Login</h1>
                                    <p>Enter your details to login</p>
                                    <Form.Group className="loginbox" controlId="formEmail">
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            onChange={onChangeEmail}
                                            value={email}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formPassword">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={onChangePassword}
                                            required
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Button
                                        id="loginbutton"
                                        type="submit"
                                        onClick={onSubmit}
                                    >
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
    );
};

export default Login;
