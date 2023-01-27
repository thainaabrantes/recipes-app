import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import useRecipeAPI from '../hook/useRecipeAPi';

export default function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider
      value={ recipe }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
