import React from 'react';
import { Link } from "react-router-dom";
import "../css/style.css";


const NotFoundPage = () => {
  return (
    <>
            <Header /> 
      <main>
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/Acceuil" className="link-Acceuil">Retourner sur la page d'acceuil</Link>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;