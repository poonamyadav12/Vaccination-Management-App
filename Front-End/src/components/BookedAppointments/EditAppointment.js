import { Button, Card, Row } from "react-bootstrap";
import { Fragment, useState } from "react";
import { BookModal } from "../Appointment/BookModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const EditAppointment = (props) => {
  return (
    <>
      <Row>
        <ClinicView
          clinic={props?.appointment?.clinic}
          slots={props?.appointment?.slots}
          closeModal={props.closeModal}
          render={props.render}
          setRender={props.setRender}
          appointmentID={props.appointmentID}
        />
      </Row>
    </>
  );
};

const ClinicView = (props) => (
  <Card>
    <Card.Body>
      <Row>
        <h5 style={{ textAlign: "start", paddingLeft: "0" }}>
          {props.clinic.name}
        </h5>
        <Address address={props.clinic.address} />
      </Row>
      <br />
      <Row>
        <Slots
          slots={props.slots}
          clinic={props.clinic}
          closeModal={props.closeModal}
          render={props.render}
          setRender={props.setRender}
          appointmentID={props.appointmentID}
        />
      </Row>
    </Card.Body>
  </Card>
);

const Address = (props) => (
  <Row>
    {props.address.street}, {props.address.city}, {props.address.state},{" "}
    {props.address.zipCode}
  </Row>
);

const Slots = (props) => {
  return (
    <Row>
      {props.slots?.[0]?.times?.length === 0 && (
        <h6>
          No slots are available for this clinic at this time, please select a
          future date.
        </h6>
      )}
      {props.slots?.[0].times?.map((time) => (
        <SingleSlot
          time={time}
          clinic={props.clinic}
          closeModal={props.closeModal}
          render={props.render}
          setRender={props.setRender}
          appointmentID={props.appointmentID}
        />
      ))}
    </Row>
  );
};

const SingleSlot = (props) => {
  const handleChange = (e) => {
    console.log(typeof e.target.dataset.key);
    console.log(props);
    const body = {
      appointmentID: props.appointmentID,
      updatedTime: e.target.dataset.key,
    };
    console.log(body)
    console.log(e.target.dataset.key);
    console.log(props.time)

    axios.post("/appointment/update", body,{params:body}).then((response) => {
      if (response.status === 200) {
        //success handling
        props.closeModal();
        toast.success("Appointment Edited Successfully.", {
          position: "top-left",
          closeOnClick: true,
          delay: 1,
          autoClose: 1500,
          onClose: () => {
            props.setRender(!props.render);
          },
        });
      } else {
        //error handling
        props.closeModal();
        toast.error("Appointment Failed to edit.", {
          position: "top-left",
          closeOnClick: true,
          delay: 1,
          autoClose: 1500,
          onClose: () => {
            props.setRender(!props.render);
          },
        });
      }
    });
  };
  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Button
        style={{ width: "100px", marginRight: "3px", marginBottom: "3px" }}
        onClick={handleChange}
        data-key={props.time}
      >
        {" "}
        {props.time.substr(11, 5)}
      </Button>
    </Fragment>
  );
};
