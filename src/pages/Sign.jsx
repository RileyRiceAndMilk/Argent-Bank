import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData, logoutUser } from '../slices/userSlice';

import Logo from '../components/Logo';
import SignInForm from '../components/Sign2';
import Footer from '../components/Footer';
import "../css/style.css";

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleSignIn = (e) => {
    e.preventDefault();

    fetch('/populateDatabase.json')
      .then(res => res.json())
      .then(users => {
        const user = users.find(
          (u) => u.email === username && u.password === password
        );

        if (user) {
          dispatch(setUserData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          }));

          navigate('/userPage');
        } else {
          setErrorMessage("Nom d’utilisateur ou mot de passe invalide");
        }
      })
      .catch(error => {
        console.error("Erreur lors du chargement des données :", error);
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <div>
      <header className="main-nav">
        <Logo />
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





