import { useState } from 'react';

import SearchInput from '../components/Search';

import MealCard from '../components/MealCard';

import { QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Recipe } from '../utils/models/Recipe';
import { retreiveTMDBRecipies } from '../utils/API/mealsAPI';


const Home = () => {
  const { loading: userLoading } = useQuery(QUERY_USERS);

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Recipe[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await retreiveTMDBRecipies(query); 
      const data = await response;
      
      setResult(data);
      console.log(`API response:`, data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {(userLoading || searchLoading) ? (
            <div>Loading...</div>
          ) : (
          <div>
            <SearchInput value={query} onChange={setQuery} handleSearch={handleSearch}  />

            {result ? (
              Array.isArray(result) ? (
              <div>
                <h3>Recipes:</h3>
                <div className='meal-list'>{result.map((meal: any) => (
                  <MealCard 
                    key={meal.idMeal}
                    _id={meal.idMeal} 
                    name={meal.strMeal}
                    category={meal.strCategory}
                    instructions={meal.strInstructions}
                    image_url={meal.strMealThumb}
                    video_url={meal.strYoutube}
                    ingredients={[]}
                  />
                ))}
                </div>
              </div>
              ) : (
                <p>No meals found from for "{query}"!</p>
              )
            ) : null}
          </div>
          )}
        </div>
      </div>    
    </main>
  );
};

export default Home;

  // type Meal = {
  //   idMeal: string;
  //   strMeal: string;
  //   strCategory: string;
  //   strInstructions: string;
  //   strMealThumb: string;
  //   strYoutube: string;
  // };
  
  // type MealAPIResponse = {
  //   meals: Meal[] | null;
  // }