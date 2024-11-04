import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ handleLogout }) {
  return (
    <div id="navbar" className="navbar">
      <NavLink
        to="/productManagement"
        className="nav-button"
        activeClassName="active"
      >
        Product Management
      </NavLink>
      <NavLink
        to="/dashboard"
        className="nav-button"
        activeClassName="active"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/userManagement"
        className="nav-button"
        activeClassName="active"
      >
        User Management
      </NavLink>
      <NavLink 
        to="/"
        className="nav-button" 
        onClick={handleLogout}>
        Logout
      </NavLink>
    </div>
  );
}

export default Navbar;
