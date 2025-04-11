import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import "../css/main.css";
import UserInfo from "../components/UserInfo"; 
import Footer from "../components/Footer";


const TransactionsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  // Fonction pour gérer la déconnexion
  const handleSignOut = () => {
    // Supprimer les informations utilisateur du localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");

    // Rediriger l'utilisateur vers la page d'accueil après la déconnexion
    navigate("/"); 
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Récupérer l'ID de l'utilisateur depuis le localStorage

    if (!userId) {
      console.error("Aucun utilisateur connecté");
      setLoading(false); // Stopper le chargement si l'utilisateur n'est pas connecté
      return;
    }

    // Charger les utilisateurs depuis un fichier ou API
    fetch("/populateDatabase.json")
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data.find((u) => u.id === userId); // Trouver l'utilisateur avec l'ID
        setUser(currentUser); // Mettre à jour l'état avec l'utilisateur
        setLoading(false); // Stopper le chargement
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données utilisateur", error);
        setLoading(false); // Stopper le chargement même en cas d'erreur
      });
  }, []); // Ce useEffect s'exécute une seule fois au montage du composant

  return (
    <div>
        {/* Utilisation du composant UserInfo pour afficher les infos de l'utilisateur */}
        <UserInfo user={user} handleSignOut={handleSignOut} />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TransactionsPage;



