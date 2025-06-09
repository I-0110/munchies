import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

function parseMeasure(measure: string) {
    const match = measure.match(/^([\d.\/]+)\s*(.*)$/);
    if (!match) return { amount: 0, unit: measure };
    let amountStr = match[1];
    let amount: number;
    if (amountStr.includes('/')) {
        const [num, denom] = amountStr.split('/');
        amount = parseFloat(num) / parseFloat(denom);
    } else {
        amount = parseFloat(amountStr);
    }
    return { amount: isNaN(amount) ? 0 : amount, unit: match[2].trim() };
}

const GroceryList = () => {
    const userData = Auth.getUser();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { userId: userData.data._id },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    const user = data?.me || {};

    // Map: ingredient name -> unit -> total amount
    const ingredientMap: Record<string, Record<string, number>> = {};

    user.recipes?.forEach((recipe: any) => {
        recipe.ingredients?.forEach((ingredient: any) => {
            const name = ingredient.ingredient;
            const { amount, unit } = parseMeasure(ingredient.measure);

            if (!ingredientMap[name]) ingredientMap[name] = {};
            if (ingredientMap[name][unit]) {
                ingredientMap[name][unit] += amount;
            } else {
                ingredientMap[name][unit] = amount;
            }
        });
    });

    const combinedList = Object.entries(ingredientMap);

    return (
        <section className="grocery-list h-full flex justify-center items-center my-10">
            <div className="bg-background-semi-transparent w-9/10 md:w-2/3 lg:w-1/2 p-6 flex-colum justify-center content-center">
                <h2 className="text-center">Grocery List:</h2>
                <ul>
                    {combinedList.length > 0 ? (
                        combinedList.map(([name, units]) => (
                            <li className="my-2 p-2 py-3 px-1 sm:py-2 sm:px-3 bg-background border-3 border-accent-dark rounded-sm shadow-accent shadow-md"
                                key={name}>
                                {name}:{" "}
                                {Object.entries(units)
                                    .map(
                                        ([unit, amount]) =>
                                            `${amount % 1 === 0 ? amount : amount.toFixed(2)}${unit ? " " + unit : ""}`
                                    )
                                    .join(" + ")}
                            </li>
                        ))
                    ) : (
                        <li>No ingredients/recipes found.</li>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default GroceryList;