import Navigationbar from "../../Navigationbar/Navigationbar"
import {Container, Row, Col, Figure, Card} from 'react-bootstrap';
import {DatePicker, Space, Select, Button} from 'antd';
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import ReportComponent from '../ReportComponent';
import {useDispatch, useSelector} from "react-redux";
import {GetClinic, GetClinicReport, GetSlots, GetUserReport} from "../../../services";
import * as moment from "moment";
import {Navigate} from "react-router-dom";

const {Option} = Select;
const {RangePicker} = DatePicker;

const SystemReport = () => {

    const user = useSelector(state => state.userSlice.user);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 365);

    const initialStartMoment = new moment();
    initialStartMoment.subtract(30, "d");

    const initialEndMoment = new moment();

    const [moments, setMoments] = useState([initialStartMoment, initialEndMoment]);

    const [clinicName, setClinicName] = useState("Select Clinic");

    const dispatch = useDispatch();

    const systemReport = useSelector(state => state.appointmentSlice.systemReport);

    const clinics = useSelector(state => state.clinicSlice.clinics);

    const onClinicSelect = (e) => {
        setClinicName(e);
    }

    const onDateChange = (m) => {
        setMoments(m);
    }

    const onGenerateReport = () => {
        dispatch(GetClinicReport(`${encodeURIComponent(clinicName)}/${moments[0].toDate().toISOString()}/${moments[1].toDate().toISOString()}`));
    }

    useEffect(() => {
        //Reload on new user report.
        dispatch(GetClinic(""))
    }, []);


    useEffect(() => {
        //Reload on new user report.
    }, [systemReport]);

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
                                        src={`${window.location.origin}/systemreport.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h1 style={{marginTop: "30px", marginRight: "70px"}}>Generate System Report</h1>
                                <br/>
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col>
                                            <Select defaultValue={clinicName}
                                                    style={{textAlign: "left", paddingRight: "5px"}}
                                                    onSelect={onClinicSelect}>
                                                <Option value="Select Clinic" disabled>Select Clinic</Option>
                                                {clinics?.map(c => <Option value={c.name}>{c.name}</Option>)}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Space direction="vertical" size={12}>
                                                <RangePicker
                                                    defaultValue={moments}
                                                    disabledDate={d => !d || d.isBefore(minDate) || d.isAfter(maxDate)}
                                                    onChange={onDateChange}/>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Button style={{backgroundColor: "#343971", color: "rgb(238, 238, 238)"}}
                                                    hidden={clinicName === "Select Clinic"}
                                                    onClick={onGenerateReport}>Generate</Button>
                                        </Col>
                                    </Row>
                                    <br/>
                                </Card>
                                <Row style={{marginTop: "20px"}}>
                                    <ReportComponent report={systemReport}/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default SystemReport;