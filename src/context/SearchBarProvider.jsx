import { useMemo, useState, useEffect } from 'react';
import propTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import SearchBarContext from './SearchBarContext';

const INGREDIENT_LABEL = 'Ingredient';
const NAME_LABEL = 'Name';
const LETTER_LABEL = 'First letter';

const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_COCKTAILS = 'https://www.thecocktaildb.com/api/json/v1/1/';

const INIT_SEARCH = {
  text: '',
  radio: INGREDIENT_LABEL,
};

function SearchBarProvider({ children }) {
  const [searchBar, setSearchBar] = useState(INIT_SEARCH);
  const searchMemo = useMemo(() => ({ searchBar, setSearchBar }), [searchBar]);
  const location = 0;

  useEffect(() => {
    const { text, radio } = searchBar;

    function handleLetter(validated) {
      if (validated) setSearchBar(`${URL}search.php?f=${search.text}`);
      else global.alert('Your search must have only 1 (one) character');
    }

    function handleRadio(URL) {
      switch (radio) {
      case INGREDIENT_LABEL:
        return `${URL}filter.php?i=${text}`;
      case NAME_LABEL:
        return `${URL}search.php?s=${text}`;
      default:
        return handleLetter(text.length === 1);
      }
    }

    if (text) {
      const actualURL = location === 0
        ? handleRadio(URL_MEALS)
        : handleRadio(URL_COCKTAILS);

      const fetchAPI = async () => {
        const response = await fetch(actualURL);
        const data = await response.json();
        console.log(data);
      }; fetchAPI();
    }
  }, [searchBar]);

  return (
    <SearchBarContext.Provider value={ searchMemo }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: propTypes.objectOf(Object),
}.isRequired;

export {
  INIT_SEARCH,
  INGREDIENT_LABEL,
  NAME_LABEL,
  LETTER_LABEL,
};

export default SearchBarProvider;
