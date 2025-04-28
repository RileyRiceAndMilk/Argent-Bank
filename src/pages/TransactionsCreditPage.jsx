import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import TransactionHistory from '../components/TransactionHistory';
import Footer from '../components/Footer';

const TransactionsCreditPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const formatAmount = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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

  const creditAccount = user.accounts.find(account => account.accountType === 'credit');

  console.log("Compte Crédit trouvé :", creditAccount);

  if (!creditAccount) {
    return <p>Compte Crédit introuvable</p>;
  }

  const { title, amount, description = "" } = creditAccount;

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />

      <div className="csstransaction-container">
        <h2 className="csstransaction-title">{title}</h2>
        <p className="csstransaction-amount">{formatAmount(amount || 0)}</p>
        <p className="csstransaction-description">{description || "Pas de description disponible"}</p>
      </div>

      <section className="account-transaction-general">
        <TransactionHistory transactions={creditAccount.transactions || []} />
      </section>

      <Footer />
    </div>
  );
};

export default TransactionsCreditPage;





