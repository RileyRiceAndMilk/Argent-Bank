import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/style.css";
import UserInfo from "../components/UserInfo";
import AccountContainer from "../components/AccountContainer";
import Footer from "../components/Footer";

const TransactionsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    navigate("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Aucun utilisateur connecté");
      setLoading(false);
      return;
    }

    fetch("/populateDatabase.json")
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data.find((u) => u.id === userId);
        setUser(currentUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données utilisateur", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  const accountToDisplay = user ? {
    title: "Argent Bank Checking (x8349)",
    amount: user.checkingAmount,
    description: "Available Balance"
  } : null;

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />

      <section className="account-transaction-general">
        {accountToDisplay ? (
          <div className="csstransaction-container">
            <h2 className="csstransaction-title">{accountToDisplay.title}</h2>
            <p className="csstransaction-amount">{accountToDisplay.amount}</p>
            <p className="csstransaction-description">{accountToDisplay.description}</p>
          </div>
        ) : (
          <p className="csstransaction-empty">Aucun compte sélectionné.</p>
        )}

      </section>

      <Footer />
    </div>
  );
};

export default TransactionsPage;






