import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from "../components/Header";  
import Footer from "../components/Footer";

const UserPage = () => {
  const [user, setUser] = useState(null);  
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem("userId");  

    if (!userId) {
      
      navigate("/sign");  
    } else {
      
      fetch("/populateDatabase.json")
        .then((res) => res.json())
        .then((users) => {
          const loggedUser = users.find((user) => user.id === userId);  
          setUser(loggedUser);  
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des données", error);
        });
    }
  }, [navigate]);

  
  const handleSignOut = () => {
    localStorage.removeItem("userId");  
    navigate("/sign");  
  };

  const handleEditName = () => {
    navigate("/edit-name"); 
  };

  
  if (!user) return null;

  return (
    <div>
      <Header />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          
          <button className="edit-button" onClick={handleEditName}>Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

    
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={() => navigate('/transactions')}>
              View transactions
            </button>
          </div>
        </section>

      
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={() => navigate('/transactions')}>
              View transactions
            </button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={() => navigate('/transactions')}>
              View transactions
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserPage;



