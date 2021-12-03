import {
    Form, Button, Container, Col, Row, Figure, Dropdown
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';
import {useDispatch} from 'react-redux';
import {userSliceActions} from '../../store/userSlice';
import TimeSelect from "react-time-select";
import './Clinic.css'
import {useState} from "react";

const Clinic = () => {
    const dispatch = useDispatch();
    const [clinic, setClinic] = useState({
        clinicName: '',
        numberOfPhysicians: '',
        openTime: '',
        closeTime: '',
        address: {},
    });

    const onChangeClinicName = (e) => {
        dispatch(userSliceActions.setEmail(e.target.value));
    }

    const onChangeNumberOfPhysicians = (e) => {
        dispatch(userSliceActions.setPassword(e.target.value));
    }

    const onOpenTimeChange = (e) => {
        dispatch(userSliceActions.setPassword(e.target.value));
    }
    const onCloseTimeChange = (e) => {
        dispatch(userSliceActions.setPassword(e.target.value));
    }
    return (
        <div>
            <Navigationbar/>
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <div id="login-image">
                                    <Figure.Image
                                        src={`${window.location.origin}/clinic.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form id="login-form" method="post">
                                    <h1>Add New Clinic</h1>
                                    <p>Enter details to add new clinic</p>
                                    <Form.Group className="loginbox" controlId="formEmail">
                                        <Form.Control type="text" name="name" placeholder="Enter Clinic Name"
                                                      onChange={onChangeClinicName} required/>
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formPassword">
                                        <Form.Control type="text" name="numberOfPhysicians"
                                                      placeholder="Enter Number Of Physicians"
                                                      onChange={onChangeNumberOfPhysicians} required/>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="loginbox" controlId="openTime">
                                                <Form.Label>Open time</Form.Label>
                                                <TimeSelect label="Choose opening time" onChange={onOpenTimeChange}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="loginbox" controlId="closeTime">
                                                <Form.Label>Close time</Form.Label>
                                                <TimeSelect label="Choose closing time" onChange={onCloseTimeChange}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Button id="loginbutton" type="submit">
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

export default Clinic;