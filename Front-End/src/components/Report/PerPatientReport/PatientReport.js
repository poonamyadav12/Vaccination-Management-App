import Navigationbar from "../../Navigationbar/Navigationbar"
import {Container, Row, Col, Figure, Card} from 'react-bootstrap';
import {DatePicker, Space, Button} from 'antd';
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import ReportComponent from '../ReportComponent';
import {useDispatch, useSelector} from "react-redux";
import {GetUserReport} from "../../../services";
import * as moment from 'moment';
import {Navigate} from "react-router-dom";

const {RangePicker} = DatePicker;

const PatientReport = () => {

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 365);

    const initialStartMoment = new moment();

    initialStartMoment.subtract(30, "d");

    const initialEndMoment = new moment();

    const [moments, setMoments] = useState([initialStartMoment, initialEndMoment]);

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const userReport = useSelector(state => state.userSlice.userReport);

    const onDateChange = (m) => {
        setMoments(m);
    }

    const onGenerateReport = () => {
        dispatch(GetUserReport(`${user.email}/${moments[0].toDate().toISOString()}/${moments[1].toDate().toISOString()}`));
    }

    useEffect(() => {
        //Reload on new user report.
    }, [userReport]);

    useEffect(() => {
        dispatch(GetUserReport(`${user.email}/${moments[0].toDate().toISOString()}/${moments[1].toDate().toISOString()}`));
    }, [])

    return (
        <div>
            {!user && <Navigate to='/' />}
            <Navigationbar/>
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col style={{flex: "0 1 30%"}}>
                                <div id="login-image">
                                    <Figure.Image
                                        src={`${window.location.origin}/patientreport.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h1 style={{marginTop: "30px", marginRight: "70px"}}>Generate Patient Report</h1>
                                <br/>
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col style={{marginLeft: "80px"}}>
                                            <Space direction="vertical" size={12}>
                                                <RangePicker
                                                    defaultValue={moments}
                                                    disabledDate={d => !d || d.isBefore(minDate) || d.isAfter(maxDate)}
                                                    onChange={onDateChange}/>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Button style={{backgroundColor: "#343971", color: "rgb(238, 238, 238)"}}
                                                    onClick={onGenerateReport}>Generate</Button>
                                        </Col>
                                    </Row>
                                    <br/>
                                </Card>
                                <Row style={{marginTop: "20px"}}>
                                    <ReportComponent report={userReport}/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default PatientReport;