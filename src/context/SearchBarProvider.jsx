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
  const [recipes, setRecipes] = useState({ URL: '', results: [], type: '' });
  const history = useHistory();
  const searchMemo = useMemo(() => ({ searchBar, setSearchBar }), [searchBar]);

  useEffect(() => {
    const { text, radio } = searchBar;
    const { pathname } = history.location;

    function handleLabel(URL, type) {
      let setURL;

      switch (radio) {
      case INGREDIENT_LABEL:
        setURL = `${URL}filter.php?i=${text}`;
        break;
      case NAME_LABEL:
        setURL = `${URL}search.php?s=${text}`;
        break;
      default:
        if (text.length === 1) setURL = `${URL}search.php?f=${text}`;
        else global.alert(LENGTH_ALERT);
      }

      setRecipes((prev) => ({ ...prev, URL: setURL, type }));
      return setURL;
    }

    if (text) {
      const actualURL = pathname === '/meals'
        ? handleLabel(URL_MEALS, 'meals')
        : handleLabel(URL_COCKTAILS, 'drinks');

      const fetchAPI = async () => {
        try {
          if (actualURL === null) return null;
          const response = await fetch(actualURL);
          const data = await response.json();
          setRecipes((prev) => ({ ...prev, results: data }));
        } catch {
          setRecipes((prev) => ({ ...prev, results: null }));
        }
      }; fetchAPI();
    }
  }, [history, searchBar]);

  // REDIRECIONAR À TELA DE DETALHES;
  useEffect(() => {
    const { pathname } = history.location;
    const { results, type } = recipes;
    const ID = type === 'meals' ? 'idMeal' : 'idDrink';

    if (results === null || results[type] === null) {
      return global.alert(RESULT_ALERT);
    } if (results[type] && results[type].length === 1) {
      return history.push(`${pathname}/${results[type][0][ID]}`); // `${pathname}/${recipes.idMeal}`
    } if (results[type] && results[type].length > 1) {
      console.log(results[type]);
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
