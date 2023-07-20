import React, { useContext } from "react";
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
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

  const ProtectedRoute = ({
    redirectPath = '/',
    children
  }) => {
    if (!currentUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  const GuestRoute = ({
    redirectPath = '/',
    children
  }) => {
    if (currentUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/profile" element={<ProfileForm />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>

  );
}

export default AppRoutes;