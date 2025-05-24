import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_INGREDIENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface IngredientsListProps {
  ingredients?: string[];
  isLoggedInUser: boolean;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients = [], isLoggedInUser }) => {
  const [removeIngredient, { error }] = useMutation
  (REMOVE_INGREDIENT, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemoveIngredient = async (ingredient: any) => {
    try {
      await removeIngredient({
        variables: { ingredient },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!ingredients.length) {
    return <h3>No Ingredients Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {ingredients &&
          ingredients.map((ingredient) => (
            <div key={ingredient} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{ingredient}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveIngredient(ingredient)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default IngredientsList;
