import React, { useEffect, useState } from "react";
import { Col, Container, Row, ButtonGroup, Modal, Card } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Navigationbar from "../Navigationbar/Navigationbar";
import { Descriptions, Radio, Button } from "antd";
import "./BookedAppointments.css";
import { useDispatch, useSelector } from "react-redux";
import { CheckinAppointments, GetAppointments, GetSlots } from "../../services";
import { Navigate, useNavigate } from "react-router-dom";
import { toPstDate, toPstTime } from "../../common/datehelper";
import {
  GiCheckMark,
  ImCheckboxChecked,
  ImClock,
  ImCross,
  ImPlus,
  MdPlaylistAdd,
  IoOptions,
} from "react-icons/all";
import ReactTooltip from "react-tooltip";
import { appointmentSliceActions } from "../../store/apptSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getDate } from "../../common/datehelper";
import { EditAppointment } from "./EditAppointment";

const BookedAppointments = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.user);

  const time = useSelector((state) => state.timeSlice.time);

  const [radioButtonStatus, setRadioButtonStatus] = useState("upcoming");
  const appointments = useSelector(
    (state) => state.appointmentSlice.appointment
  );

  useEffect(() => {
    dispatch(GetAppointments(user.email));
  }, [time]);

  useEffect(() => {
    // Reload
  }, [appointments]);

  const onRadioButtonChange = (e) => {
    setRadioButtonStatus(e.target.value);
  };

  const future = appointments?.filter(
    (appointment) => new Date(appointment.time) > time
  );
  const past = appointments?.filter(
    (appointment) => new Date(appointment.time) <= time
  );

  return (
    <div>
      {!user && <Navigate to="/" />}
      <Navigationbar />
      <Container>
        <Row style={{ textAlign: "left" }}>
          <Row style={{ display: "flex", alignItems: "baseline" }}>
            <Col style={{ flex: "0 1 20%" }}>
              <h1
                style={{
                  textAlign: "left",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                Appointments
              </h1>
            </Col>
            <Col style={{ flex: "0 1 10%", marginBottom: "20px" }}>
              <h1>
                <MdPlaylistAdd
                  size={50}
                  color={"blue"}
                  onClick={() => navigate("/appointment")}
                />
              </h1>
            </Col>
          </Row>
          <Radio.Group
            id="radio-group"
            onChange={onRadioButtonChange}
            value={radioButtonStatus}
          >
            <Radio className="radio-buttons" value="upcoming">
              Upcoming appointments
            </Radio>
            <Radio className="radio-buttons" value="past">
              Past appointments
            </Radio>
          </Radio.Group>
        </Row>
        <br />
        <Row>
          <div>
            {radioButtonStatus === "upcoming" && (
              <Appointments type={"upcoming"} appointments={future} />
            )}
            {radioButtonStatus === "past" && (
              <Appointments type={"past"} appointments={past} />
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
};

const Appointments = (props) => {
  return (
    <div>
      {props.appointments?.map((appointment) => {
        return (
          <div key={appointment.id}>
            <AppointmentItem type={props.type} appointment={appointment} />
            <br />
          </div>
        );
      })}
      {props.appointments?.length === 0 && <h6>No appointments available</h6>}
    </div>
  );
};

const AppointmentItem = (props) => {
  const user = useSelector((state) => state.userSlice.user);
  const time = useSelector((state) => state.timeSlice.time);
  const slots = useSelector((state) => state.slotSlice.slots);
  const [selectedDate, setSelectedDate] = useState(time);
  let mySlots = slots
    ? slots.appointments.filter(
        (a) => a.clinic.id === props.appointment.clinic.id
      )
    : [];
  const checkinSuccess = useSelector(
    (state) => state.appointmentSlice.checkinSuccess
  );
  // const [checkInStatus, setCheckin] = useState(props.appointment.checkInStatus);

  const [render, setRender] = useState();
  useEffect(() => {
    dispatch(GetAppointments(user.email));
  }, [render]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAppointments(user.email));
  }, [checkinSuccess]);

  useEffect(() => {
    dispatch(GetSlots(getDate(selectedDate)));
  }, [selectedDate]);

  const checkInFunc = (e) => {
    e.preventDefault();
    appointmentSliceActions.setCheckinSuccess(false);
    dispatch(CheckinAppointments(`?appointmentId=${props.appointment.id}`));
  };

  const [editMenu, setEditMenu] = useState(false);
  const editFunc = (e) => {
    console.log("Attempted to edit.");
    console.log(mySlots);
    setEditMenu(true);
  };

  const closeEditMenu = () => {
    setEditMenu(false);
  };

  const deleteFunc = (e) => {
    e.preventDefault();
    console.log("Attempted to delete");
    console.log(props.appointment.id);

    axios
      .post("/appointment/delete", null, {
        params: { appointmentID: props.appointment.id },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("here");
          toast.success("Appointment Deleted Successfully.", {
            position: "top-left",
            closeOnClick: true,
            delay: 1,
            autoClose:1500,
            onClose:()=>setRender(!render)
          });
        //   setRender(!render)
        } else {
          toast.error("Failed to delete appointment.", {
            position: "top-left",
            closeOnClick: true,
            delay: 1,
            autoClose:2000,
            onClose:()=>setRender(!render),
          });
        }
      });
  };

  const checkIn =
    props.type === "upcoming" ? (
      props.appointment.checkInStatus ? (
        <ImCheckboxChecked
          data-tip
          data-for="upcoming"
          color={"blue"}
          size={18}
        />
      ) : (
        <ImClock
          data-tip
          data-for="upcomingNoCheckin"
          color={"blue"}
          size={18}
        />
      )
    ) : props.appointment.checkInStatus ? (
      <ImCheckboxChecked
        data-tip
        data-for="checkedIn"
        color={"green"}
        size={18}
      />
    ) : (
      <ImCross data-tip data-for="noShow" color={"red"} size={18} />
    );

  const checkInButton = props.type === "upcoming" &&
    !props.appointment.checkInStatus &&
    // If time is within next 24 hours, allow checkin
    new Date(props.appointment.time) - time < 24 * 3600 * 1000 && (
      <Button style={{ backgroundColor: "wheat" }} onClick={checkInFunc}>
        <GiCheckMark color={"green"} size={20} />
        Check-in
      </Button>
    );

  const menu = props.type === "upcoming" && (
    <div style={{ marginTop: "2vh" }}>
      <ButtonGroup>
        <Button onClick={deleteFunc} variant="danger" className="btn-danger">
          Delete
        </Button>
        <Button onClick={editFunc} variant="primary" className="btn-primary">
          Edit
        </Button>
      </ButtonGroup>
    </div>
  );

  const onDateChange = (date) => {
    setSelectedDate(date);
    mySlots = slots
      ? slots.appointments.filter(
          (a) => a.clinic.id === props.appointment.clinic.id
        )
      : [];
  };

  const modal = props.type === "upcoming" && (
    <Modal show={editMenu} onHide={closeEditMenu}>
      <Modal.Header closeButton>
        <Modal.Title>Edit appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DatePicker onChange={onDateChange} value={selectedDate} /> <br />
        {mySlots.length > 0 ? (
          <EditAppointment
            appointment={mySlots[0]}
            closeModal={closeEditMenu}
            render={render}
            setRender={setRender}
          />
        ) : (
          <h4>
            <br />
            No slots at the current time.
          </h4>
        )}
        {/* {console.log(mySlots)} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="btn-danger" onClick={closeEditMenu}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
        <ToastContainer/>
      <ReactTooltip id="checkedIn" type="success">
        <span>Appointment honored</span>
      </ReactTooltip>
      <ReactTooltip id="upcomingNoCheckin" type="info">
        <span>Appointment upcoming</span>
      </ReactTooltip>
      <ReactTooltip id="upcoming" type="info">
        <span>All set for the appointment</span>
      </ReactTooltip>
      <ReactTooltip id="noShow" type="error">
        <span>No show</span>
      </ReactTooltip>
      <Descriptions
        bordered
        size="default"
        labelStyle={{ backgroundColor: "#3F4045", color: "white" }}
      >
        <Descriptions.Item label="Clinic">
          {props.appointment.clinic.name} {checkIn} {checkInButton}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {toPstDate(new Date(props.appointment.time))}
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {toPstTime(new Date(props.appointment.time))}
        </Descriptions.Item>
        <Descriptions.Item label="Vaccines">
          {props.appointment.vaccines.map((vaccine) => {
            return (
              <div className="vaccines" key={vaccine.name}>
                Name: {vaccine.name}
                <br />
                Number Of Shots: {vaccine.numberOfShots}
              </div>
            );
          })}
          {menu}
          {modal}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default BookedAppointments;
