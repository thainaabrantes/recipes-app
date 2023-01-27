/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import Lupa from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const [renderSearchIcon, setRenderSearchIcon] = useState(false);
  const [showSearchComponent, setShowSearchComponent] = useState(false);

  useEffect(() => {
    const { pathname } = history.location;
    switch (pathname) {
    case '/meals':
      setRenderSearchIcon(true);
      break;
    case '/drinks':
      setRenderSearchIcon(true);
      break;
    default:
      setRenderSearchIcon(false);
    }
  }, []);

  return (
    <header>
      <div>
        { history.location.pathname === '/meals' && (
          <div>
            <img src={ mealIcon } alt="Meal" />
            <h1 data-testid="page-title">Meals</h1>
          </div>
        ) }
        { history.location.pathname === '/drinks' && (
          <div>
            <img src={ drinkIcon } alt="Drink" />
            <h1 data-testid="page-title">Drinks</h1>
          </div>
        ) }
        { history.location.pathname === '/profile' && (
          <div>
            <img src={ drinkIcon } alt="Drink" />
            <h1 data-testid="page-title">Profile</h1>
          </div>
        ) }
        {
          renderSearchIcon
          && (
            <button
              src={ Lupa }
              data-testid="search-top-btn"
              onClick={ () => setShowSearchComponent(!showSearchComponent) }
            >
              <img src={ Lupa } alt="Lupa" />
            </button>
          )
        }
        <button
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          onClick={ () => history.push('/profile') }
        >
          <img src={ ProfileIcon } alt="Usuário" />
        </button>
      </div>
      <div>
        {
          showSearchComponent && <input data-testid="search-input" />
        }
      </div>
    </header>
  );
}

export default Header;
