/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drink-icon.svg';
import logo from '../images/recipes-logo.svg';
import lupa from '../images/searchIcon.svg';
import profileBlue from '../images/profileIcon.svg';
import profileYellow from '../images/profile-yellow.svg';
import mealIcon from '../images/meal-icon.svg';
import favoriteIcon from '../images/favorite-icon.svg';
import doneIcon from '../images/done-icon.svg';
import SearchBar from './SearchBar';
import '../css/header.css';

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
  }, [history.location]);

  return (
    <header className="header">
      <div className="yellow-container row">
        <div className="logo-container row">
          <img src={ logo } alt="Logo" />
          <p className="title-p">RECIPES</p>
          <h1 className="title-h1">app</h1>
        </div>
        <div className="row">
          {
            renderSearchIcon
          && (
            <button
              className="search-top-btn"
              src={ lupa }
              data-testid="search-top-btn"
              onClick={ () => setShowSearchComponent(!showSearchComponent) }
            >
              <img src={ lupa } alt="Lupa" />
            </button>
          )
          }
          <button
            className="profile-top-btn"
            data-testid="profile-top-btn"
            src={ profileBlue }
            onClick={ () => history.push('/profile') }
          >
            <img src={ profileBlue } alt="Usuário" />
          </button>
        </div>
      </div>
      <div className="page-title-container">
        { history.location.pathname === '/meals' && (
          <div className="page-title">
            <img src={ mealIcon } alt="Meal" />
            <h1 data-testid="page-title">Meals</h1>
          </div>
        ) }
        { history.location.pathname === '/drinks' && (
          <div className="page-title">
            <img src={ drinkIcon } alt="Drink" />
            <h1 data-testid="page-title">Drinks</h1>
          </div>
        ) }
        { history.location.pathname === '/profile' && (
          <div className="page-title">
            <img src={ profileYellow } alt="Profile" />
            <h1 data-testid="page-title">Profile</h1>
          </div>
        ) }
        { history.location.pathname === '/done-recipes' && (
          <div className="page-title">
            <img src={ doneIcon } alt="Done" />
            <h1 data-testid="page-title">Done Recipes</h1>
          </div>
        ) }
        { history.location.pathname === '/favorite-recipes' && (
          <div className="page-title">
            <img src={ favoriteIcon } alt="Heart" />
            <h1 data-testid="page-title">Favorite Recipes</h1>
          </div>
        ) }
      </div>
      <div className="searchBarDiv">
        {
          showSearchComponent && <SearchBar />
        }
      </div>
    </header>
  );
}

export default Header;
