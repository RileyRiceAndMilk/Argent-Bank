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

  // Recherche du compte "credit" parmi les comptes de l'utilisateur
  const creditAccount = user.accounts.find(account => account.accountType === 'credit');

  // Si le compte credit est trouvé, on l'affiche, sinon on affiche un message d'erreur
  if (!creditAccount) {
    return <p>Compte Crédit introuvable</p>;
  }

  const account = {
    title: creditAccount.title,
    amount: creditAccount.amount || 0, // Si montant non défini, on met 0
    description: creditAccount.description
  };

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />
      <section className="account-transaction-general">
        <div className="csstransaction-container">
          <h2 className="csstransaction-title">{account.title}</h2>
          <p className="csstransaction-amount">
            {account.amount !== undefined ? `$${account.amount.toFixed(2)}` : 'Montant indisponible'}
          </p>
          <p className="csstransaction-description">{account.description}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TransactionsCreditPage;



