import { Recipe, TmdbReturn, convertToRecipe } from "../models/Recipe";


const retreiveTMDBRecipies = async (meal: string): Promise<Recipe[]> => {
    try {
        const response = await fetch(`/api/tmdb/meals/${meal}`,
        {
            headers: {
                'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
            throw new Error('Invalid API response');
        };

        const returnedList: TmdbReturn = await response.json();
        const recipeList: Recipe[] = returnedList.meals.map(convertToRecipe)
        return recipeList;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

// const exampleResponse = {
//     "meals": [
//         {
//             "idMeal": "52771",
//             "strMeal": "Spicy Arrabiata Penne",
//             "strMealAlternate": null,
//             "strCategory": "Vegetarian",
//             "strArea": "Italian",
//             "strInstructions": "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
//             "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
//             "strTags": "Pasta,Curry",
//             "strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08",
//             "strIngredient1": "penne rigate",
//             "strIngredient2": "olive oil",
//             "strIngredient3": "garlic",
//             "strIngredient4": "chopped tomatoes",
//             "strIngredient5": "red chilli flakes",
//             "strIngredient6": "italian seasoning",
//             "strIngredient7": "basil",
//             "strIngredient8": "Parmigiano-Reggiano",
//             "strIngredient9": "",
//             "strIngredient10": "",
//             "strIngredient11": "",
//             "strIngredient12": "",
//             "strIngredient13": "",
//             "strIngredient14": "",
//             "strIngredient15": "",
//             "strIngredient16": null,
//             "strIngredient17": null,
//             "strIngredient18": null,
//             "strIngredient19": null,
//             "strIngredient20": null,
//             "strMeasure1": "1 pound",
//             "strMeasure2": "1/4 cup",
//             "strMeasure3": "3 cloves",
//             "strMeasure4": "1 tin ",
//             "strMeasure5": "1/2 teaspoon",
//             "strMeasure6": "1/2 teaspoon",
//             "strMeasure7": "6 leaves",
//             "strMeasure8": "sprinkling",
//             "strMeasure9": "",
//             "strMeasure10": "",
//             "strMeasure11": "",
//             "strMeasure12": "",
//             "strMeasure13": "",
//             "strMeasure14": "",
//             "strMeasure15": "",
//             "strMeasure16": null,
//             "strMeasure17": null,
//             "strMeasure18": null,
//             "strMeasure19": null,
//             "strMeasure20": null,
//             "strSource": null,
//             "strImageSource": null,
//             "strCreativeCommonsConfirmed": null,
//             "dateModified": null
//         }
//     ]
// }

// should become something like 
// {
// idMeal": "52771",
// "strMeal": "Spicy Arrabiata Penne",
// "strMealAlternate": null,
// "strCategory": "Vegetarian",
// "strArea": "Italian",
// "strInstructions": "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
// "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
// "strTags": "Pasta,Curry",
// "strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08",
// "strSource": null,
// "strImageSource": null,
// "strCreativeCommonsConfirmed": null,
// "dateModified": null
//   ingredients: [
//     { ingredient: "penne rigate", measure: "1 pound" },
//     { ingredient: "olive oil", measure: "1/4 cup" },
//     { ingredient: "garlic", measure: "3 cloves" },
//     { ingredient: "chopped tomatoes", measure: "1 tin" },
//     { ingredient: "red chilli flakes", measure: "1/2 teaspoon" },
//     { ingredient: "italian seasoning", measure: "1/2 teaspoon" },
//     { ingredient: "basil", measure: "6 leaves" },
//     { ingredient: "Parmigiano-Reggiano" measure: "sprinkling" },
//   ]
// };

export { retreiveTMDBRecipies }