import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router";
import { API } from "../../config/api";

function TambahData() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    foto: "",
    hargabeli: "",
    hargajual: "",
    stok: "",
  });

  const addAnotherBarang = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      barangs: [
        ...form.barangs,
        { nama: "", hargabeli: "", hargajual: "", stok: "" },
      ],
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      formData.set("nama", form?.nama);
      formData.set("foto", form?.foto[0], form?.foto[0]?.name);
      formData.set("hargabeli", form?.hargabeli);
      formData.set("hargajual", form?.hargajual);
      formData.set("stok", form?.stok);

      const response = await API.post("/barang", formData, config);
      console.log(response);
      console.log("ini form", form);
      // alert("berhasil menambahkan data");
      if (response?.status === 200) {
        navigate("/edit");
        handleClose();
      } else {
        navigate("/login");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed Max size file upload in 100 kb
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  useEffect(() => {
    console.log(form);
  }, [form.foto]);

  return (
    <>
      <Button
        onClick={handleShow}
        className="ms-5 py-0 mt-4"
        style={{
          backgroundColor: "#EF4524",
          border: "none",
        }}
      >
        Tambah Data
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Silahkan Input Data Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {message && message}
            <Form.Group className="mb-3">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input nama barang"
                id="nama"
                name="nama"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File Foto Product</Form.Label>
              <Form.Control
                type="file"
                placeholder="Input file gambar"
                id="foto"
                name="foto"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                placeholder="Input harga beli"
                id="hargabeli"
                name="hargabeli"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                placeholder="Input harga jual"
                id="hargajual"
                name="hargajual"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Barang</Form.Label>
              <Form.Control
                type="number"
                placeholder="Input Jumlah Barang"
                id="stok"
                name="stok"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              onClick={(e) => {
                // handleClose();
                handleSubmit.mutate(e);
              }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default TambahData;
