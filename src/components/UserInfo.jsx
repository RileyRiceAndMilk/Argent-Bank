import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo'; // si tu utilises ce composant
import { useNavigate } from 'react-router-dom';

const EditNamePage = () => {
  const [user, setUser] = useState(null); // <- user est défini ici
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    navigate("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch("/populateDatabase.json")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find((u) => u.id === userId);
        setUser(currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des données :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <UserInfo user={user} handleSignOut={handleSignOut} />
      {/* ... reste de ta page */}
    </div>
  );
};

export default EditNamePage;

