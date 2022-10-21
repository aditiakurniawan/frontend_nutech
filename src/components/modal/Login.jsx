import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Modal, Col, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import { useMutation } from "react-query";

function Logiin(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response?.status === 200) {
          navigate("/create_link");
        } else {
          navigate("/");
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
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Button
        style={{ backgroundColor: "#E5E5E5", color: "black", border: "none" }}
        className="fw-bold px-5"
        onClick={handleShow}
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form className="my-4 mx-5" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Modal.Title className="fw-bold">Login</Modal.Title>
            <Form.Group className="mb-3 mt-4">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                style={{
                  backgroundColor: "#D2D2D240",
                  border: "1px solid #BCBCBC",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                style={{
                  backgroundColor: "#D2D2D240",
                  border: "1px solid #BCBCBC",
                }}
              />
            </Form.Group>
            <Button
              className="my-3 px5 w-100 fw-bold "
              style={{ backgroundColor: "#FF9F00", border: "none" }}
              onClick={(e) => {
                handleSubmit.mutate(e);
              }}
            >
              Login
            </Button>
            <p className="text-center">
              Don't have an account ? Klik <strong>Here</strong>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Logiin;
