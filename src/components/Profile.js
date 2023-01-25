import React from 'react';
import Header from './Header';
import ProfileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <Header />
      <img src={ ProfileIcon } alt="Profile" />
      <h1 data-testid="page-title">Profile</h1>
    </div>
  );
}

export default Profile;
