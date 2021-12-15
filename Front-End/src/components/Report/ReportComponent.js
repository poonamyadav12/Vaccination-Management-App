import { Descriptions } from "antd";

const ReportComponent = () => {
    return (
        <div>
            <Descriptions
        bordered
        size="default"
        labelStyle={{ backgroundColor: "#3F4045", color: "white", width:"300px" }}
        column= {1}
      >
        <Descriptions.Item label="Total Appointments">
          4
        </Descriptions.Item>
        <Descriptions.Item label="Total No Show Appointments">
          2
        </Descriptions.Item>
        <Descriptions.Item label="No-Show Rate">
          0.5
        </Descriptions.Item>
      </Descriptions>
        </div>
    )
}

export default ReportComponent;