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
            {props.user.recipes.map((recipe, index) => (
                <li key={index}>{recipe.name}</li>
            ))}
        </ul>
    </div>
}

export default Week