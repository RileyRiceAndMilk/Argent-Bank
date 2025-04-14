import React from 'react';
import "../css/style.css";
import Logo from '../components/Logo';
import Footer from "../components/Footer";


const NotFoundPage = () => {
  return (
    <>
      <header className="main-nav">
        <Logo />
      </header>
      <main>
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;