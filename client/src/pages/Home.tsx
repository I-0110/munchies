import { useState } from 'react';

import SearchInput from '../components/Search';

import MealCard from '../components/MealCard';

import UserList from '../components/UserList';

import { QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
};

type MealAPIResponse = {
  meals: Meal[] | null;
}

const Home = () => {
  const { loading: userLoading, data } = useQuery(QUERY_USERS);

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<MealAPIResponse | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      setResult(data);
      console.log(`API response:`, data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const users = data?.users || [];

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
              Array.isArray(result.meals) ? (
              <div>
                <h3>Recipes:</h3>
                <div className='meal-list'>{result.meals.map((meal: any) => (
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

            <UserList
              users={users}
              recipe="Here are current recipes from munchies' users..." 
            />
          </div>
          )}
        </div>
      </div>    
    </main>
  );
};

export default Home;
