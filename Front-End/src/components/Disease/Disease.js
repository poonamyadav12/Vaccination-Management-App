import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Disease.css";

const Disease = () => {
  const [disease, setDisease] = useState({
    name: "",
    description: "",
  });

  const onSubmit = (e) => {
    //Add Create Disease
    debugger
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
                    src={`${window.location.origin}/disease.svg`}
                    alt="Disease"
                  />
                </div>
              </Col>
              <Col>
                <Form id="login-form" onSubmit={onSubmit}>
                  <h1>Add Disease</h1>
                  <Form.Group className="loginbox" controlId="formEmail">
                    <Form.Label>Enter Disease name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Disease Name"
                      required
                      onChange={(e) =>
                        setDisease({ ...disease, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Label>Enter Disease Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Enter Disease Description"
                      required
                      onChange={(e) =>
                        setDisease({ ...disease, description: e.target.value })
                      }
                    />
                  </Form.Group>
                  <br />
                  <Button id="loginbutton" type="submit">
                    Create Disease
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

export default Disease;
