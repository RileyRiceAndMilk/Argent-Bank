import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({
  currentUser,
  newFirstName,
  newLastName,
  handleFirstNameChange,
  handleLastNameChange,
  handleSave,
  handleCancel
}) => {
  const navigate = useNavigate();

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Edit Name</h1>
      </div>

      {currentUser ? (
        <div className="host-info">
          <p>
            <input
              type="text"
              value={newFirstName}
              onChange={handleFirstNameChange}
              placeholder="Enter your first name"
            />
            <input
              type="text"
              value={newLastName}
              onChange={handleLastNameChange}
              placeholder="Enter your last name"
            />
          </p>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>

        
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button
                className="transaction-button"
                onClick={() => navigate("/transactions")}
              >
                View transactions
              </button>
            </div>
          </section>

        
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button
                className="transaction-button"
                onClick={() => navigate("/transactions")}
              >
                View transactions
              </button>
            </div>
          </section>

          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button
                className="transaction-button"
                onClick={() => navigate("/transactions")}
              >
                View transactions
              </button>
            </div>
          </section>
        </div>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}
    </main>
  );
};

export default UserDashboard;
