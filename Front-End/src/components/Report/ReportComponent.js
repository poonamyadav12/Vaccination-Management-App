import {Descriptions} from "antd";

const ReportComponent = (props) => {
    return (
        <div>
            <Descriptions
                bordered
                size="default"
                labelStyle={{backgroundColor: "#3F4045", color: "white", width: "300px"}}
                column={1}
            >
                <Descriptions.Item label="Total Appointments">
                    {props.report?.total}
                </Descriptions.Item>
                <Descriptions.Item label="Total No Show Appointments">
                    {props.report?.noShow}
                </Descriptions.Item>
                <Descriptions.Item label="No-Show Rate">
                    {props.report?.rate}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ReportComponent;