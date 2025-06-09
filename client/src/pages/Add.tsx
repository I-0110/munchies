import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import chopping from '/chopping.mp4';
import { QUERY_ME } from '../utils/queries';

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
    const [click, setClick] = useState<Boolean>(false)

    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        refetchQueries: [QUERY_ME]
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setClick(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [click]);

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

    const onRemoveClick = async (key: number) => {
        const updatedIngredients = ingredients.filter((_, index) => index !== key);
        setIngredients(updatedIngredients);
    }

    const handleRecipeSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setClick(true)
        let alpha = name.slice(0, 3)
        let num = 0
        for (let i = 0; i < name.length; i++) { num += Math.floor(Math.random() * 10000) }
        const id = `${alpha}${num}`
        setMealID(id)
        try {
            console.log(day, mealId, name, category, instructions, image_url, video_url, ingredients)
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
            setIdNum(idNum + 1)
            console.log("Recipe successfully saved!");
        } catch (err) {
            console.error("Recipe failed to save...", err);
        }
    };

    return (
        <main className='flex items-center justify-center h-full w-full my-20'>
            <div className="w-9/10 flex flex-col-reverse items-center justify-center bg-background-semi-transparent shadow-md rounded-[4px] relative z-2 p-5">
                <div className="flex flex-col items-center justify-center text-sm rounded-md">
                    <div className="w-full flex flex-col items-center justify-center flex-wrap rounded-md">
                        <h4 className="text-2xl font-bold text-gray-900 my-5 text-center">Add Your Recipe</h4>
                        <div className="w-full flex flex-col text-sm rounded-md">
                            <label className="flex items-center">
                                <span>Recipe Name</span>
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                placeholder="Recipe Name"
                                name="name"
                                className="w-9/10 mt-3 self-center bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                type="text"
                                value={name}
                                onChange={handleChange}
                                required
                            />
                            <label className="flex items-center">
                                <span>Recipe Category</span>
                            </label>
                            <input
                                placeholder="Recipe Category"
                                name="category"
                                className="w-9/10 mt-3 self-center bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                type="text"
                                value={category}
                                onChange={handleChange}
                            />
                            <label className="flex items-center">
                                <span>Recipe Instructions</span>
                            </label>
                            <textarea
                                placeholder="Recipe Instructions"
                                name="instructions"
                                className="w-9/10 mt-3 self-center bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                value={instructions}
                                onChange={handleChange}
                            />
                            <label className="flex items-center">
                                <span>Image URL</span>
                            </label>
                            <input
                                placeholder="Add an image url here..."
                                name="image_url"
                                className="w-9/10 mt-3 self-center bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                type="text"
                                value={image_url}
                                onChange={handleChange}
                            />
                            <label className="flex items-center">
                                <span>Video URL</span>
                            </label>
                            <input
                                placeholder="Add a video url here..."
                                name="video_url"
                                className="w-9/10 mt-3 self-center bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                type="text"
                                value={video_url}
                                onChange={handleChange}
                            />
                            <label className="flex items-center">
                                <span>Day of the Week</span>
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select name="day" multiple={false}
                                onChange={handleChange} className="w-9/10 self-center mt-2 mb-5 bg-background flex rounded-[4px] p-3 border-2 border-accent shadow-md shadow-accent-dark" required>
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
                        <form onSubmit={handleIngredientSubmit} className="w-full flex items-center justify-start flex-col text-sm rounded-md">
                            <h4 className="text-xl font-bold text-gray-900 my-5 text-center">Add Your Ingredients</h4>
                            <p className="text-center w-[80%]">For each ingredient, enter an ingredient name and measure and click the "Add Ingredient" button until you have added all the ingredients.</p>
                            <div className="w-full flex flex-col items-center justify-start rounded-md">
                                <input
                                    placeholder="Ingredient Name"
                                    name="ingredient"
                                    className="w-full mt-3 bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                    type="text"
                                    value={ingredient}
                                    onChange={handleChange}
                                />
                                <textarea
                                    placeholder="Ingredient Measurement"
                                    name="measure"
                                    className=" w-full bg-background flex rounded-[4px] border-2 border-accent shadow-md shadow-accent-dark p-3"
                                    value={measure}
                                    onChange={handleChange}
                                />
                                <button
                                    className=" w-1/2 my-3 border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                                    style={{ cursor: 'pointer'}}
                                    type="submit"
                                >Add</button>
                            </div>
                        </form>
                    </div>
                    <div className='w-full mt-4'>
                        <h3 className="text-2xl font-bold text-gray-900 my-4 text-center">Preview Your Recipe</h3>
                        <div className="flex items-center justify-start flex-col">
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Name: {<b>{name}</b>}</p>
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Category: {<b>{category}</b>}</p>
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Instructions: {<b>{instructions}</b>}</p>
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Image Link: {<b>{image_url}</b>}</p>
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Video Link: {<b>{video_url}</b>}</p>
                            <p className='mt-1 bg-background w-9/10 pl-2 py-2 border-3 border-accent shadow-md shadow-accent-dark rounded-lg'>Ingredients:</p>
                            <ol>
                                {<b>{ingredients.map((meal: any, index: number) => (
                                    <li className='mt-2' key={index}>
                                        <h6>Ingredient: {meal.ingredient}</h6>
                                        <h6>Measurement: {meal.measure}</h6>
                                        <button onClick={() => onRemoveClick(index)} className='bg-gray-200 text-gray-800 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'>Remove</button>
                                    </li>
                                ))}</b>}
                            </ol>
                            <p className='mt-1'>Day of the Week: {<b>{day.charAt(0).toUpperCase() + day.slice(1)}</b>}</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-start flex-col mb-4">
                        <button
                            className="w-1/2 mt-1 mb-5 border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                            style={{ cursor: 'pointer'}}
                            onClick={handleRecipeSubmit}
                        >Add This Recipe
                        </button>
                        {click ? error ?
                            <div className="mt-1 mb-5 border p-3 bg-red-500 text-white rounded-[4px]">
                                <p>Error Adding Recipe: {error.message}</p>
                            </div>
                            : <p>Recipe Saved!</p>
                            : null}
                    </div>
                </div>
            </div>
            <video src={chopping} autoPlay loop muted playsInline className='object-cover background-video' />
        </main>
    );
};
export default Add;