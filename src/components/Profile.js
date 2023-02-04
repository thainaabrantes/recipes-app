import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../css/profile.css';
import doneIcon from '../images/done-icon.svg';
import favoriteIcon from '../images/favorite-icon.svg';
import logoutIcon from '../images/logout.svg';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const enable = false;
  const title = 'Profile';

  function getEmail() {
    return (
      <p type="text" data-testid="profile-email">
        {user.email}
      </p>
    );
  }

  return (
    <>
      <Header
        enable={ enable }
        title={ title }
      />
      <div className="explore">
        <p className="profile-email">
          {user && getEmail()}
        </p>
        <div className="btns-container">
          <button
            className="profile-btn border-bottom"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <img className="icon" src={ doneIcon } alt="Done" />
            <span className="page-name">Done Recipes</span>
          </button>
          <button
            className="profile-btn border-bottom"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <img className="icon" src={ favoriteIcon } alt="Favorite" />
            <span className="page-name">Favorite Recipes</span>
          </button>
          <button
            className="profile-btn"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            <img className="icon" src={ logoutIcon } alt="Logout" />
            <span className="page-name">Logout</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
