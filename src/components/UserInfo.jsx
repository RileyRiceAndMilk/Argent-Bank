import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';
import profil from '../img/profil.png'
import signout from '../img/sign out.png'

const UserInfo = ({ user, handleSignOut }) => {
  if (!user) {
    return (
      <div className="user-info">
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={logo}
              alt="Argent Bank Logo"
            />
          </Link>
        </nav>
        <p>Aucun utilisateur connecté.</p>
      </div>
    );
  }

  return (
    <div className="user-info">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>
      </nav>
      <div className="Name-and-sign-out">
        <img src={profil} alt="profil" className="profil" />
        <p>{user.firstName} {user.lastName}</p>
        <div className="sign-out-container" onClick={handleSignOut}>
          <img src={signout} alt="sign out" className="sign-out" />
          <span className="sign-out-text">Sign Out</span>
        </div>

      </div>

    </div>
  );
};

export default UserInfo;

