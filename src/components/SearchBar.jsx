import { useContext, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';
import {
  INIT_SEARCH,
  INGREDIENT_LABEL,
  NAME_LABEL,
  LETTER_LABEL,
} from '../context/SearchBarProvider';

function SearchBar() {
  const { setSearchBar } = useContext(SearchBarContext);
  const [search, setSearch] = useState(INIT_SEARCH);

  const textInput = (
    <input
      type="text"
      onChange={ ({ target }) => setSearch({ ...search, text: target.value }) }
      data-testid="search-input"
    />
  );

  const radioInput = (
    <>
      <label htmlFor="ingredientRadio">
        <input
          type="radio"
          id="ingredientRadio"
          name="radioInput"
          value={ INGREDIENT_LABEL }
          onChange={ ({ target }) => setSearch({ ...search, radio: target.value }) }
          checked={ search.radio === INGREDIENT_LABEL }
          data-testid="ingredient-search-radio"
        />
        {'Ingredient '}
      </label>
      <label htmlFor="nameRadio">
        <input
          type="radio"
          id="nameRadio"
          name="radioInput"
          value={ NAME_LABEL }
          onChange={ ({ target }) => setSearch({ ...search, radio: target.value }) }
          checked={ search.radio === NAME_LABEL }
          data-testid="name-search-radio"
        />
        {'Name '}
      </label>
      <label htmlFor="firstLetterRadio">
        <input
          type="radio"
          id="firstLetterRadio"
          name="radioInput"
          value={ LETTER_LABEL }
          onChange={ ({ target }) => setSearch({ ...search, radio: target.value }) }
          checked={ search.radio === LETTER_LABEL }
          data-testid="first-letter-search-radio"
        />
        {'First letter '}
      </label>
    </>
  );

  const button = (
    <button
      type="button"
      onClick={ () => setSearchBar(search) }
      disabled={ !search.text }
      data-testid="exec-search-btn"
    >
      Search
    </button>
  );

  return (
    <>
      {textInput}
      {radioInput}
      {button}
    </>
  );
}

export default SearchBar;
