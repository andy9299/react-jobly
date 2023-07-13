import React from "react";
import { Nav, NavItem, Navbar } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./AppNavBar.css";

function AppNavBar() {
  const logout = () => {
    console.log("logging out");
  };
  return (
    <>
      <Navbar expand="md" >
        <NavLink end to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto">
          <NavItem >
            <NavLink to="/companies" className="me-2">
              Companies
            </NavLink>
          </NavItem>
          <NavItem >
            <NavLink to="/jobs" className="me-2">
              Jobs
            </NavLink>
          </NavItem>
          <NavItem >
            <NavLink to="/profile" className="me-2">
              Profile
            </NavLink>
          </NavItem>
          <NavItem >
            <a href="/" onClick={logout}>
              Logout
            </a>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );

}

export default AppNavBar;