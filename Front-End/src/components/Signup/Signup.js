import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Navigationbar from '../Navigationbar/Navigationbar';
import {useDispatch, useSelector} from 'react-redux';
import './Signup.css'
import "react-datepicker/dist/react-datepicker.css";
import {CreateUser} from "../../services";
import {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {userSliceActions} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {formatMMddYYYY} from "../../common/datehelper";
import {useFirebase} from "react-redux-firebase";

const Signup = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const isConfirmingEmail = urlParams.get('confirm_email');

    const firebase = useFirebase();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const error = useSelector(state => state.userSlice.error);

    const isSuccess = useSelector(state => state.userSlice.isSuccess);

    useEffect(() => {
        if (error) {
            toast.error(error, {position: "top-left", closeOnClick: true});
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Signup success', {position: "top-left", closeOnClick: true, delay: 1});
            dispatch(userSliceActions.setIsSuccess(false));
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [isSuccess]);

    const names = firebase.auth().currentUser?.displayName?.split(" ");
    const [user, setUser] = useState({
        email: firebase.auth().currentUser?.email,
        firstname: names?.[0],
        middlename: names?.slice(1, -1)?.join(' '),
        lastname: names?.[names.length - 1],
        dateOfBirth: formatMMddYYYY(new Date()),
        address: {},
        gender: '',
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateUser(user));
        dispatch(userSliceActions.setError(''));
    };

    const onChangeFirstName = (e) => {
        setUser({...user, firstname: e.target.value});
    }

    const onChangeMiddleName = (e) => {
        setUser({...user, middlename: e.target.value});
    }

    const onChangeLastName = (e) => {
        setUser({...user, lastname: e.target.value});
    }

    const onChangeDob = (date) => {
        setUser({...user, dateOfBirth: formatMMddYYYY(date)});
    }

    const onChangeStreetDetails = (e) => {
        setUser({...user, address: {...user.address, street: e.target.value}});
    }

    const onChangeCity = (e) => {
        setUser({...user, address: {...user.address, city: e.target.value}});
    }

    const onChangeState = (e) => {
        setUser({...user, address: {...user.address, state: e.target.value}});
    }

    const onChangeZipCode = (e) => {
        setUser({...user, address: {...user.address, zipCode: e.target.value}});
    }

    const onChangeGender = (e) => {
        setUser({...user, gender: e.target.value});
    }

    const onChangeEmail = (e) => {
        setUser({...user, email: e.target.value});
    }

    const onChangePassword = (e) => {
        setUser({...user, password: e.target.value});
    }

    // firebase.auth().currentUser.getIdToken(!!isConfirmingEmail).then(() => {
    //     // Refreshed Token
    // })

    return (
        <div>
            {/*{isSuccess ? <Navigate to={"/"}/> : null}*/}
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
                                <Form id="signup-form" onSubmit={onSubmit}>
                                    <h1>Complete your sign up</h1>
                                    <p>Enter your details to create an account</p>
                                    <Form.Group className="signupbox" controlId="formFirstName">
                                        <Form.Control type="text" name="firstname"
                                                      value={user.firstname}
                                                      placeholder="Enter Your First Name"
                                                      onChange={onChangeFirstName} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formMiddleName">
                                        <Form.Control type="text" name="middlename"
                                                      placeholder="Enter Your Middle Name"
                                                      value={user.middlename}
                                                      onChange={onChangeMiddleName}/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formLastName">
                                        <Form.Control type="text" name="lastname" placeholder="Enter Your Last Name"
                                                      value={user.lastname}
                                                      onChange={onChangeLastName} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formDob">
                                        <Row style={{textAlign: "left"}}>
                                            <Col>
                                                <Form.Label>Pick Your Date of Birth:</Form.Label>
                                            </Col>
                                            <Col>
                                                <DatePicker selected={new Date(user.dateOfBirth)}
                                                            onChange={(date) => onChangeDob(date)}/>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formStreetDetails">
                                        <Form.Control type="text" name="streetdetails"
                                                      placeholder="Enter Your Street Details"
                                                      value={user.address.street}
                                                      onChange={onChangeStreetDetails} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formCity">
                                        <Form.Control type="text" name="city" placeholder="Enter Your City"
                                                      onChange={onChangeCity} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formState">
                                        <Form.Control type="text" name="state" placeholder="Enter Your State"
                                                      onChange={onChangeState} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formZipCode">
                                        <Form.Control type="text" name="zipcode" placeholder="Enter Your Zip Code"
                                                      onChange={onChangeZipCode} required/>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formGender">
                                        <Form.Control type="text" name="gender" onChange={onChangeGender}
                                                      as="select"
                                                      required>
                                            <option hidden value="Choose Your Gender">Choose Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formEmail">
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email"
                                                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                      value={user.email}
                                                      onChange={onChangeEmail} required
                                                      disabled={true}/>
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
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Signup;