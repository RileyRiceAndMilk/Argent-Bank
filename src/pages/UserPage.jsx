import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import WelcomeHeader from '../components/WelcomeHeader';
import AccountCard from '../components/AccountCard';  
import Footer from "../components/Footer";
import "../css/style.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [accountsData, setAccountsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/sign");
      return;
    }

    fetch("/populateDatabase.json")
      .then((res) => res.json())
      .then((users) => {
        const loggedUser = users.find((user) => user.id === userId);
        if (!loggedUser) {
          console.error("Utilisateur non trouvé");
          navigate("/sign");
          return;
        }

        setUser(loggedUser);

        // Récupérer les comptes directement depuis loggedUser.accounts
        const fetchedAccounts = loggedUser.accounts.map(account => ({
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
  }, [navigate]);

  const handleEditName = () => {
    navigate("/edit-name");
  };

  if (!user) return null;

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <WelcomeHeader user={user} handleEditName={handleEditName} />
        <h2 className="sr-only">Accounts</h2>

        {accountsData.map((account, index) => (
          <div key={index}>
            <AccountCard
              title={account.title}
              amount={account.amount}
              description={account.description}
              accountType={account.accountType} 
              accountId={account.accountId} // Ajout du prop accountId
            />
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default UserPage;









