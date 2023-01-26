import { useMemo, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBarContext from './SearchBarContext';
import {
  INGREDIENT_LABEL,
  NAME_LABEL,
  URL_MEALS,
  URL_COCKTAILS,
  INIT_SEARCH,
  LENGTH_ALERT,
  RESULT_ALERT,
} from '../helpers/strings';

function SearchBarProvider({ children }) {
  const [searchBar, setSearchBar] = useState(INIT_SEARCH);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const searchMemo = useMemo(() => ({ searchBar, setSearchBar }), [searchBar]);

  useEffect(() => {
    const { text, radio } = searchBar;
    const { pathname } = history.location;

    function handleLabel(URL) {
      switch (radio) {
      case INGREDIENT_LABEL:
        return `${URL}filter.php?i=${text}`;
      case NAME_LABEL:
        return `${URL}search.php?s=${text}`;
      default:
        return text.length === 1
          ? `${URL}search.php?f=${text}`
          : global.alert(LENGTH_ALERT);
      }
    }

    if (text) {
      const actualURL = pathname === '/meals'
        ? handleLabel(URL_MEALS)
        : handleLabel(URL_COCKTAILS);

      const fetchAPI = async () => {
        try {
          if (actualURL === null) return null;
          const response = await fetch(actualURL);
          const data = await response.json();
          setRecipes(data);
        } catch {
          setRecipes(null);
        }
      }; fetchAPI();
    }
  }, [history, searchBar]);

  // REDIRECIONAR À TELA DE DETALHES;
  useEffect(() => {
    const { pathname } = history.location;
    const path = pathname.slice(1);
    if (recipes === null) {
      return global.alert(RESULT_ALERT);
    } if (recipes[path] === null) {
      return global.alert(RESULT_ALERT);
    } if (recipes[path] && recipes[path].length === 1) {
      return history.push();
    }
  }, [history, recipes]);

  return (
    <SearchBarContext.Provider value={ searchMemo }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: propTypes.objectOf(Object),
}.isRequired;

export default SearchBarProvider;
