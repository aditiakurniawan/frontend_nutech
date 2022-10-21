import React, { useState, useContext } from "react";
import { Button, Form, Modal, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import { useMutation } from "react-query";

function Register(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      if (response.data.status == "success") {
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
      <Button
        style={{ backgroundColor: "#EF4524", color: "white", border: "none" }}
        className="fw-bold px-5"
        onClick={handleShow}
      >
        Register
      </Button>

      <Modal {...props} show={show} onHide={handleClose}>
        <Modal.Body>
          <Form
            className="my-4 mx-5"
            onSubmit={(e) => {
              handleSubmit.mutate(e);
            }}
          >
            <Modal.Title className="fw-bold">Register</Modal.Title>
            <Form.Group className="mb-3 mt-4">
              {message && message}
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
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={handleChange}
                style={{
                  backgroundColor: "#D2D2D240",
                  border: "1px solid #BCBCBC",
                }}
              />
            </Form.Group>
            <Button
              className="my-3 px5 w-100 fw-bold "
              style={{ backgroundColor: "#EF4524", border: "none" }}
              type="submit"
              onClick={handleClose}
            >
              Register
            </Button>
            <p className="text-center">
              Already have an account ? Klik{" "}
              <strong>
                <Button
                  onClick={props.trigger}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    padding: "0px 0px 5px 0px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Here
                </Button>
              </strong>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
