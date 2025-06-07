import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import chopping from '/chopping.mp4'; 

interface IIngredient {
    ingredient: string,
    measure: string
}

const Add = () => {
    const [idNum, setIdNum] = useState<number>(1)
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [image_url, setImageURL] = useState<string>('');
    const [video_url, setVideoURL] = useState<string>('');
    const [ingredient, setIngredient] = useState<string>('');
    const [measure, setMeasure] = useState<string>('');
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [day, setDay] = useState<string>('');
    const [mealId, setMealID] = useState<string>('')

    const [addRecipe, {error}] = useMutation(ADD_RECIPE);


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { target } = event
        const input = target.name
        const value = target.value
        
        if (input === "name") {
            setName(value)
        } else if (input === "category") {
            setCategory(value)
        } else if (input === "instructions") {
            setInstructions(value)
        } else if (input === "image_url") {
            setImageURL(value)
        } else if (input === "video_url") {
            setVideoURL(value)
        } else if (input === "ingredient") {
            setIngredient(value)
        } else if (input === "measure") {
            setMeasure(value)
        } else {
            setDay(value)
        }
    };

    const handleIngredientSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIngredients([...ingredients, { ingredient, measure }])
        setIngredient('')
        setMeasure('')
        console.log(ingredients)
    };

    const handleRecipeSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const id = `a${idNum}`
        setMealID(id)
        try {
            console.log(day, mealId,name,category,instructions,image_url,video_url,ingredients)
            const response = await addRecipe({
                variables: {
                    input: {
                        day,
                        mealId: id,
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
            setIdNum(idNum +1)
            console.log("Recipe successfully saved!");
        } catch (err) {
            console.error("Recipe failed to save...", err);
        }
    };

    return (
        <main className='flex items-center justify-center h-full w-full mt-20'>
            <div className="w-[80%] max-w-[500px] flex flex-col-reverse items-center justify-center bg-background shadow-md rounded-[4px]">
            <div className="flex flex-col items-center justify-center text-sm rounded-md">
            <div className="flex flex-col items-center justify-center flex-wrap rounded-md">
            <h4 className="text-2xl font-bold text-gray-900 my-5 text-center">Add Your Recipe</h4>
            <div className="flex flex-col text-sm rounded-md">
                <input
                placeholder="Recipe Name"
                name="name"
                className="mt-3 flex rounded-[4px] border p-3"
                type="text"
                value={name}
                onChange={handleChange}
                />
                <input
                placeholder="Recipe Category"
                name="category"
                className="mt-3 flex rounded-[4px] border p-3"
                type="text"
                value={category}
                onChange={handleChange}
                />
                <textarea
                placeholder="Recipe Instructions"
                name="instructions"
                className="mt-3 flex rounded-[4px] border p-3"
                value={instructions}
                onChange={handleChange}
                />
                <input
                placeholder="Add an image url here..."
                name="image_url"
                className="mt-3 flex rounded-[4px] border p-3"
                type="text"
                value={image_url}
                onChange={handleChange}
                />
                <input
                placeholder="Add a video url here..."
                name="video_url"
                className="mt-3 flex rounded-[4px] border p-3"
                type="text"
                value={video_url}
                onChange={handleChange}
                />
                <select name="day" multiple={false} 
                onChange={handleChange} className="m-2 flex rounded-[4px] p-3">
                <option value="" >Choose a Day of the Week</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                </select>
            </div>
            </div>
            <div>
            <form onSubmit={handleIngredientSubmit} className="flex items-center justify-start flex-col text-sm rounded-md">
                <h4 className="text-xl font-bold text-gray-900 my-5 text-center">Add Your Ingredients</h4>
                <p className="text-center w-[80%]">For each ingredient, enter an ingredient name and measure and click the "Add Ingredient" button until you have added all the ingredients.</p>
                <div className="flex flex-col items-center justify-start rounded-md">
                <input
                placeholder="Ingredient Name"
                name="ingredient"
                className="m-2 flex rounded-[4px] border p-3 "
                type="text"
                style={{ width: '250px'}}
                value={ingredient}
                onChange={handleChange}
                />
                <textarea
                placeholder="Ingredient Measure"
                name="measure"
                className="m-2 flex rounded-[4px] border p-3"
                style={{ width: '250px'}}
                value={measure}
                onChange={handleChange}
                />
                <button
                className="mt-1 mb-5 w-full border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                style={{ cursor: 'pointer', width: '90px'}}
                type="submit"
                >Add</button>
                </div>
            </form>
            </div>
            <div>
            <h3 className="text-2xl font-bold text-gray-900 my-5 text-center">Preview Your Recipe</h3>
            <div className="flex items-start justify-start flex-col m-10">
                <p className='mt-1'>Name: {<b>{name}</b>}</p>
                <p className='mt-1'>Category: {<b>{category}</b>}</p>
                <p className='mt-1'>Instructions: {<b>{instructions}</b>}</p>
                <p className='mt-1'>Image Link: {<b>{image_url}</b>}</p>
                <p className='mt-1'>Video Link: {<b>{video_url}</b>}</p>
                <p className='mt-1'>Ingredients:</p>
                <ol>
                {<b>{ingredients.map((meal: any, index: number) => (
                <li className='mt-1' key={index}>
                <p>Ingredient: {meal.ingredient}</p>
                <p>Measure: {meal.measure}</p>
                </li>
                ))}</b>}
                </ol>
                <p className='mt-1'>Day of the Week: {<b>{ day.charAt(0).toUpperCase() + day.slice(1)}</b>}</p>
            </div>
            </div>
            <div className="flex items-center justify-start flex-col m-10">
            <button
            className="mt-1 mb-5 border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
            style={{ cursor: 'pointer', width: '150px'}}
            onClick={handleRecipeSubmit}
            >Add This Recipe
            </button>
            {error ? 
                <div className="mt-1 mb-5 border p-3 bg-red-500 text-white rounded-[4px]">
                <p>Error Adding Recipe: {error.message}</p>
                </div> 
                : <p></p>}
            </div>
            </div>
            </div>
            <video src={chopping} autoPlay loop muted playsInline className='object-cover background-video'/>
        </main>
    );
};
export default Add;