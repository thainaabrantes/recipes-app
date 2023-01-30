import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/BtnStartRecipe.css';

function BtnStartRecipe(props) {
  const { id, typeFood } = props;
  const history = useHistory();

  const redirectTo = () => {
    history.push(`/${typeFood}/${id}/in-progress`);
  };

  return (
    <button
      className="btnStart"
      type="button"
      onClick={ redirectTo }
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

BtnStartRecipe.propTypes = {}.isRequired;

export default BtnStartRecipe;
