import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';  // Assure-toi du bon chemin vers le composant Logo
import SignInForm from '../components/Sign2';
import Footer from '../components/Footer';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    fetch('/populateDatabase.json')
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === username && user.password === password
        );

        if (user) {
          localStorage.setItem('userId', user.id);
          navigate('/userPage');
        } else {
          setErrorMessage('Nom d’utilisateur ou mot de passe invalide');
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      });
  };

  return (
    <div>
      <header className="main-nav">
        <Logo />  {/* Utilisation du composant Logo */}
      </header>

      <main className="main bg-dark">
        <SignInForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          handleSignIn={handleSignIn}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SignInPage;



