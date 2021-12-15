import {Navigate} from "react-router-dom";
import Navigationbar from "../Navigationbar/Navigationbar";
import {ToastContainer} from "react-toastify";
import {Card, Col, Container, Figure, Row} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getDate} from "../../common/datehelper";
import "./Appointment.css";
import {GetSlots} from "../../services";
import {ClinicAppointment} from "./ClinicAppointment";

const Appointment = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const initialTime = useSelector(state => state.timeSlice.time);

    const slots = useSelector(state => state.slotSlice.slots);

    const error = useSelector(state => state.slotSlice.error);

    const [selectedDate, setSelectedDate] = useState(initialTime);

    const onDateChange = (date) => {
        setSelectedDate(date);
    }

    useEffect(() => {
        dispatch(GetSlots(`${user.email}/${getDate(selectedDate)}`));
    }, [selectedDate, initialTime])

    return (
        <div>
            {!user && <Navigate to='/'/>}
            <Navigationbar/>
            <ToastContainer/>
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col style={{flex: "0 1 30%"}}>
                                <div id="login-image">
                                    <Figure.Image
                                        src={`${window.location.origin}/appointment.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <br/>
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col style={{flex: "0 1 50%", textAlign: "start"}}><h5>Choose Appointment
                                            Date</h5>
                                        </Col>
                                        <Col style={{flex: "0 1 50%", textAlign: "justify"}}>
                                            <h5><DatePicker
                                                onChange={onDateChange}
                                                value={selectedDate}
                                            /></h5>
                                        </Col>
                                    </Row>
                                    <br/>
                                </Card>
                                {slots === "" &&
                                <h6>No slots available, please select a date within 12 months of current time.</h6>}
                                {slots?.appointments?.map(appt => <><ClinicAppointment appointment={appt}/><br/></>)}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default Appointment;