import React from 'react';
import PropTypes from 'prop-types';

const WelcomeHeader = ({ user, handleEditName }) => {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user.firstName} {user.lastName}!
      </h1>
      <button className="edit-button" onClick={handleEditName}>
        Edit Name
      </button>
    </div>
  );
};

WelcomeHeader.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  handleEditName: PropTypes.func.isRequired,
};

export default WelcomeHeader;
