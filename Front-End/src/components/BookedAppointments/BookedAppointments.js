import React, {useEffect, useState} from "react";
import {Col, Container, Row, ButtonGroup, Modal} from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import {Descriptions, Radio, Button} from "antd";
import "./BookedAppointments.css";
import {useDispatch, useSelector} from "react-redux";
import {CheckinAppointments, DeleteAppointments, GetAppointments, GetSlots} from "../../services";
import {Navigate, useNavigate} from "react-router-dom";
import {toPstDate, toPstTime} from "../../common/datehelper";
import {
    GiCheckMark,
    ImCheckboxChecked,
    ImClock,
    ImCross,
    ImPlus,
    MdPlaylistAdd,
    IoOptions,
} from "react-icons/all";
import ReactTooltip from "react-tooltip";
import {appointmentSliceActions} from "../../store/apptSlice";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {EditAppointment} from "./EditAppointment";

const BookedAppointments = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector((state) => state.userSlice.user);

    const time = useSelector((state) => state.timeSlice.time);

    const [radioButtonStatus, setRadioButtonStatus] = useState("upcoming");
    const appointments = useSelector(
        (state) => state.appointmentSlice.appointment
    );

    useEffect(() => {
        dispatch(GetAppointments(user.email));
    }, [time]);

    useEffect(() => {
        // Reload
    }, [appointments]);

    const onRadioButtonChange = (e) => {
        setRadioButtonStatus(e.target.value);
    };

    const future = appointments?.filter(
        (appointment) => new Date(appointment.time) > time
    );
    const past = appointments?.filter(
        (appointment) => new Date(appointment.time) <= time
    );

    return (
        <div>
            {!user && <Navigate to="/"/>}
            <Navigationbar/>
            <Container>
                <Row style={{textAlign: "left"}}>
                    <Row style={{display: "flex", alignItems: "baseline"}}>
                        <Col style={{flex: "0 1 20%"}}>
                            <h1
                                style={{
                                    textAlign: "left",
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                }}
                            >
                                Appointments
                            </h1>
                        </Col>
                        <Col style={{flex: "0 1 10%", marginBottom: "20px"}}>
                            <h1>
                                <MdPlaylistAdd
                                    size={50}
                                    color={"blue"}
                                    onClick={() => navigate("/appointment")}
                                />
                            </h1>
                        </Col>
                    </Row>
                    <Radio.Group
                        id="radio-group"
                        onChange={onRadioButtonChange}
                        value={radioButtonStatus}
                    >
                        <Radio className="radio-buttons" value="upcoming">
                            Upcoming appointments
                        </Radio>
                        <Radio className="radio-buttons" value="past">
                            Past appointments
                        </Radio>
                    </Radio.Group>
                </Row>
                <br/>
                <Row>
                    <div>
                        {radioButtonStatus === "upcoming" && (
                            <Appointments type={"upcoming"} appointments={future}/>
                        )}
                        {radioButtonStatus === "past" && (
                            <Appointments type={"past"} appointments={past}/>
                        )}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

const Appointments = (props) => {
    return (
        <div>
            {props.appointments?.map((appointment) => {
                return (
                    <div key={appointment.id}>
                        <AppointmentItem type={props.type} appointment={appointment}/>
                        <br/>
                    </div>
                );
            })}
            {props.appointments?.length === 0 && <h6>No appointments available</h6>}
        </div>
    );
};

const AppointmentItem = (props) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);
    const time = useSelector((state) => state.timeSlice.time);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const checkinSuccess = useSelector(
        (state) => state.appointmentSlice.checkinSuccess
    );

    useEffect(() => {
        dispatch(GetAppointments(user.email));
    }, [checkinSuccess]);

    const checkInFunc = (e) => {
        e.preventDefault();
        appointmentSliceActions.setCheckinSuccess(false);
        dispatch(CheckinAppointments(`?appointmentId=${props.appointment.id}`));
    };

    const [editMenuOpen, setEditMenuOpen] = useState(false);
    const editFunc = () => {
        setEditMenuOpen(true);
    };

    const closeEditMenu = () => {
        setEditMenuOpen(false);
    };

    const deleteFunc = (e) => {
        e.preventDefault();
        console.log("Attempted to delete");
        console.log(props.appointment.id);

        axios
            .post("/appointment/delete", null, {
                params: {appointmentID: props.appointment.id},
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("here");
                    toast.success("Appointment Deleted Successfully.", {
                        position: "top-left",
                        closeOnClick: true,
                        delay: 1,
                        autoClose: 1500
                    });
                    dispatch(GetAppointments(user.email));
                } else {
                    toast.error("Failed to delete appointment.", {
                        position: "top-left",
                        closeOnClick: true,
                        delay: 1,
                        autoClose: 2000,
                    });
                }
            });
    };

    const checkIn =
        props.type === "upcoming" ? (
            props.appointment.checkInStatus ? (
                <ImCheckboxChecked
                    data-tip
                    data-for="upcoming"
                    color={"blue"}
                    size={18}
                />
            ) : (
                <ImClock
                    data-tip
                    data-for="upcomingNoCheckin"
                    color={"blue"}
                    size={18}
                />
            )
        ) : props.appointment.checkInStatus ? (
            <ImCheckboxChecked
                data-tip
                data-for="checkedIn"
                color={"green"}
                size={18}
            />
        ) : (
            <ImCross data-tip data-for="noShow" color={"red"} size={18}/>
        );

    const checkInButton = props.type === "upcoming" &&
        !props.appointment.checkInStatus &&
        // If time is within next 24 hours, allow checkin
        new Date(props.appointment.time) - time < 24 * 3600 * 1000 && (
            <Button style={{backgroundColor: "wheat"}} onClick={checkInFunc}>
                <GiCheckMark color={"green"} size={20}/>
                Check-in
            </Button>
        );

    const menu = props.type === "upcoming" && (
        <div style={{marginTop: "2vh"}}>
            <ButtonGroup>
                <Button style={{marginRight: "30px"}} onClick={() => setDeleteOpen(true)} variant="danger"
                        className="btn-danger">
                    Delete
                </Button>
                <Button onClick={editFunc} variant="primary" className="btn-primary">
                    Edit
                </Button>
            </ButtonGroup>
        </div>
    );

    return (
        <div>
            <ToastContainer/>
            <ReactTooltip id="checkedIn" type="success">
                <span>Appointment honored</span>
            </ReactTooltip>
            <ReactTooltip id="upcomingNoCheckin" type="info">
                <span>Appointment upcoming</span>
            </ReactTooltip>
            <ReactTooltip id="upcoming" type="info">
                <span>All set for the appointment</span>
            </ReactTooltip>
            <ReactTooltip id="noShow" type="error">
                <span>No show</span>
            </ReactTooltip>
            <Descriptions
                bordered
                size="default"
                labelStyle={{backgroundColor: "#3F4045", color: "white"}}
            >
                <Descriptions.Item label="Clinic">
                    {props.appointment.clinic.name} {checkIn} {checkInButton}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                    {toPstDate(new Date(props.appointment.time))}
                </Descriptions.Item>
                <Descriptions.Item label="Time">
                    {toPstTime(new Date(props.appointment.time))}
                </Descriptions.Item>
                <Descriptions.Item label="Vaccines">
                    {props.appointment.vaccines.map((vaccine) => {
                        return (
                            <div className="vaccines" key={vaccine.name}>
                                Name: {vaccine.name}
                                <br/>
                                Number Of Shots: {vaccine.numberOfShots}
                            </div>
                        );
                    })}
                    {menu}
                    <Modal show={deleteOpen} onHide={() => setDeleteOpen(false)}>
                        <Modal.Header deleteButton>
                            <Modal.Title>Delete appointment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Are you sure you want to delete this appointment?</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn-success" onClick={() => setDeleteOpen(false)}>
                                No
                            </Button>
                            <Button className="btn-danger" onClick={deleteFunc}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <EditAppointment onHide={closeEditMenu} show={editMenuOpen} appointmentID={props.appointment.id}
                                     clinic={props.appointment.clinic} oldTime={new Date(props.appointment.time)}/>
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default BookedAppointments;
