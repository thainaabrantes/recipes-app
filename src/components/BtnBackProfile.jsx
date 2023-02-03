import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/BtnBackProfile.css';

function BtnBackProfile() {
  const history = useHistory();

  const backPage = () => {
    if (history.location.pathname.includes('/done-recipes')) {
      history.push('/profile');
    }
    if (history.location.pathname.includes('/favorite-recipes')) {
      history.push('/profile');
    }
  };
  return (
    <button
      type="button"
      className="back-profile-btn"
      onClick={ backPage }
    >
      <img src="https://cdn-icons-png.flaticon.com/512/892/892662.png" alt="back.icon" />
    </button>
  );
}

BtnBackProfile.propTypes = {}.isRequired;

export default BtnBackProfile;
