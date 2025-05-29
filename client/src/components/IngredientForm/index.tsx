import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_INGREDIENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

interface IngredientFormProps {
  userId: string;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ userId }) => {
  const [ingredient, setIngredient] = useState('');

  const [addIngredient, { error }] = useMutation(ADD_INGREDIENT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addIngredient({
        variables: { userId, ingredient },
      });

      setIngredient('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Endorse some more ingredients below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Add some ingredients..."
              value={ingredient}
              className="form-input w-100"
              onChange={(event) => setIngredient(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Ingredient!
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse ingredients. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default IngredientForm;
