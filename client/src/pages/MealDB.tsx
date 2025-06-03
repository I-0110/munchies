import {useState, useEffect } from 'react';
// import { FormEvent } from 'react';
// import Auth from '../utils/auth';

import { useParams } from "react-router-dom";

type Meal = {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    ingredients?: Ingredient[];
    [key: string]: any;
};

type Ingredient = {
    ingredient: string;
    measurement: string;
};

function extractIngredients(meal: Record<string, any>): Ingredient[] {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measurement: measurement ? measurement.trim() : '',
            });
        }
    }

    return ingredients;
}

function convertToMetric(measurement: string): string {
    const conversions: Record<string, string> = {
        '1 cup': '240 ml',
        '1/2 cup': '120 ml',
        '1/4 cup': '60 ml',
        '1 tbsp': '15 ml',
        '1 tsp': '5 ml',
        '1 lb': '450 g',
        '1 oz': '28 g',
    };

    const lower = measurement.toLowerCase().trim();
    return conversions[lower] || measurement; 
}

function convertToImperial(measurement: string): string { 
    const conversions: Record<string, string> = {
        '240 ml': '1 cup',
        '120 ml': '1/2 cup',
        '60 ml': '1/4 cup',
        '15 ml': '1 tbsp',
        '5 ml': '1 tsp',
        '450 g': '1 lb',
        '28 g': '1 oz',    
    };

    const lower = measurement.toLowerCase().trim();
    return conversions[lower] || measurement;
}

function convertToF(celsius: number): number {
    return (celsius * 9/5) + 32;
}

function convertToC(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperaturesInText(text: string, useCelsius: boolean): string {
    return text.replace(/(\d+)\s*(°[CF])/gi, (_, value, unit) => {
        const number = parseInt(value, 10);
        if (unit.toUpperCase() === ('°C' || 'C') && !useCelsius) {
            return `${Math.round(convertToC(number))}°F`;
        }
        if (unit.toUpperCase() === ('°F' || 'F') && !useCelsius) {
            return `${Math.round(convertToF(number))}°C`;
        }
        return `${number}${unit}`;
    });
}

const RecipePage = () => {
    const { name } = useParams<{ name: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);

    // useState for measurement metric. false = U.S., true = Metric
    const [useMetric, setUseMetric] = useState(false); 
    // useState to convert Celsius to Fahrenheit. false = F, true = C
    const [useTemp, setUseTemp] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name || '')}`);
                const data = await response.json();
                if (data.meals && data.meals.length > 0) {
                    const mealData = data.meals[0];
                    const ingredients = extractIngredients(mealData);

                    setMeal({ ...mealData, ingredients });
                } else {
                    setMeal(null)
                }
            } catch (error) {
                console.error('Error fetching meal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeal();
    }, [name]);

    if (loading) 
        return <div>Loading recipe...</div>;
    if (!meal) 
        return <div>No recipe found for "{name}"</div>;

    return (
       <div style={{ padding: 20 }}>
            <h1>{meal.strMeal}</h1> 
            <h4><strong>Category:</strong> {meal.strCategory}</h4>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: 300, borderRadius: 8 }} /> 
        <button onClick={() => setUseMetric(prev => !prev)}>
            Switch to {useMetric ? 'U.S.' : 'Metric'} units
        </button>
        <h3><strong>Ingredients:</strong></h3>
        <ul>
            {meal.ingredients?.map((item, index) => {
                const converted = useMetric
                    ? convertToMetric(item.measurement) 
                    : convertToImperial(item.measurement)

                return (
                <li key={index}>
                    {converted} {item.ingredient}
                </li>
            );
            })}
        </ul>
        <button onClick={() => setUseTemp(prev => !prev)}>
            Switch to {useTemp ? '°F' : '°C'}
        </button>
        <h3><strong>Instructions:</strong></h3>
        <p>
            {convertTemperaturesInText(meal.strInstructions, useTemp)}
        </p>

        {meal.strYoutube && (
            <div>
                <h3><strong>Video Tutorial for: {meal.strMeal}</strong></h3>
                <iframe
                    width="600"
                    height="400"
                    src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(meal.strYoutube).search).get('v')}`}
                    title={meal.strMeal}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </div>
        )}
        </div>
    );
};

export default RecipePage;

