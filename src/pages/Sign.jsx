import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/home.css";
import logo from "../assets/images/Logo.png";
import background from "../assets/images/bgProfile.jpg";
import { Button, Form, Alert } from "react-bootstrap";

function Sign() {
  document.title = `Login`;

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      console.log(response);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response?.status === 200) {
          navigate("/data");
        } else {
          navigate("/login");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed ! Periksa Email atau password
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "#E5E5E5" }}
        className="background px-0"
      >
        <div className="homeText w-50 ">
          <Container>
            <Form
              style={{ margin: "8rem 0 0 6rem", padding: "0 250px 0 0" }}
              onSubmit={(e) => {
                handleSubmit.mutate(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicUser">
                <h1 className="mb-3">Silahkan Masuk</h1>
                {message && message}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masuk email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                style={{ backgroundColor: "#EF4524", border: "none" }}
              >
                Masuk
              </Button>
            </Form>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Sign;
