import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  Redirect,
  useParams,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";

import Home from "./pages/Home";
import DataBarang from "./pages/DataBarang";
import NotFound from "./pages/NotFound";
import UpdateBarang from "./pages/UpdateBarang";
import EditData from "./pages/EditData";
import Sign from "./pages/Sign";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Sign />} />
        <Route path="/data" element={<DataBarang />} />
        <Route path="/edit" element={<EditData />} />
        {/* <Route path="/Update_barang/:id" element={<UpdateBarang />} /> */}
      </Routes>
    </>
  );
}

export default App;
