import React from 'react'
import MealCard from '../MealCard'

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

type Recipe = {  
    _id: string
    name: string
    author?: string
    category?: string
    instructions:string
    image_url?: string
    video_url?: string
    ingredients: []
}

type WeekProps = {
    week: { day: Weekday; Recipes: Recipe[] }[]
}

const Week: React.FC<WeekProps> = ({ week }) => {
    return (
        <div className="container">
            <h2 className="text-center my-4">Weekly Meal Plan</h2>
            <div className="row">
                {week.map(({ day, Recipes: recipes }) => (
                    <div key={day} className="col-12 col-md-6 mb-4">
                        <h3 className='weekday-heading'>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </h3>
                        <div className="card p-3">
                            {recipes.length > 0 ? (
                                recipes.map((recipe: Recipe) => (
                                    <MealCard
                                        key={recipe._id}
                                        _id={recipe._id}
                                        image_url={recipe.image_url || ''}
                                        name={recipe.name}
                                        category={recipe.category || ''}
                                        instructions={recipe.instructions}
                                        ingredients={recipe.ingredients}
                                    />
                                ))
                            ) : (
                                <p>No meals planned for this day.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Week