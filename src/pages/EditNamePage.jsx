import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserInfo from "../components/UserInfo"; 
import "../css/main.css";
import UserDashboard from "../components/UserDashboard";
import Footer from "../components/Footer";

const EditNamePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [newFirstName, setNewFirstName] = useState(''); 
  const [newLastName, setNewLastName] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem("userId"); 

    
    if (!userId) {
      console.error("Aucun utilisateur connecté");
      return;
    }

    fetch("/populateDatabase.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        return response.json();
      })
      .then((data) => {
        const currentUser = data.find((u) => u.id === userId); 
        setCurrentUser(currentUser);
        setNewFirstName(currentUser ? currentUser.firstName : '');  
        setNewLastName(currentUser ? currentUser.lastName : ''); 
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données", error);
      });
  }, []);

  
  const handleFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
  };

  
  const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
  };

  
  const handleSave = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, firstName: newFirstName, lastName: newLastName };

      
      setCurrentUser(updatedUser); 

      
      localStorage.setItem("userFirstName", newFirstName);
      localStorage.setItem("userLastName", newLastName);
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
    <div>
       <UserInfo user={user} handleSignOut={handleSignOut} />
       <UserDashboard
      currentUser={currentUser}
      newFirstName={newFirstName}
      newLastName={newLastName}
      handleFirstNameChange={handleFirstNameChange}
      handleLastNameChange={handleLastNameChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
    />
      <Footer />
    </div>
  );
};

export default EditNamePage;





