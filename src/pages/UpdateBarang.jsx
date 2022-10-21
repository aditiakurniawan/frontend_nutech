// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation } from "react-query";
// // import { Navigate, useNavigate } from "react-router";
// import { API } from "../config/api";

// function UpdateLink() {
//   document.title = `Update Link`;
//   const navigate = useNavigate();
//   const titlePage = "Update Link";
//   const [message, setMessage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   let { id } = useParams();
//   let { data: update } = useQuery("updateCache", async () => {
//     const response = await API.get("/link/" + id);
//     console.log("update data", response);
//     console.log(id);
//     return response.data.data;
//   });

//   const [form, setForm] = useState({
//     image: "",
//     title: "",
//     description: "",
//     titleWeb: "",
//     linkWeb: "",
//     titleFb: "",
//     linkFb: "",
//     titleIg: "",
//     linkIg: "",
//     titleTw: "",
//     linkTw: "",
//     titleYt: "",
//     linkYt: "",
//     titleWa: "",
//     linkWa: "",
//   });
//   const {
//     description,
//     image,
//     title,
//     titleWeb,
//     linkWeb,
//     titleFb,
//     linkFb,
//     titleIg,
//     linkIg,
//     titleTw,
//     linkTw,
//     titleYt,
//     linkYt,
//     titleWa,
//     linkWa,
//   } = form;

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]:
//         e.target.type === "file" ? e.target.files : e.target.value,
//     });
//     console.log(form);
//   };

//   const handleSubmit = useMutation(async (e) => {
//     try {
//       e.preventDefault();

//       // Configuration
//       const config = {
//         headers: {
//           "Content-type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.token}`,
//         },
//       };

//       // Data body
//       const body = JSON.stringify(form);

//       const response = await API.patch("/link/" + id, body, config);

//       console.log(response);

//       if (response?.status === 200) {
//         const alert = (
//           <Alert
//             variant="success"
//             className="py-1 d-flex justify-content-center"
//           >
//             Save Complete
//           </Alert>
//         );
//         setMessage(alert);
//       } else {
//         const alert = (
//           <Alert
//             variant="danger"
//             className="py-1 d-flex justify-content-center"
//           >
//             Save Failed
//           </Alert>
//         );
//         setMessage(alert);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   // useEffect(() => {
//   //   handleSubmit();
//   // }, []);

//   return (
//     <>
//       <Row>
//         <Sidebar />
//         <Col>
//           <h3 className="w-100 px-5 py-4">Templete</h3>
//           <Row>
//             <Col>
//               <Row
//                 style={{ backgroundColor: "#ECECEC", paddingBottom: "30vh" }}
//                 className="pt-5"
//               >
//                 <Form
//                   className="secondary text-white"
//                   onSubmit={(e) => {
//                     handleSubmit.mutate(e);
//                   }}
//                 >
//                   <Container className="w-100 px-5 py-3">
//                     <Row>
//                       <Col>
//                         <h3 className="text-dark">Update Link</h3>
//                       </Col>

//                       <Col sm={2}>
//                         <Button
//                           md={3}
//                           className="mx-3 "
//                           type="submit"
//                           style={{ backgroundColor: "#FF9F00", border: "none" }}
//                         >
//                           Publish Link
//                         </Button>
//                       </Col>
//                     </Row>
//                     {message && message}
//                     <Row className="mt-5">
//                       <Col>
//                         <div
//                           sm={2}
//                           className="bg-white p-4 w-100"
//                           style={{
//                             borderRadius: "10px",
//                             overflow: "hidden",
//                             overflowY: "scroll",
//                             height: 380,
//                           }}
//                         >
//                           <Row
//                             style={{ display: "flex", alignItems: "center" }}
//                           >
//                             <Col md={3}>
//                               <img
//                                 src={update?.image}
//                                 alt=""
//                                 className="w-100"
//                               />
//                             </Col>
//                             <Col>
//                               <Form.Group>
//                                 <Form.Label
//                                   for="images"
//                                   type="file"
//                                   className="mx-3 my-auto px-3 py-1"
//                                   onChange={handleChange}
//                                   style={{
//                                     backgroundColor: "#FF9F00",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                   }}
//                                 >
//                                   Upload
//                                 </Form.Label>
//                                 <Form.Control
//                                   id="images"
//                                   name="image"
//                                   type="file"
//                                   onChange={handleChange}
//                                   hidden
//                                 />
//                               </Form.Group>
//                             </Col>
//                           </Row>
//                           <div className="my-5">
//                             <p className="text-dark">Title</p>
//                             <Form.Group className="mb-3 border-bottom border-dark">
//                               <Form.Control
//                                 placeholder={update?.title}
//                                 type="text"
//                                 name="title"
//                                 style={{ border: "0px white" }}
//                                 onChange={handleChange}
//                                 // value="adit"
//                               />
//                             </Form.Group>

//                             <p className="text-dark">Description</p>
//                             <Form.Group className="mb-3 border-bottom border-dark">
//                               <Form.Control
//                                 placeholder={update?.description}
//                                 type="text"
//                                 name="description"
//                                 style={{ border: "0px white" }}
//                                 onChange={handleChange}
//                               />
//                             </Form.Group>
//                           </div>
//                           <div className="my-5">
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={upload} alt="" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">
//                                     Title Link website
//                                   </p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleWeb}
//                                       type="text"
//                                       name="titleWeb"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Link</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkWeb}
//                                       type="text"
//                                       name="linkWeb"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={fb} alt="" className="w-100" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">Facebook</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleFb}
//                                       type="text"
//                                       name="titleFb"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Link Facebook </p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkFb}
//                                       type="text"
//                                       name="linkFb"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={ig} alt="" className="w-100" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">Instagram</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleIg}
//                                       type="text"
//                                       name="titleIg"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Instagram Link</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkIg}
//                                       type="text"
//                                       name="linkIg"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={tw} alt="" className="w-100" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">Twitter</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleTw}
//                                       type="text"
//                                       name="titleTw"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Link Twitter</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkTw}
//                                       type="text"
//                                       name="linkTw"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={yt} alt="" className="w-100" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">Youtube</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleYt}
//                                       type="text"
//                                       name="titleYt"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Link Youtube</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkYt}
//                                       type="text"
//                                       name="linkYt"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row
//                               className="p-3"
//                               style={{ backgroundColor: "#ECECEC" }}
//                             >
//                               <Col sm={3}>
//                                 <img src={wa} alt="" className="w-100" />
//                               </Col>
//                               <Col>
//                                 <div>
//                                   <p className="text-dark">Whatsapp</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.titleWa}
//                                       type="text"
//                                       name="titleWa"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                       // value="adit"
//                                     />
//                                   </Form.Group>

//                                   <p className="text-dark">Link Whatsapp</p>
//                                   <Form.Group className="mb-3 border-bottom border-dark">
//                                     <Form.Control
//                                       placeholder={update?.linkWa}
//                                       type="text"
//                                       name="linkWa"
//                                       onChange={handleChange}
//                                       style={{
//                                         border: "0px white",
//                                         backgroundColor: "#ECECEC",
//                                       }}
//                                     />
//                                   </Form.Group>
//                                 </div>
//                               </Col>
//                             </Row>
//                             <Row>
//                               <Button
//                                 className="w-100 my-5"
//                                 type="submit"
//                                 style={{
//                                   backgroundColor: "#FF9F00",
//                                   border: "none",
//                                 }}
//                               >
//                                 Add New Link
//                               </Button>
//                             </Row>
//                           </div>
//                         </div>
//                       </Col>
//                       <Col sm={4}>
//                         <img src={phone1} alt="" className="px-5 w-100" />
//                       </Col>
//                     </Row>
//                   </Container>
//                 </Form>
//               </Row>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default UpdateLink;
