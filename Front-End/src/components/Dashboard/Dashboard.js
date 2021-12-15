import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {GetVaccinesInfo} from "../../services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Navigationbar from "../Navigationbar/Navigationbar";
import {Descriptions} from "antd";
import {toPstDate, toPstTime} from "../../common/datehelper";

const Dashboard = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const time = useSelector(state => state.timeSlice.time);

    const vaccineInfo = useSelector(state => state.vaccineSlice.vaccineInfo);

    useEffect(() => {
        dispatch(GetVaccinesInfo(user.email));
    }, [time]);

    return (
        <div>
            {!user && <Navigate to='/'/>}
            <Navigationbar/>
            <Container>
                <br/>
                <br/>
                <Row style={{textAlign: "left"}}>
                    <Time/>
                </Row>
                <br/>
                <Row>
                    <h2 style={{textAlign: "left"}}>Vaccinations Due</h2>
                    <br/>
                    {vaccineInfo?.upcomingVaccines?.length === 0 &&
                    <h6 style={{textAlign: "left"}}>Congrats, no vaccinations due</h6>}
                    {vaccineInfo?.upcomingVaccines?.map(v => <Col xl={5}><VaccineInfo type="due" vaccine={v}/></Col>)}
                </Row>
                <Row>
                    <h2 style={{textAlign: "left"}}>Vaccinations History</h2>
                    <br/>
                    {vaccineInfo?.pastVaccines?.length === 0 &&
                    <h6 style={{textAlign: "left"}}>No vaccinations history</h6>}
                    {vaccineInfo?.pastVaccines?.map(v => <Col xl={5}><VaccineInfo vaccine={v}/></Col>)}
                </Row>
            </Container>
        </div>
    )
}

const Time = () => {

    const time = useSelector(state => state.timeSlice.time);

    const [cur, setCur] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(async () => {
            setCur(new Date());
        }, 5000);

        return () => clearInterval(intervalId); //This is important
    }, []);
    return <>
        <Col><h4>Current World Time: {toPstDate(new Date())}, {toPstTime(new Date())}</h4></Col>
        <Col>
            <h4>Current System Time: {toPstDate(time)}, {toPstTime(time)}</h4>
        </Col>
    </>;
}

const VaccineInfo = (props) => {
    const navigate = useNavigate();
    const time = useSelector(state => state.timeSlice.time);

    return <Card border={"light"}><Descriptions
        bordered
        size="default"
        column={1}
        labelStyle={{backgroundColor: "#3F4045", color: "white"}}
    >
        <Descriptions.Item
            label="Vaccine Name">{props.vaccine.vaccineName}</Descriptions.Item>
        <Descriptions.Item
            label="Shots Due">{props.vaccine.shotsDue}</Descriptions.Item>
        <Descriptions.Item
            label="Appointments">
            <>
                {props.type === "due" && props.vaccine?.appointments?.length === 0 &&
                <Button type={"primary"} onClick={() => navigate("/appointment")}>Schedule</Button>}
                {props.vaccine?.appointments?.map((appt) => {
                    return (
                        <><Card border={"light"} style={{textAlign: "left"}} color="grey" key={appt.id}>
                            {toPstDate(new Date(appt.time))}, {toPstTime(new Date(appt.time))}
                            <br/>
                            {appt.clinic.name}, {appt.clinic.address.city}, {appt.clinic.address.state}
                            <br/>
                            {appt.checkInStatus ?
                                (props.type === "due" ?
                                    <p style={{color: "green"}}>Status: Checked In</p> :
                                    <p style={{color: "green"}}>Status: Vaccinated</p>)
                                : (props.type === "due" ? (new Date(appt.time) - time < 24 * 3600 * 1000 ?
                                        <Link to={"/bookedAppointments"} style={{color: "blue"}}>Status: Check-in
                                            Available</Link> :
                                        <p style={{color: "orange"}}>Status: Not Checked In</p>) :
                                    <p style={{color: "red"}}>Status: No Show</p>)}
                        </Card><br/></>
                    )
                })}
            </>
        </Descriptions.Item>

    </Descriptions><br/><br/></Card>;
}

export default Dashboard;