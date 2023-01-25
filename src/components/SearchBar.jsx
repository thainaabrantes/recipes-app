import { useState } from 'react';

const INIT_SEARCH = {
  text: '',
  radio: '',
};

function SearchBar() {
  const [search, setSearch] = useState(INIT_SEARCH);

  const handleRadio = (value) => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    switch (value) {
    case 'Ingredient':
      setSearch({ ...search, radio: `${URL}i=${search.text}` });
      break;
    case 'Name':
      setSearch({ ...search, radio: `${URL}s=${search.text}` });
      break;
    case 'First letter':
      setSearch({ ...search, radio: `${URL}f=${search.text}` });
      break;
    default:
      return search;
    }
  };

  const textInput = (
    <input
      type="text"
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
          value="Ingredient"
          onChange={ ({ target }) => handleRadio(target.value) }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameRadio">
        <input
          type="radio"
          id="nameRadio"
          name="radioInput"
          value="Name"
          onChange={ ({ target }) => handleRadio(target.value) }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetterRadio">
        <input
          type="radio"
          id="firstLetterRadio"
          name="radioInput"
          value="First letter"
          onChange={ ({ target }) => handleRadio(target.value) }
          data-testid="first-letter-search-radio"
        />
      </label>
    </>
  );

  const button = (
    <button
      type="button"
      onClick={ () => setSearchBar((prev) => ({ ...prev, ...search })) }
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
