import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Recomend() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [recomendation, setRecomendation] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        let response;
        let data;
        if (location.pathname.includes('/meals')) {
          response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
          data = await response.json();
          setRecomendation(data.drinks);
        } else {
          response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          data = await response.json();
          setRecomendation(data.meals);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [location.pathname]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  return (recomendation);
}

export default Recomend;
