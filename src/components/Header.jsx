import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';
import signout from '../img/sign out.png'

const Header = () => {
    const navigate = useNavigate();


    const handleSignOut = () => {

        localStorage.removeItem("userId");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("userLastName");


        navigate("/");
    };

    return (
        <header>
            <nav className="main-nav">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                <div className="sign-out-container" onClick={handleSignOut}>
                    <img src={signout} alt="sign out" className="sign-out" />
                    <span className="sign-out-text">Sign Out</span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
