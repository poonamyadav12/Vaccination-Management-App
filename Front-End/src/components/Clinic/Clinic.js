import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';
import { useDispatch, useSelector } from 'react-redux';
import TimeSelect from "react-time-select";
import './Clinic.css'
import { useEffect, useState } from "react";
import { CreateClinic } from "../../services";
import { clinicSliceActions } from "../../store/clinicSlice";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { timeSliceActions } from "../../store/timeSlice";

const Clinic = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const error = useSelector(state => state.clinicSlice.error);

    const isSuccess = useSelector(state => state.clinicSlice.isSuccess);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-left", closeOnClick: true });
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Clinic added successfully', { position: "top-left", closeOnClick: true, delay: 1 });
            dispatch(clinicSliceActions.setIsSuccess(false));
        }
    }, [isSuccess]);

    const [clinic, setClinic] = useState({
        name: '',
        numberOfPhysicians: '',
        openTime: {},
        closeTime: {},
        address: {
            street: "544 E El Camino",
            city: "Santa Clara",
            state: "CA",
            zipCode: "95045",
        },
    });

    const onChangeClinicName = (e) => {
        setClinic({ ...clinic, name: e.target.value });
    }

    const onChangeNumberOfPhysicians = (e) => {
        setClinic({ ...clinic, numberOfPhysicians: e.target.value });
    }

    const onOpenTimeChange = (e) => {
        setClinic({ ...clinic, openTime: { ...clinic.openTime, hour: parseInt(e.hours), minute: parseInt(e.minutes) } });
    }
    const onCloseTimeChange = (e) => {
        setClinic({ ...clinic, closeTime: { ...clinic.closeTime, hour: parseInt(e.hours), minute: parseInt(e.minutes) } });
    }
    const onChangeStreetDetails = (e) => {
        setClinic({ ...clinic, address: { ...clinic.address, street: e.target.value } });
    }

    const onChangeCity = (e) => {
        setClinic({ ...clinic, address: { ...clinic.address, city: e.target.value } });
    }

    const onChangeState = (e) => {
        setClinic({ ...clinic, address: { ...clinic.address, state: e.target.value } });
    }

    const onChangeZipCode = (e) => {
        setClinic({ ...clinic, address: { ...clinic.address, zipCode: e.target.value } });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const openMinute = clinic.openTime.minute + clinic.openTime.hour * 60;
        const closeMinute = clinic.closeTime.minute + clinic.closeTime.hour * 60;

        if (closeMinute - openMinute < 480) {
            toast.error("Minimum 8 hours of business hours is required", { position: "top-left", closeOnClick: true });
        } else {
            dispatch(timeSliceActions.setCurrentTime(new Date().toLocaleString()));
            dispatch(CreateClinic(clinic));
            dispatch(clinicSliceActions.setError(''));
        }
    };

    return (
        <div>
            {!user && <Navigate to='/' />}
            <Navigationbar />
            <ToastContainer />
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
                                <Form id="login-form" onSubmit={onSubmit}>
                                    <h1>+ New Clinic</h1>
                                    <Form.Group className="loginbox" controlId="formEmail">
                                        <Form.Label>Enter Clinic name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Enter Clinic Name"
                                            onChange={onChangeClinicName} required />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formPassword">
                                        <Form.Label>Enter Number Of Physicians</Form.Label>
                                        <Form.Control type="text" name="numberOfPhysicians"
                                            placeholder="Enter Number Of Physicians"
                                            onChange={onChangeNumberOfPhysicians} required />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="loginbox" controlId="openTime">
                                                <Form.Label>Open time</Form.Label>
                                                <TimeSelect label="Choose opening time" onChange={onOpenTimeChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="loginbox" controlId="closeTime">
                                                <Form.Label>Close time</Form.Label>
                                                <TimeSelect label="Choose closing time" onChange={onCloseTimeChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="loginbox" controlId="formStreetDetails">
                                        <Form.Label>Enter Your Street Details</Form.Label>
                                        <Form.Control type="text" name="streetdetails"
                                            placeholder="Enter Your Street Details"
                                            onChange={onChangeStreetDetails} required
                                            defaultValue={clinic.address.street} />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formCity">
                                        <Form.Label>Enter Your Street Details</Form.Label>
                                        <Form.Control type="text" name="city" placeholder="Enter Your City"
                                            onChange={onChangeCity} required
                                            defaultValue={clinic.address.city} />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formState">
                                        <Form.Label>Enter Your Street Details</Form.Label>
                                        <Form.Control type="text" name="state" placeholder="Enter Your State"
                                            onChange={onChangeState} required defaultValue={clinic.address.state} />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formZipCode">
                                        <Form.Label>Enter Your Street Details</Form.Label>
                                        <Form.Control type="text" name="zipcode" placeholder="Enter Your Zip Code"
                                            onChange={onChangeZipCode} required defaultValue={clinic.address.zipCode} />
                                    </Form.Group>
                                    <br />
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