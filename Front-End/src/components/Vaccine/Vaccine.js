import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Vaccine = () => {
  const [vaccine, setVaccine] = useState({
    name: "",
    disease: {},
    manufacturer: "",
    number_of_shots: "",
    shot_interval_val: "",
    duration: "",
  });

  const onSubmit = (e) => {
    //Add Create Vaccine
    debugger;
  };

  return (
    <div>
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
                    <Form.Label>Enter Disease name</Form.Label>
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
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) =>
                        setVaccine({ ...vaccine, disease: e.target.value })
                      }
                    >
                      <option>Select Disease</option>
                      <option value="COVID">COVID</option>
                      <option value="Measles">Measles</option>
                      <option value="Rubella">Rubella</option>
                    </Form.Select>
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
                          number_of_shots: e.target.value,
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
                          shot_interval_val: e.target.value,
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
