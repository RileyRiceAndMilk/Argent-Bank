import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';

const NavBar = ({ user }) => {
  return (
    <nav className="main-nav">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      <div>
        {user ? (
          <p>{user.firstName} {user.lastName}</p>  
        ) : (
          <Link className="main-nav-item" to="/sign">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
