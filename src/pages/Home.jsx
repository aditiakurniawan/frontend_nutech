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

function Home() {
  document.title = `Home`;

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = form;

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

      const response = await API.post("/register", body, config);
      console.log(response);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response?.status === 200) {
          navigate("/login");
        } else {
          navigate("/");
        }
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setMessage({
          email: "",
          password: "",
          fullName: "",
        });
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Registrasi Success ! Silahkan Login
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
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
                <h1 className="mb-3">SELAMAT DATANG</h1>
                {message && message}
                <Form.Label>Username</Form.Label>
                <Form.Control
                  // size="lg"
                  type="text"
                  name="fullName"
                  placeholder="Masukan username"
                  value={fullName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  // size="lg"
                  type="email"
                  placeholder="Masukan email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  // size="lg"
                  type="password"
                  placeholder="Masukan password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted ">
                  Sudah memiliki akun ? Silahkan{" "}
                  <strong>
                    <Link to="/login" className="text-dark">
                      Login
                    </Link>
                  </strong>
                </Form.Text>
              </Form.Group>

              <Button
                // size="lg"
                type="submit"
                style={{ backgroundColor: "#EF4524", border: "none" }}
              >
                Register
              </Button>
            </Form>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Home;
