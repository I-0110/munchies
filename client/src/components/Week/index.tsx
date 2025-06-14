import React from 'react'
import { useMutation } from '@apollo/client';
import { REMOVE_RECIPES } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import MealCard from '../MealCard';

type WeekProps = {
    user: {
        _id: string;
        name: string;
        recipes: any[];
    }
}

const Week: React.FC<WeekProps> = ({ user }) => {

    const [removeRecipe] = useMutation(REMOVE_RECIPES, {
          refetchQueries: [QUERY_ME],
    });

    const handleDelete = async (day: string, recipeId: string) => {
        try {
            await removeRecipe({
                variables: { day, recipeId }
            });
        } catch (err) {
            console.error('Failed to delete recipe:', err);
        }
    };

    return <div className='flex flex-col items-center justify-center'>
        <h1 className='bg-background-semi-transparent !my-5 w-max align-center p-3 border-2 border-accent shadow-md shadow-accent-dark rounded-lg'
        >Here's Your Plan</h1>
            <div className="day-card w-9/10 min-w-[300px] mx-aut0">
                <ul>
                    {[
                        { name: 'Sunday', key: 'sunday' },
                        { name: 'Monday', key: 'monday' },
                        { name: 'Tuesday', key: 'tuesday' },
                        { name: 'Wednesday', key: 'wednesday' },
                        { name: 'Thursday', key: 'thursday' },
                        { name: 'Friday', key: 'friday' },
                        { name: 'Saturday', key: 'saturday' },
                    ].map(day => (
                        <div
                            className="day-card my-2 bg-background-semi-transparent border-2 border-accent rounded-lg shadow-md shadow-accent-dark text-font"
                            key={day.key}
                        >
                            <h2>{day.name}</h2>
                            <ul>
                                {user.recipes
                                    .filter(recipe => recipe.day === day.key)
                                    .map((recipe, idx) => (
                                        <li key={idx} className='mb-7'>
                                            <MealCard 
                                             _id={recipe.mealId} 
                                             name={recipe.name}
                                             category={recipe.category}
                                             instructions={recipe.instructions}
                                             image_url={recipe.image_url}
                                             video_url={recipe.video_url}
                                             ingredients={[]}
                                            />
                                            {/* <h3>{recipe.name}{' '}</h3> */}
                                            <button className='bg-button text-background px-4 py-2 rounded-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent hover:bg-button-dark' onClick={async () => {
                                                try {
                                                    await handleDelete(day.key, recipe._id);
                                                } catch (err) {
                                                    console.error(err)
                                                }
                                            }}> Remove </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
    </div>
}

export default Week