import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import view from "../assets/icon/View.png";
import edit from "../assets/icon/Edit.png";
import delet from "../assets/icon/Delete.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Delete from "../components/modal/Delete";
import Edit from "../components/modal/Edit";
import logo from "../assets/images/Logo.png";

function EditData() {
  document.title = `Update Data`;
  const [modalShow, setModalShow] = React.useState(false);
  const state = useContext(UserContext);
  const [dataFilter, setDataFilter] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [idEdit, setIdEdit] = useState(null);
  const [confirmEdit, setConfirmEdit] = useState(null);
  const [shownow, setShownow] = useState(false);
  const handleClosenow = () => setShownow(false);
  const handleShownow = () => setShownow(true);

  console.log("state", state);

  let { data: barangs, refetch } = useQuery("barangCache", async () => {
    const response = await API.get("/barangs");
    console.log("ini response", response);
    return response.data.data;
  });
  console.log("ini", barangs);

  // function handleChangeBarang(e) {
  //   if (!e.target.value) {
  //     setDataFilter(barangs);
  //     return;
  //   }
  //   const filter = barangs?.filter((item) => {
  //     return item.title.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   setDataFilter(filter);
  // }

  // console.log("filter", dataFilter);

  // useEffect(() => {
  //   if (barangs) setDataFilter(barangs);
  // }, [barangs]);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/barang/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  ///////////////

  const handleEdit = (id) => {
    setIdEdit(id);
    handleShownow();
  };

  const editById = async (id) => {
    try {
      await API.patch(`/barang/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmEdit) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      editById(idEdit);
      setConfirmEdit(null);
    }
  }, [confirmEdit]);
  ///////////////

  let user = useQuery("usersCache", async () => {
    const response = await API.get("/check-auth");
    console.log("ini response user", response);
    return response.data.data;
  });
  // let count = dataFilter.length - 7;

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex justify-content-md-start w-50">
            <img src={logo} alt="" className="ms-5 mt-4 w-25" />
          </div>
          <Row>
            <Container className="w-100 px-5 py-3 ">
              <h4 className="ms-3">Data Barang</h4>
              {/* <Row xs="auto">
                <Col></Col> */}
              {/* <Col sm={9}>
                  <Form.Group className=" mb-5 border-bottom border-secondary">
                    <Form.Control
                      placeholder="Cari data barang"
                      type="text"
                      name="data"
                      onChange={handleChangeBarang}
                      style={{
                        border: "0px ",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    as={Link}
                    to="/edit"
                    type="submit"
                    className="py-0 px-4"
                    style={{
                      color: "white",
                      backgroundColor: "#EF4524",
                      border: "none",
                    }}
                  >
                    Search
                  </Button>
                </Col> */}
              {/* </Row> */}
              <Container>
                <Table striped hover size="lg" variant="light">
                  <thead>
                    <tr>
                      <th width="1%" className="text-center">
                        No
                      </th>
                      <th width="15%"> Foto Batang</th>
                      <th>Nama Barang</th>
                      <th width="10%">Harga Beli</th>
                      <th width="10%">Harga Jual</th>
                      <th width="10%">Stok Barang</th>
                      <th width="10%">Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangs?.map((item, id) => {
                      return (
                        <tr key={id}>
                          <td className="align-middle text-center">{id + 1}</td>
                          <td className="align-middle">
                            <img
                              src={item?.foto}
                              alt=""
                              className="w-100 mt-2"
                            />
                          </td>
                          <td className="align-middle">{item.nama}</td>
                          <td className="align-middle">Rp.{item.hargabeli}</td>
                          <td className="align-middle">Rp.{item.hargajual}</td>
                          <td className="align-middle">{item.stok}</td>
                          <td className="align-middle">
                            <div className="w-100">
                              {/* <Link to={`/template/${item.id}`}>
                                <img src={view} alt="" className="w-25 p-2" />
                              </Link> */}

                              <Link onClick={() => setModalShow(true)}>
                                <img src={edit} alt="" className="w-50 p-2" />
                              </Link>

                              <Link
                                onClick={() => handleDelete(item?.id)}
                                style={{
                                  backgroundColor: "none",
                                  border: "none",
                                }}
                                // hidden
                              >
                                <img src={delet} alt="" className="w-50 p-2" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
              <Edit show={modalShow} onHide={() => setModalShow(false)} />
              <Delete
                setConfirmDelete={setConfirmDelete}
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleDelete={handleDelete}
              />
            </Container>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default EditData;
