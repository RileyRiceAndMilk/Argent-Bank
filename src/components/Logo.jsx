import React from "react";
import logo from '../img/argentBankLogo.png';

const Logo = () => {
  return (
    <div>
      <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
      <h1 className="sr-only">Argent Bank</h1>
    </div>
  );
};

export default Logo;

