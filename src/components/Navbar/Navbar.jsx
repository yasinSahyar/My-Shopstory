import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logged out successfully');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          My Shopstory
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="nav-buttons">
            {isLoggedIn ? (
              <>
                <button className="btn btn-outline-dark" onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in-alt"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark">
                  <i className="fa fa-user-plus"></i> Register
                </NavLink>
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-dark">
              <i className="fa fa-cart-shopping"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;