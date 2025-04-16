import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import TransactionHistory from '../components/TransactionHistory';
import Footer from '../components/Footer';

const TransactionsCheckingPage = () => {
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

  const checkingAccount = user.accounts.find(account => account.accountType === 'checking');

  if (!checkingAccount) {
    return <p>Compte Checking non trouvé</p>;
  }

  const { title, amount, description, transactions = [] } = checkingAccount;

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />

      <div className="csstransaction-container">
          <h2 className="csstransaction-title">{title}</h2>
          <p className="csstransaction-amount">${amount.toFixed(2)}</p>
          <p className="csstransaction-description">{description}</p>
        </div>

      <section className="account-transaction-general">

      <TransactionHistory transactions={checkingAccount.transactions || []} />
      </section>

      <Footer />
    </div>
  );
};

export default TransactionsCheckingPage;

