import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UserInfo from '../components/UserInfo';
import TransactionHistory from '../components/TransactionHistory';
import Footer from '../components/Footer';

import { logoutUser } from '../slices/userSlice';

const TransactionsCheckingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [checkingAccount, setCheckingAccount] = useState(null);

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

        const account = foundUser.accounts.find(acc => acc.accountType === 'checking');

        if (!account) {
          setCheckingAccount(null);
        } else {
          setCheckingAccount(account);
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
  if (!checkingAccount) return <p>Compte Checking non trouvé</p>;

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




