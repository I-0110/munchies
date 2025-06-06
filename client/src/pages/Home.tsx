import { useState } from 'react';
import SearchInput from '../components/Search';
import MealCard from '../components/MealCard';
import { useMutation } from '@apollo/client';
import { Recipe } from '../utils/models/Recipe';
import { retreiveTMDBRecipies } from '../utils/API/mealsAPI';

import { ADD_RECIPE } from '../utils/mutations';

const Home = () => {

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Recipe[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const [addRecipe] = useMutation(ADD_RECIPE);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await retreiveTMDBRecipies(query); 
      
      setResult(response);
      console.log(`API response:`, response);

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

  return (
    <main className='bg-background h-full w-screen h-screen mt-2'>
      <div className="flex-row justify-center">
        <div className="flex-row">
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
                  <div key={meal.idMeal}>
                    <MealCard 
                      _id={meal.idMeal} 
                      name={meal.strMeal}
                      category={meal.strCategory}
                      instructions={meal.strInstructions}
                      image_url={meal.strMealThumb}
                      video_url={meal.strYoutube}
                      ingredients={[]}
                    />
                    <select 
                      name="choice" 
                      multiple={false} 
                      onChange={(e) => handleSave(
                      meal.idMeal, 
                      meal.strMeal, 
                      meal.strCategory, 
                      meal.strInstructions, 
                      meal.strMealThumb, 
                      meal.strYoutube, 
                      meal.ingredients, 
                      (e.target as HTMLSelectElement).value
                      )}
                    >
                      <option value="" >Choose a Day to Save</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
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
