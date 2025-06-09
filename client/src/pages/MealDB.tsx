import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import { FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

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

// Unit conversion functions (commented out)
/*
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
    return text.replace(/(\d{2,3})\s?(°?[CFcf])\b/g, (_, value, unit) => {
        const temp = parseInt(value, 10);
        const normalUnit = unit.toUpperCase().replace('°', '');

        if (normalUnit === 'C' && !useCelsius) {
            return `${Math.round(convertToF(temp))}°F`;
        } else if (normalUnit === 'F' && !useCelsius) {
            return `${Math.round(convertToC(temp))}°C`;
        }
        return `${temp}°${normalUnit}`;
    });
}
*/

const RecipePage = () => {
    const { name } = useParams<{ name: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);

    // useState for measurement metric. false = U.S., true = Metric
    // const [useMetric, setUseMetric] = useState(false); 
    // useState to convert Celsius to Fahrenheit. false = F, true = C
    // const [useTemp, setUseTemp] = useState(false);

    const [loading, setLoading] = useState(true);
    const [toPrint, setToPrint] = useState(false);

    const [addRecipe] = useMutation(ADD_RECIPE, {
        refetchQueries: [{ query: QUERY_ME }],
    });

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
                    setMeal(null);
                }
            } catch (error) {
                console.error('Error fetching meal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeal();
    }, [name]);

    // Triger to save recipe per day
    const handleSave = async (day: string) => {
    if (!meal) return;

    try {
        const response = await addRecipe({
            variables: {
                input: {
                day,
                mealId: meal.idMeal,
                name: meal.strMeal,
                category: meal.strCategory,
                instructions: meal.strInstructions,
                image_url: meal.strMealThumb,
                video_url: meal.strYoutube,
                ingredients: meal.ingredients || [],
                },
            },
        });

        if (!response) throw new Error("Recipe did not save!");
        alert(`Saved recipe for ${day.charAt(0).toUpperCase() + day.slice(1)}!`);
        } catch (err) {
            console.error("Recipe failed to save...", err);
            alert("Error saving recipe. Check console.");
        }
    };

    // Trigger print mode
    const handlePrint = () => {
        setToPrint(true);
    };

    // Trigger browser print and reset state
    useEffect(() => {
        if (toPrint) {
            setTimeout(() => {
                window.print();
                setToPrint(false);
            }, 0);
        }
    }, [toPrint]);

    if (loading) return <div>Loading recipe...</div>;
    if (!meal) return <div>No recipe found for "{name}"</div>;

    // filters what we want to print
    if (toPrint) {
        return (
            <div className='bg-background' style={{ padding: 20 }}>
                <h1>{meal.strMeal}</h1>
                <h4><strong>Category:</strong> {meal.strCategory}</h4>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: 300, borderRadius: 8 }}
                />
                <h3><strong>Ingredients:</strong></h3>
                <ul>
                    {meal.ingredients?.map((item, index) => (
                        <li key={index}>
                            {item.measurement} {item.ingredient}
                        </li>
                    ))}
                </ul>
                <h3><strong>Instructions:</strong></h3>
                <p>{meal.strInstructions}</p>
            </div>
        );
    } else { 
        // Regular UI with buttons and videos
    return (
        <div className='bg-background-semi-transparent' style={{ padding: 20 }}>
            <h1 className=''>{meal.strMeal}</h1> 
            <h4><strong>Category:</strong> {meal.strCategory}</h4>
            <button onClick={handlePrint} style={{ margin: '10px 0' }}>
            🖨️ Print Recipe
            </button>
            {Auth.loggedIn() ? (
                <select
                className='bg-background-semi-transparent'
                name="choice"
                onChange={(e) => handleSave(e.target.value)}
                >
                    <option value="">Choose a Day to Save</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                </select>
            ) : (
                <p>
                <a href="/login" className="underline text-blue-500">Log in to save this recipe.</a>
                </p>
            )}
            
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: 300, borderRadius: 8 }}
            />

            {/* <button onClick={() => setUseMetric(prev => !prev)}>
                Switch to {useMetric ? 'U.S.' : 'Metric'} units
            </button> */}

            <h3><strong>Ingredients:</strong></h3>
            <ul>
                {meal.ingredients?.map((item, index) =>
                    // Uncomment if you want to use unit conversions:
                    // {
                    //     const converted = useMetric
                    //         ? convertToMetric(item.measurement) 
                    //         : convertToImperial(item.measurement);
                    //     return (
                    //         <li key={index}>{converted} {item.ingredient}</li>
                    //     );
                    // }

                    // Basic version (no conversion)
                    <li key={index}>
                        {item.measurement} {item.ingredient}
                    </li>
                )}
            </ul>

            <h3><strong>Instructions:</strong></h3>
            <p>{meal.strInstructions}</p>

            {/* <button onClick={() => setUseTemp(prev => !prev)}>
                Switch to {useTemp ? '°F' : '°C'}
            </button>
            <p>
                {convertTemperaturesInText(meal.strInstructions, useTemp)}
            </p> */}

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
    )};
};

export default RecipePage;


