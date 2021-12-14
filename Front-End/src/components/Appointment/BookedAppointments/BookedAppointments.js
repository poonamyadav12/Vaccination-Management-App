import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navigationbar from "../../Navigationbar/Navigationbar";
import { Descriptions, Radio, Button } from 'antd';
import './BookedAppointments.css';

const BookedAppointments = () => {
    const [emailId, setEmailId] = useState("john@gmail.com");
    const [checkedInAppointments, setCheckedInAppointments] = useState([]);
    const [noShowAppointments, setNoShowAppointments] = useState([]);
    const [radioButtonStatus, setRadioButtonStatus] = useState("checkedin")

    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(`http://localhost:8080/appointments/${emailId}`)
            setCheckedInAppointments(data.data.filter((appointment) => appointment.checkInStatus === true));
            setNoShowAppointments(data.data.filter((appointment) => appointment.checkInStatus === false));
        }
        getData();
    }, [emailId])

    const onRadioButtonChange = (e) => {
        setRadioButtonStatus(e.target.value);
    }

    return (
        <div>
            <Navigationbar />
            <Container>
                <h1 style={{ textAlign: "left", marginTop: "10px", marginLeft: "10px" }}>Appointments Information</h1>
                <Radio.Group id="radio-group" onChange={onRadioButtonChange} value={radioButtonStatus}>
                    <Radio className="radio-buttons" value="checkedin">Checked-In</Radio>
                    <Radio className="radio-buttons" value="noshow">No-Show</Radio>
                </Radio.Group>
                {radioButtonStatus === "checkedin" && <Appointments appointments={checkedInAppointments} />}
                {radioButtonStatus === "noshow" && <Appointments appointments={noShowAppointments} />}
            </Container>
        </div>
    )
}

const Appointments = (props) => {
    console.log(props)
    return (
        <div>
            {props.appointments.map((appointment) => {
                return (
                    <div key={appointment.id}>
                        <AppointmentItem appointment={appointment} />
                        <br />
                    </div>
                )
            }
            )}
        </div>
    )
}

const AppointmentItem = (props) => {
    return (
        <div>
            <Descriptions
                bordered
                size="default"
                labelStyle={{backgroundColor:"#3F4045", color:"white"}}
            >
                <Descriptions.Item label="Clinic">{props.appointment.clinic.name}</Descriptions.Item>
                <Descriptions.Item label="Date">{new Date(props.appointment.time).toDateString()}</Descriptions.Item>
                <Descriptions.Item label="Time">{new Date(props.appointment.time).toTimeString()}</Descriptions.Item>
                <Descriptions.Item label="Vaccines">
                    {props.appointment.vaccines.map((vaccine) => {
                        return (
                            <div className="vaccines" key={vaccine.name}>
                                Name: {vaccine.name}
                                <br />
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