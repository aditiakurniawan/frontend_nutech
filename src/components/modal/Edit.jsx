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
import { useQuery, useMutation } from "react-query";
import { Navigate, useParams, useNavigate } from "react-router";
import { API } from "../../config/api";

export default function Edit(props) {
  document.title = `Update Barang`;
  const navigate = useNavigate();
  const titlePage = "Update Barang";
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);
  let { id } = useParams();
  let { data: update } = useQuery("updateCache", async () => {
    const response = await API.get("/barang/" + id);
    console.log("update data", response);
    console.log(id);
    return response.data.data;
  });

  const [form, setForm] = useState({
    nama: "",
    foto: "",
    hargabeli: "",
    hargajual: "",
    stok: "",
  });
  const { nama, foto, hargabeli, hargajual, stok } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // Data body
      const body = JSON.stringify(form);

      const response = await API.patch("/barang/" + id, body, config);

      console.log(response);

      if (response?.status === 200) {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Data berhasil tersimpan
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Gagal menyimpan data
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      {...props}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Data Barang
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {message && message}
          <Form.Group className="mb-3">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              type="text"
              placeholder={update?.nama}
              value={update?.nama}
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
              placeholder={update?.hargabeli}
              id="hargabeli"
              name="hargabeli"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Harga Jual</Form.Label>
            <Form.Control
              type="number"
              placeholder={update?.hargajual}
              id="hargajual"
              name="hargajual"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock Barang</Form.Label>
            <Form.Control
              type="number"
              placeholder={update?.stok}
              id="stok"
              name="stok"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
