import {Button, Card, Modal, Row} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";
import DatePicker from "react-date-picker";
import {useDispatch, useSelector} from "react-redux";
import {GetAppointments, GetSlots, UpdateAppointments} from "../../services";
import {getDate} from "../../common/datehelper";
import {appointmentSliceActions} from "../../store/apptSlice";

export const EditAppointment = (props) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    const slots = useSelector(state => state.slotSlice.slots);

    const systemTime = useSelector(state => state.timeSlice.time);

    const updateAppointmentSuccess = useSelector(state => state.appointmentSlice.updateAppointmentSuccess);

    const [selectedDate, setSelectedDate] = useState(props.oldTime);

    const [time, setTime] = useState("");

    useEffect(() => {
        dispatch(GetSlots(`${user.email}/${getDate(selectedDate)}`));
    }, [selectedDate]);

    useEffect(() => {
        if (updateAppointmentSuccess) {
            toast.success("Appointment updated", {
                position: "top-left",
                toastId: "appointment-update",
                closeOnClick: true,
                delay: 1
            });
            dispatch(appointmentSliceActions.setUpdateAppointmentSuccess(false));
            dispatch(GetAppointments(user.email));
            props.onHide();
        }
    }, [updateAppointmentSuccess])

    useEffect(() => () => {
        dispatch(appointmentSliceActions.setUpdateAppointmentSuccess(false));
    }, [])

    useEffect(() => {
        // Reload on system time.
    }, [systemTime]);

    const onDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleSlotChange = (t) => {
        setTime(t);
    }

    const handleSubmit = () => {
        appointmentSliceActions.setUpdateAppointmentSuccess(false);
        dispatch(UpdateAppointments(`?appointmentID=${props.appointmentID}&updatedTime=${time}`))
    }

    const clinicSlots = slots?.appointments?.filter(
        (a) => a.clinic.id === props.clinic.id
    );

    return <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Edit appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DatePicker onChange={onDateChange} value={selectedDate}/> <br/>
            <Row>
                <Card>
                    <Card.Body>
                        <Row>
                            <h5 style={{textAlign: "start", paddingLeft: "0"}}>
                                {props.clinic.name}
                            </h5>
                            <Address address={props.clinic.address}/>
                        </Row>
                        <br/>
                        <Row>
                            <Row>
                                {clinicSlots?.[0]?.slots?.[0]?.times?.length === 0 && (
                                    <h6>
                                        No slots are available for this clinic at this time, please select a
                                        future date.
                                    </h6>
                                )}
                                {clinicSlots?.[0]?.slots?.[0]?.times?.map((t) => (
                                    <Fragment>
                                        <Button
                                            style={{width: "100px", marginRight: "3px", marginBottom: "3px"}}
                                            onClick={() => handleSlotChange(t)}
                                            data-key={t}
                                            variant={t === time ? "danger" : "primary"}
                                        >
                                            {" "}
                                            {t.substr(11, 5)}
                                        </Button>
                                    </Fragment>
                                ))}
                            </Row>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" className="btn-danger" onClick={props.onHide}>
                Close
            </Button>
            <Button variant="success" disabled={!time} onClick={handleSubmit}>Book</Button>
        </Modal.Footer>
    </Modal>;
};

const Address = (props) => (
    <Row>
        {props.address.street}, {props.address.city}, {props.address.state},{" "}
        {props.address.zipCode}
    </Row>
);
