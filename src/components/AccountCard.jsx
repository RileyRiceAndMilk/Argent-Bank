import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AccountCard = ({ title, amount, description, accountType, accountId }) => {
  const navigate = useNavigate();

  const parseAmount = (amount) => {
    if (typeof amount === 'string') {
      const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
      return isNaN(numericAmount) ? null : numericAmount; 
    }
    return amount; 
  };

  const numericAmount = parseAmount(amount);

  const handleViewTransactions = () => {
    console.log(`Navigating to transactions for account type: ${accountType}`);
    
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
          {numericAmount !== null ? `$${numericAmount.toFixed(2)}` : 'Montant indisponible'}
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
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, 
  description: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  accountId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default AccountCard;







