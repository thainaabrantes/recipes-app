import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/BtnBack.css';

function BtnBack() {
  const history = useHistory();
  const pageId = history.location.pathname.replace(/[^0-9]/g, '');

  const backPage = () => {
    if (history.location.pathname.includes('/meals')) {
      if (history.location.pathname === `/meals/${pageId}/in-progress`) {
        history.push(`/meals/${pageId}`);
      } else {
        history.push('/meals');
      }
    }
    if (history.location.pathname.includes('/drinks')) {
      if (history.location.pathname === `/drinks/${pageId}/in-progress`) {
        history.push(`/drinks/${pageId}`);
      } else {
        history.push('/drinks');
      }
    }
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
