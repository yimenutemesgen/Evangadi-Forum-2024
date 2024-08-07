import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/user/Login";
import Question1 from "./Pages/Question/Question1";
import SingleQuestion from "./Pages/Answer/SingleQuestion";
import SignUp from "./Pages/user/SignUp";
import { axiosBase } from "./Api/axiosConfig";
import { DataContext } from "./Component/DataProvider/DataProvider";
import { Type } from "./utility/actiontype";
import ProtectedRoute from "./Component/protectedRoute";
import Home from "./Pages/Home/Home";

function App() {
  const [, dispatch] = useContext(DataContext);
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          await axiosBase.get("/user/check", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.log("Error checking user:", error.response);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    checkUser();
    if (token) {
      dispatch({ type: Type.SET_TOKEN, token });
      if (storedUser) {
        dispatch({ type: Type.SET_USER, user: storedUser });
      }
    }
  }, [token, navigate]);

  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/question"
          element={
            <ProtectedRoute token={token}>
              <Question1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:question_id"
          element={
            <ProtectedRoute token={token}>
              <SingleQuestion />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
