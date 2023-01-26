const INGREDIENT_LABEL = 'ingredient';
const NAME_LABEL = 'name';
const LETTER_LABEL = 'first-letter';

const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_COCKTAILS = 'https://www.thecocktaildb.com/api/json/v1/1/';

const LENGTH_ALERT = 'Your search must have only 1 (one) character';
const RESULT_ALERT = 'Sorry, we haven\'t found any recipes for these filters.';

const INIT_SEARCH = {
  text: '',
  radio: INGREDIENT_LABEL,
};

export {
  INGREDIENT_LABEL,
  NAME_LABEL,
  LETTER_LABEL,
  URL_MEALS,
  URL_COCKTAILS,
  INIT_SEARCH,
  LENGTH_ALERT,
  RESULT_ALERT,
};
