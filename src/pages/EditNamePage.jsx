import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, logoutUser } from '../slices/userSlice';  
import UserInfo from "../components/UserInfo";
import UserDashboard from "../components/UserDashboard";
import Footer from "../components/Footer";
import "../css/style.css";

const EditNamePage = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate("/sign");
      return;
    }
    setNewFirstName(user.firstName);
    setNewLastName(user.lastName);
  }, [user, navigate]);

  const handleFirstNameChange = (e) => setNewFirstName(e.target.value);
  const handleLastNameChange = (e) => setNewLastName(e.target.value);

  const handleSave = () => {
    dispatch(setUserData({ 
      id: user.id,
      firstName: newFirstName, 
      lastName: newLastName 
    }));
    navigate("/userpage");
  };

  const handleCancel = () => {
    setNewFirstName(user.firstName);
    setNewLastName(user.lastName);
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="homepage">
      {user ? (
        <>
          <UserInfo user={user} handleSignOut={handleSignOut} />
          <UserDashboard
            currentUser={user}
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











