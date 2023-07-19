import React, { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import CompaniesList from "./companies/CompaniesList";
import CompanyDetails from "./companies/CompanyDetails";
import Home from "./home/Home";
import JobsList from "./jobs/JobsList";
import LoginForm from "./user/LoginForm";
import ProfileForm from "./user/ProfileForm";
import RegisterForm from "./user/RegisterForm";
import UserContext from "./context/UserContext";


function AppRoutes() {
  const { currentUser } = useContext(UserContext);
  return (

    <Routes>
      <Route exact path="/" element={<Home />} />
      {currentUser ?
        <>
          <Route exact path="/companies" element={<CompaniesList />} />
          <Route exact path="/companies/:handle" element={<CompanyDetails />} />
          <Route exact path="/jobs" element={<JobsList />} />
          <Route exact path="/profile" element={<ProfileForm />} />
        </>
        :
        <>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
        </>
      }
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>

  );
}

export default AppRoutes;