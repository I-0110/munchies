export interface Ingredient {
    ingredient: string;
    measure: string;
}

export interface Recipe {
    idMeal: number,
    strMeal: string,
    strMealAlternate?: string | null,
    strCategory: string,
    strArea: string,
    strInstructions: string
    strMealThumb: string,
    strTags: string,
    strYoutube: string,
    strSource?: string | null,
    strImageSource?: string | null,
    strCreativeCommonsConfirmed?: string | null,
    dateModified?: number | null
    ingredients: Ingredient[]
}

export interface RawRecipe extends Omit<Recipe, 'ingredients'> {
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

export const convertToRecipe = (raw: RawRecipe): Recipe => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

//   remove unused fields
  const {
    [`strIngredient1`]: _, [`strIngredient2`]: __, [`strIngredient3`]: ___,
    [`strIngredient4`]: __4, [`strIngredient5`]: __5, [`strIngredient6`]: __6,
    [`strIngredient7`]: __7, [`strIngredient8`]: __8, [`strIngredient9`]: __9,
    [`strIngredient10`]: __10, [`strIngredient11`]: __11, [`strIngredient12`]: __12,
    [`strIngredient13`]: __13, [`strIngredient14`]: __14, [`strIngredient15`]: __15,
    [`strIngredient16`]: __16, [`strIngredient17`]: __17, [`strIngredient18`]: __18,
    [`strIngredient19`]: __19, [`strIngredient20`]: __20,

    [`strMeasure1`]: m1, [`strMeasure2`]: m2, [`strMeasure3`]: m3,
    [`strMeasure4`]: m4, [`strMeasure5`]: m5, [`strMeasure6`]: m6,
    [`strMeasure7`]: m7, [`strMeasure8`]: m8, [`strMeasure9`]: m9,
    [`strMeasure10`]: m10, [`strMeasure11`]: m11, [`strMeasure12`]: m12,
    [`strMeasure13`]: m13, [`strMeasure14`]: m14, [`strMeasure15`]: m15,
    [`strMeasure16`]: m16, [`strMeasure17`]: m17, [`strMeasure18`]: m18,
    [`strMeasure19`]: m19, [`strMeasure20`]: m20,

    ...cleanRecipeData
  } = raw;

  return {
    ...cleanRecipeData,
    ingredients
  };
};


// const collapseIngredients(recipe: Recipe): Ingredient[] => {

//     for (let i = 1; i <= 20; i++) {
//         const name = (recipe as any)[`strIngredient${i}`];
//         const measure = (recipe as any)[`strMeasure${i}`];


//         while (meal[`strMeasure${i}`]) {
//             const ingredient: Ingredient = {};
//             ingredient.name = recipe[`strIngredient${i}`] || ""
//             ingredient.measure = recipe[`strMeasure${i}`] || ""

//             ingredients.push(ingredient)
//             pos++
//         }

//         meal.ingredients = (ingredients)
//     }

//     return exampleResponse
// }

export interface TmdbReturn {
    results: RawRecipe[]
}