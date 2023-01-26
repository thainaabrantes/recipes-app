import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

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
        <p>
          {user && getEmail()}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
