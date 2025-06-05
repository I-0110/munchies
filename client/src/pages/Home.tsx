import { useState } from 'react';
import SearchInput from '../components/Search';
import MealCard from '../components/MealCard';


import { QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Recipe } from '../utils/models/Recipe';
import { retreiveTMDBRecipies } from '../utils/API/mealsAPI';

import { ADD_RECIPE } from '../utils/mutations';
import { convertToRecipe } from '../utils/models/Recipe'

const Home = () => {

  const { loading: userLoading } = useQuery(QUERY_USERS);

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Recipe[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const [addRecipe] = useMutation(ADD_RECIPE)

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

  const handleSave = async (mealId: string, name: string, category: string, instructions: string, image_url: string, video_url: string, ingredients: [], day:string) => {
    console.log("I'm running!")
    console.log(ingredients)
    try {

      const response = await addRecipe({
        variables: { 
          input: { 
            day, 
            mealId, 
            name, 
            category, 
            instructions, 
            image_url, 
            video_url, 
            ingredients: ingredients 
          } 
        },
      });

      if (!response) {
        throw new Error("Recipe did not save!");
      }

      console.log("Recipe successfully saved!");
    } catch (err) {
      console.error("Recipe failed to save...", err);
    }
  };

  // const users = data?.users || [];
  
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {searchLoading ? (
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
