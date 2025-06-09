import { useEffect, useState } from 'react';
import SearchInput from '../components/Search';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard';
import { useMutation } from '@apollo/client';
import { Recipe } from '../utils/models/Recipe';
import { retreiveTMDBRecipies } from '../utils/API/mealsAPI';
import Auth from '../utils/auth';
import { ADD_RECIPE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import munchies from '../assets/munchies.png';

const Home = () => {

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Recipe[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [status, setStatus] = useState<Boolean>(false)
  const [click, setClick] = useState<Boolean>(false)
  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(false)
      setClick(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await retreiveTMDBRecipies(query);
      setResult(response);
      console.log(response)
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSave = async (mealId: string, name: string, category: string, instructions: string, image_url: string, video_url: string, ingredients: [], day: string) => {
    try {
      setClick(true)
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
      setStatus(true)
      if (!response) {
        throw new Error("Recipe did not save!");
      }

      console.log("Recipe successfully saved!");
    } catch (err) {
      console.error("Recipe failed to save...", err);
    }
  };

  return (
    <main className='h-screen w-full px-5 py-5'>
      <div>
        <div>
          {searchLoading ? (
            <div className='bg-background-semi-transparent border-3 border-accent shadow-lg shadow-accent w-max m-auto p-3'>Loading...</div>
          ) : (
            <div className='flex-column'>
              <SearchInput value={query} onChange={setQuery} handleSearch={handleSearch} />

              {result ? (
                Array.isArray(result) && result.length > 0 ? (
                  <div>
                    <h3 className='bg-background-semi-transparent test-font w-max border border-accent'>Recipes:</h3>
                    <div className='meal-list grid md:grid-cols-2 lg:grid-cols-3 my-3 gap-3 mx-5'>{result.map((meal: any) => (
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
                        {Auth.loggedIn() ? <select
                          className='bg-background-semi-transparent'
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
                          )}>
                          <option value="" >Choose a Day to Save</option>
                          <option value="sunday">Sunday</option>
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                          <option value="saturday">Saturday</option>
                        </select> :
                          <Link className="text-center w-full border p-1 bg-gradient-to-r from-[#A2A2BE] bg-[#D72638] text-white rounded-[4px]" to="/login">Log in to save this recipe.</Link>}
                      </div>
                    ))}

                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'whitesmoke' }}>No meals found for "{query}"!</p>
                )
              ) : null}
            </div>
          )}
          {/* Description of the website */}
          {!Auth.loggedIn() ? <div className="md:w-1/3 lg:w-1/2 m-auto my-4 bg-background-semi-transparent shadow-sm border border-slate-200 rounded-lg p-2">
            <div className="p-3 text-center">
              <div className="flex justify-center mb-4">
                <img src={munchies} className="w-10 h-10" />
              </div>
              <div className="flex justify-center mb-2">
                <h5 className="text-slate-800 text-2xl font-semibold text-center">
                  What is Munchies?
                </h5>
              </div>
              <p className="block text-slate-600 leading-normal font-light mb-4 text-center">
                Munchies is a meal planning application that lets you search for ingredients and recipes and plan your meals for the week!
              </p>
              <div className="flex justify-center mb-2">
                <h5 className="text-slate-800 text-2xl font-semibold text-center">
                  How do I use it?
                </h5>
              </div>
              <p className="block text-slate-600 leading-normal font-light mb-4 text-center">
                To use Munchies, you need to have an account. Login or register by clicking <span><Link to='/login' className="text-slate-900">here</Link></span> or by clicking on the "Login" button above. All you need to create an account is your name, a valid email, and a password. Once you have an account, you can login at any time to search and add recipes to your weekly plan, adjust your plan, add your own recipes, view and print recipes, watch the video tutorial for your recipes, or collect the shopping list of items you need for the week! Feel free to explore the various features of the application and happy planning!
              </p>
            </div>
          </div>
            :
            <div className="md:w-1/3 lg:w-1/2 m-auto my-4 bg-background-semi-transparent shadow-sm border border-slate-200 rounded-lg p-2">
              <div className="p-3 text-center">
                <div className="flex justify-center mb-4">
                  <img src={munchies} className="w-10 h-10" />
                </div>
                <div className="flex justify-center mb-2">
                  <h5 className="text-slate-800 text-2xl font-semibold text-center">
                    Thanks for supporting Munchies!
                  </h5>
                </div>
              </div>
            </div>}
        </div>
      </div>
      {click && (
        <div className='save-message'>
          {status ? (
            !error ? (
              <div>
                <p>Recipe Saved!</p>
                <div className='save-message-slider'></div>
              </div>
            ) : (
              <div>
                <p>Recipe failed to save.</p>
                <div className='save-message-slider'></div>
              </div>
            )
          ) : (
            <div>
              <p>Saving...</p>
            </div>
          )}
        </div>
      )}
      <div className='padding py-6'></div>
    </main>
  );
};

export default Home;
