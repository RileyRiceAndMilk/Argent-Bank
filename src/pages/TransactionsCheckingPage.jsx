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

    const firstName = localStorage.getItem("userFirstName");
    const lastName = localStorage.getItem("userLastName");

    fetch("/populateDatabase.json")
      .then(res => res.json())
      .then(users => {
        const foundUser = users.find(u => u.id === userId);
        console.log("Utilisateur trouvé :", foundUser);

        if (!foundUser) {
          navigate("/sign");
          return;
        }

        foundUser.firstName = firstName || foundUser.firstName;
        foundUser.lastName = lastName || foundUser.lastName;

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

  console.log("Compte Checking trouvé :", checkingAccount);

  if (!checkingAccount) {
    return <p>Compte Checking non trouvé</p>;
  }

  const { title, amount, description = "" } = checkingAccount;

  const formatAmount = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />

      <div className="csstransaction-container">
        <h2 className="csstransaction-title">{title}</h2>
        <p className="csstransaction-amount">{formatAmount(amount)}</p>
        <p className="csstransaction-description">{description || "Pas de description disponible"}</p>
      </div>

      <section className="account-transaction-general">
        <TransactionHistory transactions={checkingAccount.transactions || []} />
      </section>

      <Footer />
    </div>
  );
};

export default TransactionsCheckingPage;




