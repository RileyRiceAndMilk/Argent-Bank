import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UserInfo from '../components/UserInfo';
import TransactionHistory from '../components/TransactionHistory';
import Footer from '../components/Footer';

import { logoutUser } from '../slices/userSlice';

const TransactionsCreditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [creditAccount, setCreditAccount] = useState(null);

  const formatAmount = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/sign");
      return;
    }

    fetch("/populateDatabase.json")
      .then(res => res.json())
      .then(users => {
        const foundUser = users.find(u => u.id === user.id);

        if (!foundUser) {
          navigate("/sign");
          return;
        }

        foundUser.firstName = user.firstName || foundUser.firstName;
        foundUser.lastName = user.lastName || foundUser.lastName;

        const account = foundUser.accounts.find(acc => acc.accountType === 'credit');

        if (!account) {
          setCreditAccount(null);
        } else {
          setCreditAccount(account);
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données", error);
        navigate("/sign");
      });
  }, [user, navigate]);

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate('/sign');
  };

  if (!user) return <p>Chargement...</p>;
  if (!creditAccount) return <p>Compte Crédit introuvable</p>;

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






