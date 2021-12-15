import Navigationbar from "../../Navigationbar/Navigationbar"
import { Container, Row, Col, Figure, Card } from 'react-bootstrap';
import { DatePicker, Space, Select, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from "react";
import ReportComponent from '../ReportComponent';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SystemReport = () => {
    const [clinicName, setClinicName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onClinicSelect = (e) => {
        setClinicName(e);
    }

    const onDateChange = (e) => {
        const dates = e;
        setStartDate(dates[0]._d);
        setEndDate(dates[1]._d);
    }

    const onGenerateReport = () => {
        const data = {
            clinicName,
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
                                        src={`${window.location.origin}/systemreport.svg`}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h1 style={{ marginTop: "30px", marginRight: "70px" }}>Generate System Report</h1>
                                <br />
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col>
                                            <Select defaultValue="Select Clinic" style={{ textAlign: "left", paddingRight: "5px" }} onSelect={onClinicSelect}>
                                                <Option value="Select Clinic" disabled>Select Clinic</Option>
                                                <Option value="Sutter Health">Sutter Health</Option>
                                                <Option value="Washington Health">Washington Health</Option>
                                            </Select>
                                        </Col>
                                        <Col>
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

export default SystemReport;