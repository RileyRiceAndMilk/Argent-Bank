import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../components/UserInfo";
import UserDashboard from "../components/UserDashboard";
import Footer from "../components/Footer";
import "../css/style.css";

const EditNamePage = () => {
  const [currentUser, setCurrentUser] = useState(null);  
  const [newFirstName, setNewFirstName] = useState('');  
  const [newLastName, setNewLastName] = useState('');    
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem("userId");  

    if (!userId) {
      console.error("Aucun utilisateur connecté");
      navigate("/sign");
      return;
    }

    
    const firstName = localStorage.getItem("userFirstName");
    const lastName = localStorage.getItem("userLastName");
    if (firstName && lastName) {
      setCurrentUser({ id: userId, firstName, lastName });
      setNewFirstName(firstName);  
      setNewLastName(lastName);  
    } else {
      console.error("Données utilisateur introuvables dans localStorage.");
      navigate("/sign");
    }
  }, [navigate]);

  const handleFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
  };

  const handleSave = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, firstName: newFirstName, lastName: newLastName };

      localStorage.setItem("userFirstName", newFirstName); 
      localStorage.setItem("userLastName", newLastName); 

      setCurrentUser(updatedUser);

      navigate("/userpage"); 
    }
  };

  const handleCancel = () => {
    setNewFirstName(currentUser.firstName);  
    setNewLastName(currentUser.lastName);  
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    navigate("/");  
  };

  return (
    <div className="homepage"> 
      {currentUser ? (
        <>
          <UserInfo user={currentUser} handleSignOut={handleSignOut} />
          <UserDashboard
            currentUser={currentUser}
            newFirstName={newFirstName}
            newLastName={newLastName}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </>
      ) : (
        <p>Chargement...</p>  
      )}
      <Footer />
    </div>
  );
};

export default EditNamePage;










