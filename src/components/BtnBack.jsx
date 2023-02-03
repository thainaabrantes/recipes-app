import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/BtnBack.css';

function BtnBack(props) {
  const { link } = props;
  const history = useHistory();
  const backPage = () => {
    history.push(link);
  };
  return (
    <button
      type="button"
      className="back-btn"
      onClick={ backPage }
    >
      <img src="https://cdn-icons-png.flaticon.com/512/892/892662.png" alt="back.icon" />
    </button>
  );
}

BtnBack.propTypes = {}.isRequired;

export default BtnBack;
