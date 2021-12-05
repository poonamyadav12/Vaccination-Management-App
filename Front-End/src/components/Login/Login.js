import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import Navigationbar from "../Navigationbar/Navigationbar";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../store/userSlice";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../common/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  //const history = useHistory();

  //   useEffect(() => {
  //     if (loading) {
  //       return;
  //     }
  //     if (user) history.replace("/dashboard");
  //   }, [user, loading]);

  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    dispatch(userSliceActions.setEmail(e.target.value));
  };
  const onChangePassword = (e) => {
    dispatch(userSliceActions.setPassword(e.target.value));
  };

  return (
    <div>
      <Navigationbar />
      <div className="container">
        <Container>
          <div>
            <Row>
              <Col>
                <div id="login-image">
                  <Figure.Image src={`${window.location.origin}/login.svg`} />
                </div>
              </Col>
              <Col>
                <Form id="login-form" method="post">
                  <h1>Login</h1>
                  <p>Enter your details to login</p>
                  <Form.Group className="loginbox" controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="loginbox" controlId="formPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button
                    id="loginbutton"
                    type="submit"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                  >
                    Submit
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

export default Login;
