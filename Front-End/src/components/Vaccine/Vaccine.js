import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CreateVaccine, GetDisease } from "../../services";
import { vaccineSliceActions } from "../../store/vaccineSlice";
import { Navigate } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Select from "react-select";
import axios from "axios";
import "./Vaccine.css";

const Vaccine = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSlice.user);

  const disease = useSelector((state) => state.diseaseSlice.disease);

  const error = useSelector((state) => state.vaccineSlice.error);

  const isSuccess = useSelector((state) => state.vaccineSlice.isSuccess);

  useEffect(() => {
    dispatch(GetDisease(""));
  }, []);

  useEffect(() => {
    getAllDiseases();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-left", closeOnClick: true });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Vaccine added successfully", {
        position: "top-left",
        closeOnClick: true,
        delay: 1,
      });
      dispatch(vaccineSliceActions.setIsSuccess(false));
    }
  }, [isSuccess]);

  const [vaccine, setVaccine] = useState({
    name: "",
    diseasesIds: [],
    manufacturer: "",
    numberOfShots: "",
    shotIntervalVal: "",
    duration: "",
  });

  const [diseases, setDiseases] = useState([]);

  const onSubmit = (e) => {
    //Add Create Vaccine
    debugger;
    e.preventDefault();
    axios
      .post(`http://localhost:8080/vaccine`, vaccine)
      .then((data) => {
        if (data.status == 200) {
          toast.success("Vaccine added successfully", {
            position: "top-left",
            closeOnClick: true,
            delay: 1,
          });
        } else {
          toast.success("Error in Vaccine Creation", {
            position: "top-left",
            closeOnClick: true,
            delay: 1,
          });
        }
      })
      .catch((err) => {
        debugger;
        console.log(err);
        toast.success("Error in Vaccine Creation", {
          position: "top-left",
          closeOnClick: true,
          delay: 1,
        });
      });
  };

  const onDiseaseChange = (diseases) => {
    vaccine.diseasesIds = [];
    diseases.forEach((element) => {
      vaccine.diseasesIds.push(element.value);
    });
  };

  const getAllDiseases = async () => {
    axios
      .get(`http://localhost:8080/disease`)
      .then((data) => {
        setDiseases(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!user && <Navigate to="/" />}
      <Navigationbar />
      <ToastContainer />
      <div className="container">
        <Container>
          <div>
            <Row>
              <Col>
                <div id="login-image">
                  <Figure.Image
                    src={`${window.location.origin}/vaccine2.jpg`}
                    alt="Disease"
                  />
                </div>
              </Col>
              <Col>
                <Form id="login-form" onSubmit={onSubmit}>
                  <h1>Add Vaccine</h1>
                  <Form.Group className="loginbox" controlId="formEmail">
                    <Form.Label>Enter Vaccine name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Vaccine Name"
                      required
                      onChange={(e) =>
                        setVaccine({ ...vaccine, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formEmail">
                    <Form.Label>Disease</Form.Label>
                    <Select
                      closeMenuOnSelect={false}
                      options={diseases.map((e) => ({
                        label: e.name,
                        value: e.diseaseId,
                      }))}
                      isMulti
                      onChange={onDiseaseChange}
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Label>Enter Vaccine Manufacturer</Form.Label>
                    <Form.Control
                      type="text"
                      name="manufacturer"
                      placeholder="Enter Vaccine Manufacturer"
                      required
                      onChange={(e) =>
                        setVaccine({ ...vaccine, manufacturer: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Label>Number of Shots</Form.Label>
                    <Form.Control
                      type="text"
                      name="numShots"
                      placeholder="Number of Shots"
                      required
                      onChange={(e) =>
                        setVaccine({
                          ...vaccine,
                          numberOfShots: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Label>Shot Interval</Form.Label>
                    <Form.Control
                      type="text"
                      name="shotInterval"
                      placeholder="Shot Interval"
                      required
                      onChange={(e) =>
                        setVaccine({
                          ...vaccine,
                          shotIntervalVal: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Label>Vaccine Validity</Form.Label>
                    <Form.Control
                      type="text"
                      name="manufacturer"
                      placeholder="Vaccine Validity"
                      required
                      onChange={(e) =>
                        setVaccine({ ...vaccine, duration: e.target.value })
                      }
                    />
                  </Form.Group>
                  <br />
                  <Button id="loginbutton" type="submit">
                    Create Vaccine
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Vaccine;
