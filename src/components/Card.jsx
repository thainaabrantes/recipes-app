import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Card({ index, name, image, id }) {
  const history = useHistory();
  const handlerClickCard = () => {
    if (history.location.pathname === '/meals')history.push(`/meals/${id}`);
    if (history.location.pathname === '/drinks') history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <button
        onClick={ handlerClickCard }
        data-testid={ `${index}-recipe-card` }
      >
        Ver Receita
      </button>
      <img src={ image } data-testid={ `${index}-card-img` } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
