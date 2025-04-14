import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Footer from '../components/Footer';

const TransactionsCreditPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/sign");
      return;
    }

    fetch("/populateDatabase.json")
      .then(res => res.json())
      .then(users => {
        const foundUser = users.find(u => u.id === userId);
        if (!foundUser) {
          navigate("/sign");
          return;
        }
        setUser(foundUser);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données", error);
        navigate("/sign");
      });
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return <p>Chargement...</p>;


  const account = {
    title: "Argent Bank Credit Card (x8349)",
    amount: user.creditCardAmount,  
    description: "Current Balance"
  };

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />
      <section className="account-transaction-general">
        <div className="csstransaction-container">
          <h2 className="csstransaction-title">{account.title}</h2>
          <p className="csstransaction-amount">${account.amount ? account.amount.toFixed(2) : 'N/A'}</p> {/* Si `amount` est undefined, afficher 'N/A' */}
          <p className="csstransaction-description">{account.description}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TransactionsCreditPage;


