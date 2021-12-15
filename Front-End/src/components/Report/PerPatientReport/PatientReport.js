import Navigationbar from "../../Navigationbar/Navigationbar"
import { Container, Row, Col, Figure, Card } from 'react-bootstrap';
import { DatePicker, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from "react";
import ReportComponent from '../ReportComponent';

const { RangePicker } = DatePicker;

const PatientReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onDateChange = (e) => {
        const dates = e;
        setStartDate(dates[0]._d);
        setEndDate(dates[1]._d);
    }

    const onGenerateReport = () => {
        const data = {
            startDate,
            endDate
        }
        console.log(data);
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);

    return (
        <div>
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col style={{ flex: "0 1 30%" }}>
                                <div id="login-image">
                                    <Figure.Image
                                        src={`${window.location.origin}/patientreport.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h1 style={{ marginTop: "30px", marginRight: "70px" }}>Generate Patient Report</h1>
                                <br />
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col style={{marginLeft: "80px"}}>
                                            <Space direction="vertical" size={12}>
                                                <RangePicker defaultPickerValue={currentDate} disabledDate={d => !d || d.isBefore(currentDate) || d.isAfter(maxDate)} onChange={onDateChange} />
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Button style={{backgroundColor: "#343971", color: "rgb(238, 238, 238)"}} onClick={onGenerateReport}>Generate</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                </Card>
                                <Row style={{marginTop:"20px"}}>
                                    <ReportComponent />
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