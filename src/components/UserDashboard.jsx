import React, { useEffect, useState } from "react";
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
  const [userData, setUserData] = useState(currentUser); 
  const navigate = useNavigate();

  useEffect(() => {
    if (newFirstName && newLastName) {
      localStorage.setItem("userFirstName", newFirstName);
      localStorage.setItem("userLastName", newLastName);
    }
  }, [newFirstName, newLastName]);

  useEffect(() => {
    setUserData(prevData => ({
      ...prevData,
      firstName: localStorage.getItem("userFirstName") || currentUser.firstName,
      lastName: localStorage.getItem("userLastName") || currentUser.lastName,
    }));
  }, [currentUser]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back, 
        </h1>
      </div>

      {currentUser ? (
        <div className="host-info">
          <div className="input-row">
            <input
              type="text"
              value={newFirstName || userData.firstName} 
              onChange={handleFirstNameChange} 
              placeholder="Enter your first name"
              className="large-input"
            />
            <input
              type="text"
              value={newLastName || userData.lastName}  
              onChange={handleLastNameChange} 
              placeholder="Enter your last name"
              className="large-input"
            />
          </div>
          <div className="button-row">
            <button onClick={handleSave} className="small-button">
              Save
            </button>
            <button onClick={handleCancel} className="small-button">
              Cancel
            </button>
          </div>

          <AccountCard
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
            accountType="checking"  
            accountId="checking-1"  
          />

          <AccountCard
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
            accountType="savings"  
            accountId="savings-1" 
          />

          <AccountCard
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
            accountType="credit"  
            accountId="credit-1"  
          />
        </div>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}
    </main>
  );
};

export default UserDashboard;



