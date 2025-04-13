import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCard from "./AccountCard";

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
        <h1>Welcome back</h1>
      </div>

      {currentUser ? (
        <div className="host-info">
            <div className="input-row">
              <input
                type="text"
                value={newFirstName}
                onChange={handleFirstNameChange}
                placeholder="Enter your first name"
                className="large-input"
              />
              <input
                type="text"
                value={newLastName}
                onChange={handleLastNameChange}
                placeholder="Enter your last name"
                className="large-input"
              />
            </div>
          <div className="button-row">
            <button onClick={handleSave} className="small-button">Save</button>
            <button onClick={handleCancel} className="small-button">Cancel</button>
          </div>

          <AccountCard
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          />

          <AccountCard
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          />

          <AccountCard
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          />
        </div>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}
    </main>
  );
};

export default UserDashboard;
