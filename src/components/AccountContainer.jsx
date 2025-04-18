import React from "react";

const AccountContainer = ({ title, amount, description }) => {
  return (
    <div className="account-container">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
    </div>
  );
};

export default AccountContainer;
