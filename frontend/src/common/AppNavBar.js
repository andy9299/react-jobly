import React, { useContext } from "react";
import { Nav, NavItem, Navbar } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./AppNavBar.css";
import UserContext from "../context/UserContext";

function AppNavBar() {
  const { currentUser, logout } = useContext(UserContext);
  return (
    <>
      <Navbar expand="md" >
        <NavLink end to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto">
          {currentUser ?
            <>
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
                  Logout {currentUser.username}
                </a>
              </NavItem>
            </>
            :
            <>
              <NavItem >
                <NavLink to="/login" className="me-2">
                  Login
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink to="/register" className="me-2">
                  Register
                </NavLink>
              </NavItem>
            </>
          }

        </Nav>
      </Navbar>
    </>
  );

}

export default AppNavBar;