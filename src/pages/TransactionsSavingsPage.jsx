import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Footer from '../components/Footer';

const TransactionsSavingsPage = () => {
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

  // Trouver le compte d'épargne (savings) dans les comptes de l'utilisateur
  const savingsAccount = user.accounts.find(account => account.accountType === 'savings');

  // Si le compte épargne existe, on récupère son montant. Sinon, on affiche 0
  const account = {
    title: savingsAccount ? savingsAccount.title : "Compte épargne non trouvé",
    amount: savingsAccount ? savingsAccount.amount : 0,
    description: "Available Balance"
  };

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />
      <section className="account-transaction-general">
        <div className="csstransaction-container">
          <h2 className="csstransaction-title">{account.title}</h2>
          <p className="csstransaction-amount">${account.amount.toFixed(2)}</p>
          <p className="csstransaction-description">{account.description}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TransactionsSavingsPage;



