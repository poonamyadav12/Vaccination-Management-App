import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Navigationbar from '../Navigationbar/Navigationbar';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions } from '../../store/userSlice';
import './Signup.css'
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
    const dispatch = useDispatch();

    const dob = useSelector(state => state.userSlice.dob);

    const onChangeFirstName = (e) => {
        dispatch(userSliceActions.setFirstName(e.target.value));
    }

    const onChangeMiddleName = (e) => {
        dispatch(userSliceActions.setMiddleName(e.target.value));
    }

    const onChangeLastName = (e) => {
        dispatch(userSliceActions.setLastName(e.target.value));
    }

    const onChangeDob = (e) => {
        dispatch(userSliceActions.setDob(e.toISOString()));
    }

    const onChangeStreetDetails = (e) => {
        dispatch(userSliceActions.setStreetDetails(e.target.value));
    }

    const onChangeCity = (e) => {
        dispatch(userSliceActions.setCity(e.target.value));
    }

    const onChangeState = (e) => {
        dispatch(userSliceActions.setState(e.target.value));
    }

    const onChangeZipCode = (e) => {
        dispatch(userSliceActions.setZipCode(e.target.value));
    }

    const onChangeGender = (e) => {
        dispatch(userSliceActions.setGender(e.target.value));
    }

    const onChangeEmail = (e) => {
        dispatch(userSliceActions.setEmail(e.target.value));
    }

    const onChangePassword = (e) => {
        dispatch(userSliceActions.setPassword(e.target.value));
    }

    return (
        <div>
            <Navigationbar />
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
                                <Form id="signup-form" method="post">
                                    <h1>Sign Up</h1>
                                    <p>Enter your details to create an account</p>
                                    <Form.Group className="signupbox" controlId="formFirstName">
                                        <Form.Control type="text" name="firstname" placeholder="Enter Your First Name" onChange={onChangeFirstName} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formMiddleName">
                                        <Form.Control type="text" name="middlename" placeholder="Enter Your Middle Name" onChange={onChangeMiddleName} />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formLastName">
                                        <Form.Control type="text" name="lastname" placeholder="Enter Your Last Name" onChange={onChangeLastName} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formDob">
                                        <Row style={{ textAlign: "left" }}>
                                            <Col>
                                                <Form.Label>Pick Your Date of Birth:</Form.Label>
                                            </Col>
                                            <Col>
                                                <DatePicker selected={new Date(dob)} onChange={(date) => onChangeDob(date)} />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formStreetDetails">
                                        <Form.Control type="text" name="streetdetails" placeholder="Enter Your Street Details" onChange={onChangeStreetDetails} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formCity">
                                        <Form.Control type="text" name="city" placeholder="Enter Your City" onChange={onChangeCity} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formState">
                                        <Form.Control type="text" name="state" placeholder="Enter Your State" onChange={onChangeState} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formZipCode">
                                        <Form.Control type="text" name="zipcode" placeholder="Enter Your Zip Code" onChange={onChangeZipCode} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formGender">
                                        <Form.Control type="text" name="gender" onChange={onChangeGender} as="select" required>
                                            <option hidden value="Choose Your Gender">Choose Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formEmail">
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmail} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formPassword">
                                        <Form.Control type="password" name="password" placeholder="Enter Your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={onChangePassword} required />
                                    </Form.Group>
                                    <br />
                                    <small>
                                        Must contain at least one  number and one uppercase and
                                        lowercase letter, and at least 8 or more characters
                                    </small>
                                    <br />
                                    <br />
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