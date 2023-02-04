import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

function Recomend() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [recomendation, setRecomendation] = useState([]);
  const SIX = 6;

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        let response;
        let data;
        if (location.pathname.includes('/meals')) {
          response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
          data = await response.json();
          setRecomendation(data.drinks.slice(0, SIX));
        } else {
          response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          data = await response.json();
          setRecomendation(data.meals.slice(0, SIX));
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
    return <Loading />;
  }
  return ({ recomendation, isLoading });
}

export default Recomend;
