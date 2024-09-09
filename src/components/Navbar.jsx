import React, { useCallback, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "./screen/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  const [cartview, setcartview] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handlelogout = () => {
    alert("Are you sure you want to logout?");
    localStorage.removeItem("authtoken");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success d-flex">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic nav" to="/">
            Go Freakers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex " id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authtoken") ? (
                <li>
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authtoken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/Login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="./createuser"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success fw-bold mx-1"
                  aria-current="page"
                  onClick={() => {
                    setcartview(true);
                  }}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </Link>
                {cartview ? (
                  <Model
                    onClose={() => {
                      setcartview(false);
                    }}
                  >
                    <Cart setcartview={setcartview}></Cart>
                  </Model>
                ) : null}

                <Link
                  className="btn bg-white text-danger fw-bold mx-1"
                  to="/"
                  onClick={handlelogout}
                >
                  LogOut
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
