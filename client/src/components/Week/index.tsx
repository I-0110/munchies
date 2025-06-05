import React from 'react'

type WeekProps = {
    user: {
        name: string
        recipes: any[]
    }
}

const Week: React.FC<WeekProps> = (props) => {
    return <div>
        <h1>{props.user.name}'s Plan</h1>
        <ul>
            <div className="day-card">
                <h2>Sunday</h2>
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
                            className="day-card"
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
                                {props.user.recipes
                                    .filter(recipe => recipe.day === day.key)
                                    .map((recipe, idx) => (
                                        <li key={idx}>{recipe.name}</li>
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