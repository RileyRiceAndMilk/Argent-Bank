import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   
import { Link } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';

const Header = () => {
    const navigate = useNavigate(); // Hook de navigation

    // Fonction pour gérer la déconnexion
    const handleSignOut = () => {
        // Retirer l'ID de l'utilisateur du localStorage pour simuler la déconnexion
        localStorage.removeItem("userId");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("userLastName");

        // Rediriger l'utilisateur vers la page d'accueil après la déconnexion
        navigate("/"); // Redirige vers la page d'accueil
    };

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {/* Le bouton Sign Out avec l'icône */}
                    <button className="main-nav-item" onClick={handleSignOut}>
                        <i className="fa fa-sign-out"></i> Sign Out
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
