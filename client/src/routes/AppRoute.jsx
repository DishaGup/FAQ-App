import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
//import SingleQuestionPage from "../pages/SingleQuestionPage";

const SingleQuestionPage = lazy(() =>
  import("../pages/SingleQuestionPage")
);

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/faq" element={<FAQPage />} /> */}
        <Route path="/faq/:questionId"  element={
            <Suspense fallback={<div>Loading...</div>}>
              <SingleQuestionPage />
            </Suspense>
          } /> 
  
      </Routes>
    </div>
  );
};

export default AppRoutes;
