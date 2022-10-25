import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
  FormControl,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { Navigate, useParams, useNavigate } from "react-router";
import { API } from "../../config/api";
import edit from "../../assets/icon/Edit.png";

function ModalEdit(props) {
  document.title = `Update Barang`;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [barang, setBarang] = useState(props.foto);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nama: props?.nama,
    foto: props?.foto,
    hargabeli: props?.hargabeli,
    hargajual: props?.hargajual,
    stok: props?.stok,
  });
  let { id } = useParams();
  let { data: update } = useQuery("updateCache", async () => {
    const response = await API.get("/barang/" + props?.id);
    console.log("update data", response);
    console.log(id);
    setPreview(response?.data.data.foto);
    setForm({
      ...form,
      nama: response.data.data.nama,
      foto: response.data.data.foto,
      hargabeli: response.data.data.hargabeli,
      hargajual: response.data.data.hargajual,
      stok: response.data.data.stok,
    });
    setBarang(response.data.data);
  });

  const { nama, foto, hargabeli, hargajual, stok } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
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

      const formData = new FormData();
      if (form.foto) {
        formData.set("foto", form?.foto[0], form?.foto[0]?.name);
      }
      formData.set("nama", form?.nama);
      formData.set("hargabeli", form?.hargabeli);
      formData.set("hargajual", form?.hargajual);
      formData.set("stok", form?.stok);

      // Data body
      const body = JSON.stringify(form);

      const response = await API.patch("/barang/" + props.id, formData);

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
    <>
      <button
        onClick={handleShow}
        className="me-3 p-0 mt-4 w-25 "
        style={{ border: "none", backgroundColor: "none" }}
      >
        <img
          src={edit}
          alt=""
          style={{ border: "none", backgroundColor: "none" }}
        />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Data Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {message && message}
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt="preview"
                />
              </div>
            )}
            <input
              type="file"
              id="upload"
              name="foto"
              // hidden
              onChange={handleChange}
            />
            <label className="my-3 text-primary" htmlFor="upload">
              Upload File
            </label>
            <Form.Group className="mb-3">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                placeholder={update?.nama}
                value={form?.nama}
                id="nama"
                name="nama"
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>File Foto Product</Form.Label>
              <Form.Control
                type="file"
                name="foto" // value={form?.foto}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                placeholder={update?.hargabeli}
                value={form?.hargabeli}
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
                value={form?.hargajual}
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
                value={form?.stok}
                id="stok"
                name="stok"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEdit;
