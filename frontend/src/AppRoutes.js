import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import CompaniesList from "./companies/CompaniesList";
import CompanyDetails from "./companies/CompanyDetails";
import Home from "./home/Home";
import JobsList from "./jobs/JobsList";
import LoginForm from "./user/LoginForm";
import SignUpForm from "./user/SignUpForm";
import ProfileForm from "./user/ProfileForm";


function AppRoutes() {

  return (

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/companies" element={<CompaniesList />} />
      <Route exact path="/companies/:handle" element={<CompanyDetails />} />
      <Route exact path="/jobs" element={<JobsList />} />
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignUpForm />} />
      <Route exact path="/profile" element={<ProfileForm />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>

  );
}

export default AppRoutes;