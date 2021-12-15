import {useEffect, useState} from "react";
import {Button, InputGroup, Modal, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {CreateAppointments, GetDueVaccines} from "../../services";
import {toast} from "react-toastify";
import {userSliceActions} from "../../store/userSlice";
import {appointmentSliceActions} from "../../store/apptSlice";
import {useNavigate} from "react-router-dom";
import {vaccineSliceActions} from "../../store/vaccineSlice";

export const BookModal = (props) => {
    const [vaccines, setVaccines] = useState([]);

    const user = useSelector(state => state.userSlice.user);

    const dueVaccines = useSelector(state => state.vaccineSlice.dueVaccines);

    const isCreateAppointmentSuccess = useSelector(state => state.appointmentSlice.createAppointmentSuccess);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(GetDueVaccines(user.email,`?bookingDateTime=${new Date(props.time)}`));
        return () => {
            dispatch(appointmentSliceActions.setCreateAppointmentSuccess(false));
            dispatch(vaccineSliceActions.clearDueVaccines(null));
        }
    }, []);

    useEffect(() => {
        // Just reload the component
    }, [dueVaccines]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateAppointments(`?userID=${user.medicalRecordNumber}&clinicID=${props.clinic.id}&bookingTime=${props.time}&vaccineID=${vaccines.map(v => v.vaccineId).join(',')}`));
    }

    useEffect(() => {
        if (isCreateAppointmentSuccess) {
            toast.success('Appointment creation successful', {position: "top-left", closeOnClick: true, delay: 1});
            dispatch(appointmentSliceActions.setCreateAppointmentSuccess(false));
            setTimeout(() => {
                navigate('/bookedappointments')
            }, 2000)
        }
    }, [isCreateAppointmentSuccess])

    const toggleVaccine = (v1) => {
        const isPresent = vaccines.some(v => v.vaccineId === v1.vaccineId);
        if (isPresent) {
            setVaccines(vaccines.filter(v => v.vaccineId !== v1.vaccineId));
        } else {
            setVaccines([...vaccines, v1]);
        }
    }

    return <>
        <Modal
            show={props.isOpen}
            onHide={props.closeModal}
            keyboard={false}
            className="book-modal"
            backdrop="static"
            animation={false}
            style={{width: "100vw"}}
        >
            <Modal.Header closeButton>
                <Modal.Title><h2>Confirm appointment</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Appointment time : {new Date(props.time).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</h5>
                <br/>
                {(dueVaccines && dueVaccines.length === 0) && "No vaccine is due"}
                {dueVaccines?.map(vacc => <>
                    <InputGroup>
                        <InputGroup.Checkbox
                            defaultChecked={vaccines.some(v => v.vaccineId === vacc.vaccineId)}
                            onChange={() => toggleVaccine(vacc)}/>
                        &nbsp;<h5>{`${vacc.name}`}</h5>
                    </InputGroup>
                </>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Cancel
                </Button>
                <Button variant="success" disabled={vaccines.length <= 0} onClick={handleSubmit}>Book</Button>
            </Modal.Footer>
        </Modal>
    </>
}
