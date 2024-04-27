import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    });
  };

  const handleLogout = () => {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} alt="WriteNode Logo" />
        <span>WriteNode</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="link" end>
          Home
        </NavLink>
        {isAuth ? (
          <>
            <NavLink to="/create" className="link">
              Create
            </NavLink>
            <button className="auth" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </>
        ) : (
          <button className="auth" onClick={handleLogin}>
            <i className="bi bi-google"></i> Login
          </button>
        )}
      </nav>
    </header>
  );
};
