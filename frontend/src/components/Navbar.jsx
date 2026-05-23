import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="app-nav">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/">Gen AI Interview</Link>
        </div>
        <div className="links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          {!user && (
            <>
              <Link className="button primary-button" to="/login">
                Login
              </Link>
              <Link className="button primary-button" to="/register">
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/">Dashboard</Link>
              <button
                className="button"
                onClick={async () => {
                  await handleLogout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
