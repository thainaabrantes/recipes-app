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
} from '../helpers/strings';

function SearchBarProvider({ children }) {
  const [searchBar, setSearchBar] = useState(INIT_SEARCH);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const searchMemo = useMemo(() => ({ searchBar, setSearchBar }), [searchBar]);

  useEffect(() => {
    const { text, radio } = searchBar;
    const { pathname } = history.location;

    function handleLetter(URL) {
      if (text.length === 1) return `${URL}search.php?f=${text}`;
      global.alert('Your search must have only 1 (one) character');
      return null;
    }

    function handleRadio(URL) {
      switch (radio) {
      case INGREDIENT_LABEL:
        return `${URL}filter.php?i=${text}`;
      case NAME_LABEL:
        return `${URL}search.php?s=${text}`;
      default:
        return handleLetter(URL);
      }
    }

    if (text) {
      const actualURL = pathname === '/meals'
        ? handleRadio(URL_MEALS)
        : handleRadio(URL_COCKTAILS);

      const fetchAPI = async () => {
        if (actualURL === null) return null;
        const response = await fetch(actualURL);
        const data = await response.json();
        setRecipes(data);
      }; fetchAPI();
    }
  }, [history, searchBar]);

  // REDIRECIONAR À TELA DE DETALHES;
  useEffect(() => {
    const { pathname } = history.location;
    const path = pathname.slice(1);

    if (recipes[path]) {
      if (recipes[path].length === 1) {
        history.push();
      }
    } else if (recipes[path] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
