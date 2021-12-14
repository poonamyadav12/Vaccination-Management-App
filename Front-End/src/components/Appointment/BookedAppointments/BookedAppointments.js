import axios from "axios";
import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import Navigationbar from "../../Navigationbar/Navigationbar";
import {Descriptions, Radio, Button} from 'antd';
import './BookedAppointments.css';
import {useDispatch, useSelector} from "react-redux";
import {CheckinAppointments, GetAppointments} from "../../../services";
import {Navigate} from "react-router-dom";
import {isGreaterThan, isLessThan, toPstDate, toPstTime} from "../../../common/datehelper";
import {GiCheckMark, ImCheckboxChecked, ImCheckmark, ImClock, ImCross, ImHistory} from "react-icons/all";
import ReactTooltip from "react-tooltip";
import {appointmentSliceActions} from "../../../store/apptSlice";

const BookedAppointments = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const time = useSelector(state => state.timeSlice.time);

    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [radioButtonStatus, setRadioButtonStatus] = useState("upcoming")
    const appointments = useSelector(state => state.appointmentSlice.appointment);

    useEffect(() => {
        dispatch(GetAppointments(user.email));
    }, [time])

    useEffect(() => {
        if (appointments) {
            setFutureAppointments(appointments.filter((appointment) => new Date(appointment.time) > time));
            setPastAppointments(appointments.filter((appointment) => new Date(appointment.time) <= time));
        }
    }, [appointments])

    const onRadioButtonChange = (e) => {
        setRadioButtonStatus(e.target.value);
    }

    return (
        <div>
            {!user && <Navigate to='/'/>}
            <Navigationbar/>
            <Container>
                <Row style={{textAlign: "left"}}>
                    <h1 style={{textAlign: "left", marginTop: "10px", marginLeft: "10px"}}>Appointments Information</h1>
                    <Radio.Group id="radio-group" onChange={onRadioButtonChange} value={radioButtonStatus}>
                        <Radio className="radio-buttons" value="upcoming">Upcoming appointments</Radio>
                        <Radio className="radio-buttons" value="past">Past appointments</Radio>
                    </Radio.Group>
                </Row>
                <br/>
                <Row>
                    <div>
                        {radioButtonStatus === "upcoming" &&
                        <Appointments type={"upcoming"} appointments={futureAppointments}/>}
                        {radioButtonStatus === "past" && <Appointments type={"past"} appointments={pastAppointments}/>}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

const Appointments = (props) => {
    return (
        <div>
            {props.appointments.map((appointment) => {
                    return (
                        <div key={appointment.id}>
                            <AppointmentItem type={props.type} appointment={appointment}/>
                            <br/>
                        </div>
                    )
                }
            )}
            {props.appointments.length === 0 && <h6>No appointments available</h6>}
        </div>
    )
}

const AppointmentItem = (props) => {

    const user = useSelector(state => state.userSlice.user);
    const time = useSelector(state => state.timeSlice.time);
    const checkinSuccess = useSelector(state => state.appointmentSlice.checkinSuccess);
    // const [checkInStatus, setCheckin] = useState(props.appointment.checkInStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAppointments(user.email));
    }, [checkinSuccess])

    const checkInFunc = (e) => {
        e.preventDefault();
        appointmentSliceActions.setCheckinSuccess(false);
        dispatch(CheckinAppointments(`?appointmentId=${props.appointment.id}`));
    }

    const checkIn = props.type === "upcoming" ?
        (props.appointment.checkInStatus ?
            <ImCheckboxChecked data-tip data-for='upcoming' color={"blue"} size={18}/> :
            <ImClock data-tip data-for='upcomingNoCheckin' color={"blue"} size={18}/>)
        : (props.appointment.checkInStatus ?
            <ImCheckboxChecked data-tip data-for='checkedIn' color={"green"} size={18}/> :
            <ImCross data-tip data-for='noShow' color={"red"} size={18}/>);

    const checkInButton = props.type === "upcoming"
        && !props.appointment.checkInStatus
        // If time is within next 24 hours, allow checkin
        && new Date(props.appointment.time) - time < 24 * 3600 * 1000 &&
        <Button style={{backgroundColor: "wheat"}} onClick={checkInFunc}><GiCheckMark color={"green"}
                                                                                      size={20}/>Check-in</Button>;

    return (
        <div>
            <ReactTooltip id='checkedIn' type='success'>
                <span>Appointment honored</span>
            </ReactTooltip>
            <ReactTooltip id='upcomingNoCheckin' type='info'>
                <span>Appointment upcoming</span>
            </ReactTooltip>
            <ReactTooltip id='upcoming' type='info'>
                <span>All set for the appointment</span>
            </ReactTooltip>
            <ReactTooltip id='noShow' type='error'>
                <span>No show</span>
            </ReactTooltip>
            <Descriptions
                bordered
                size="default"
                labelStyle={{backgroundColor: "#3F4045", color: "white"}}
            >
                <Descriptions.Item
                    label="Clinic">{props.appointment.clinic.name}{' '}{checkIn}{' '}{checkInButton}</Descriptions.Item>
                <Descriptions.Item
                    label="Date">{toPstDate(new Date(props.appointment.time))}</Descriptions.Item>
                <Descriptions.Item
                    label="Time">{toPstTime(new Date(props.appointment.time))}</Descriptions.Item>
                <Descriptions.Item label="Vaccines">
                    {props.appointment.vaccines.map((vaccine) => {
                        return (
                            <div className="vaccines" key={vaccine.name}>
                                Name: {vaccine.name}
                                <br/>
                                Number Of Shots: {vaccine.numberOfShots}
                            </div>
                        )
                    })}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default BookedAppointments;