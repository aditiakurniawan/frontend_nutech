import React from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

function Delete({ handleClose, setConfirmDelete, show, setShow }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Body className="px-5 ">
          <p style={{ color: "#FF0000 " }}>
            Apakah anda yakin ingin menghapus data ?
          </p>
        </Modal.Body>
        <Row className="px-5 d-flex justify-content-end">
          <Col sm={4}>
            <Button
              className="px-5 py-0 mb-3"
              style={{
                backgroundColor: "#EF4524",
                color: "white",
                border: "none",
              }}
              onClick={handleDelete}
            >
              Yes
            </Button>
          </Col>
          <Col sm={3}>
            <Button
              className="px-5 py-0"
              style={{
                backgroundColor: "#E5E5E5",
                color: "white",
                border: "none",
              }}
              onClick={handleClose}
            >
              No
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default Delete;
