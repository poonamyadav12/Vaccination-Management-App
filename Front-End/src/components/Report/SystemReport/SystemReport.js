import Navigationbar from "../../Navigationbar/Navigationbar"
import { Container, Row, Col, Figure, Card } from 'react-bootstrap';
import { DatePicker, Space, Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SystemReport = () => {
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
                                <h1 style={{marginTop:"30px", marginRight: "70px"}}>Generate System Report</h1>
                                <br />
                                <Card className={"border-0"}>
                                    <Row>
                                        <Col>
                                            <Select defaultValue="Select Clinic" style={{textAlign: "left", paddingRight: "5px"}}>
                                                <Option value="Select Clinic" disabled>Select Clinic</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yimingheeeeeeeeeeeeeeeeeeeeeeee</Option>
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Space direction="vertical" size={12}>
                                                <RangePicker defaultPickerValue={currentDate} disabledDate={d => !d || d.isBefore(currentDate) || d.isAfter(maxDate)} />
                                            </Space>
                                        </Col>
                                    </Row>
                                    <br />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default SystemReport;