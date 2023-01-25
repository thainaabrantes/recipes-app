import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lupa from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';

function Header() {
  const history = useHistory();
  const [renderSearch, setRenderSearch] = useState(false);

  useEffect(() => {
    const { pathname } = history.location;
    switch (pathname) {
    case '/meals':
      setRenderSearch(true);
      break;
    case '/drinks':
      setRenderSearch(true);
      break;
    default:
      setRenderSearch(false);
    }
  }, [history.location]);

  return (
    <header>
      <div>
        <h1 data-testid="page-title">RECIPES app</h1>
        {// 'Este botão será o componente de pesquisa:'
          renderSearch
          && (
            <button src={ Lupa } data-testid="search-top-btn">
              <img src={ Lupa } alt="Lupa" />
            </button>
          )
        }
        <img data-testid="profile-top-btn" src={ ProfileIcon } alt="Usuário" />
      </div>
    </header>
  );
}

export default Header;
