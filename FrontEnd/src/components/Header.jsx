import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fluid fixed-top py-2 shadow-sm bg-white">
      <div className="row align-items-center">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link to="/" className="navbar-brand text-warning fw-bold me-3">
              Kitchen Mania
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link text-dark fw-bold">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/menus" className="nav-link text-dark fw-bold">
                    Menus
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dishes" className="nav-link text-dark fw-bold">
                    Dishes
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;

