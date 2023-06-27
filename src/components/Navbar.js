import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from '../components/ContextReducer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      <style>
        {`
          .nav-link:hover {
            color: black !important;
            background-color: white !important;
            border-radius: 20px;
            align-items: center;
            justify-content: center;
            // height: 30px;
            display: flex;
          }
        `}
      </style>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ filter: 'blur(20)', zIndex: '10', width: '100%' }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            BeFoodie
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
            <span className="navbar-brand"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item" style={{height:"20px"}}>
                <Link
                  className="nav-link active fs-6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') && (
                <li className="nav-item" style={{height:"40px"}}>
                  <Link
                    className="nav-link active fs-6" 
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <Link className="btn bg-white text-primary mx-1" to="/login">
                  Login
                </Link>

                <Link className="btn bg-white text-primary mx-1" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-primary mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  <Badge color="secondary" badgeContent={data.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
