import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lupa from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';

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
    <header>
      <div>
        <h1 data-testid="page-title">RECIPES app</h1>
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
