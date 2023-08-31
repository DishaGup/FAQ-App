import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboardPage from "../pages/AdminPage";
import PrivateRoute from "./PrivateRoute";
//import SingleQuestionPage from "../pages/SingleQuestionPage";

const SingleQuestionPage = lazy(() => import("../pages/SingleQuestionPage"));

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {" "}
              <AdminDashboardPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/faq/:questionId"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <SingleQuestionPage />
              </Suspense>{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
