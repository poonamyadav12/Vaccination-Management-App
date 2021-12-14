import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CreateDisease } from "../../services";
import { diseaseSliceActions } from "../../store/diseaseSlice";
import { Navigate } from "react-router-dom";
import "./Disease.css";

const Disease = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSlice.user);

  const error = useSelector((state) => state.diseaseSlice.error);

  const isSuccess = useSelector((state) => state.diseaseSlice.isSuccess);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-left", closeOnClick: true });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Disease added successfully", {
        position: "top-left",
        closeOnClick: true,
        delay: 1,
      });
      dispatch(diseaseSliceActions.setIsSuccess(false));
    }
  }, [isSuccess]);

  const [disease, setDisease] = useState({
    name: "",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateDisease(disease));
    dispatch(diseaseSliceActions.setError(""));
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
