import {Button, Card, Row} from "react-bootstrap";
import {getTime} from "../../common/datehelper";

export const ClinicAppointment = (props) => {
    return (
        <>
            <Row>
                <ClinicView clinic={props?.appointment?.clinic} slots={props?.appointment?.slots}/>
            </Row>
        </>
    );
}

const ClinicView = (props) => (

    <Card>
        <Card.Body>
            <Row>
                <h5 style={{textAlign: "start", paddingLeft: "0"}}>{props.clinic.name}</h5>
                <Address address={props.clinic.address}/>
            </Row>
            <br/>
            <Row>
                <Slots slots={props.slots}/>
            </Row>
        </Card.Body>
    </Card>
)

const Address = (props) => (
    <Row>
        {props.address.street}, {props.address.city}, {props.address.state}, {props.address.zipCode}
    </Row>
)

const Slots = (props) => (
    <Row>
        {props.slots?.[0]?.times?.length === 0 &&
        <h6>No slots are available for this clinic at this time, please select a future date.</h6>}
        {props.slots?.[0].times?.map(time =>
            (<>
                <Button style={{width: "100px", marginRight: "3px", marginBottom: "3px"}}> {time.substr(11, 5)}</Button>
            </>))}
    </Row>
)