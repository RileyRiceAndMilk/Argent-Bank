import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from "../components/Header";
import WelcomeHeader from '../components/WelcomeHeader';
import AccountCard from '../components/AccountCard';
import Footer from "../components/Footer";
import "../css/style.css";

const UserPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.user); 
  const [accountsData, setAccountsData] = useState([]);

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/sign");
      return;
    }

    fetch("/populateDatabase.json")
      .then(res => res.json())
      .then(users => {
        const loggedUser = users.find(u => u.id === user.id);
        if (!loggedUser) {
          console.error("Utilisateur non trouvé");
          navigate("/sign");
          return;
        }
        loggedUser.firstName = user.firstName || loggedUser.firstName;
        loggedUser.lastName = user.lastName || loggedUser.lastName;

        const accounts = loggedUser.accounts || [];
        const fetchedAccounts = accounts.map(account => ({
          accountId: account.accountId,
          title: account.title,
          amount: account.amount,
          description: account.description,
          accountType: account.accountType
        }));

        setAccountsData(fetchedAccounts);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données", error);
      });
  }, [user, navigate]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <WelcomeHeader user={user} handleEditName={() => navigate("/edit-name")} />
        <h2 className="sr-only">Accounts</h2>

        {accountsData.map((account) => (
          <AccountCard
            key={account.accountId}
            title={account.title}
            amount={account.amount}
            description={account.description}
            accountType={account.accountType}
            accountId={account.accountId}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default UserPage;













