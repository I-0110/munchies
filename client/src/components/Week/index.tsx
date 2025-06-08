import React from 'react'
import { useMutation } from '@apollo/client';
import { REMOVE_RECIPES } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

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

    return <div>
        <h1 className='bg-background-semi-transparent !ml-3 !my-5 w-max'>{user.name}'s Meal Plan:</h1>
        <ul>
            <div className="day-card w-1/2 mx-auto">
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
                            className="day-card bg-background-semi-transparent text-font"
                            key={day.key}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                margin: '8px 0',
                                padding: '12px',
                            }}
                        >
                            <h2>{day.name}</h2>
                            <ul>
                                {user.recipes
                                    .filter(recipe => recipe.day === day.key)
                                    .map((recipe, idx) => (
                                        <li key={idx}>{recipe.name}{' '}
                                            <button className='bg-button text-background px-4 py-2 rounded-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent hover:bg-button-dark' onClick={async () => {
                                                try {
                                                    await handleDelete(day.key, recipe._id);
                                                } catch (err) {
                                                    console.error(err)
                                                }
                                            }}>Delete</button></li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
        </ul>
    </div>
}

export default Week