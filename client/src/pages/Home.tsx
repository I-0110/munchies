import { useState } from 'react';
import SearchInput from '../components/Search';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard';
import { useMutation } from '@apollo/client';
import { Recipe } from '../utils/models/Recipe';
import { retreiveTMDBRecipies } from '../utils/API/mealsAPI';
import Auth from '../utils/auth';
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
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSave = async (mealId: string, name: string, category: string, instructions: string, image_url: string, video_url: string, ingredients: [], day:string) => {
    console.log("I'm running!")
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
    <main className='bg-background h-screen w-full px-5'>
      <div className="flex-row justify-center">
        <div >
          {searchLoading ? (
            <div>Loading...</div>
          ) : (
          <div>
            <SearchInput value={query} onChange={setQuery} handleSearch={handleSearch}  />

            {result ? (
              Array.isArray(result) ? (
              <div className=''>
                <h3>Recipes:</h3>
                <div className='meal-list grid md:grid-cols-2 lg:grid-cols-4 my-3 gap-3 mx-5'>{result.map((meal: any) => (
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
                    { Auth.loggedIn() ? <select 
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
                    </select> : 
                    <Link className="text-center w-full border p-1 bg-gradient-to-r from-[#A2A2BE] bg-[#D72638] text-white rounded-[4px]"to="/login">Log in to save this recipe.</Link>}
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
