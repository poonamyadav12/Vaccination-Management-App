import {Button, Card, Row} from "react-bootstrap";
import {Fragment, useState} from "react";
import {BookModal} from "./BookModal";

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
                <Slots slots={props.slots} clinic={props.clinic}/>
            </Row>
        </Card.Body>
    </Card>
)

const Address = (props) => (
    <Row>
        {props.address.street}, {props.address.city}, {props.address.state}, {props.address.zipCode}
    </Row>
)

const Slots = (props) => {

    return <Row>
        {props.slots?.[0]?.times?.length === 0 &&
        <h6>No slots are available for this clinic at this time, please select a future date.</h6>}
        {props.slots?.[0].times?.map(time => <SingleSlot time={time} clinic={props.clinic} />)}
    </Row>
}

const SingleSlot = (props) => {
    const [isBookOpen, setBookOpen] = useState(false);

    return <Fragment>
        <Button style={{width: "100px", marginRight: "3px", marginBottom: "3px"}}
                onClick={() => setBookOpen(true)}> {props.time.substr(11, 5)}</Button>
        {isBookOpen ? (
            <BookModal
                time={props.time}
                clinic={props.clinic}
                closeModal={() => setBookOpen(false)}
                isOpen={() => setBookOpen(true)}
            />
        ) : null}
    </Fragment>;
}