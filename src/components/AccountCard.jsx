import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AccountCard = ({ title, amount, description, accountType, accountId }) => {
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    if (accountType === 'checking') {
      navigate('/transactions-checking');
    } else if (accountType === 'savings') {
      navigate('/transactions-savings');
    } else if (accountType === 'credit') {
      navigate('/transactions-credit');
    }
  };

  return (
    <section className="account" id={`account-${accountId}`}>
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">
          {typeof amount === 'number' ? `$${amount.toFixed(2)}` : 'Montant indisponible'}
        </p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={handleViewTransactions}>
          View transactions
        </button>
      </div>
    </section>
  );
};

AccountCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  accountId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AccountCard;






