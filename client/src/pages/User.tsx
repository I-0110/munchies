import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import IngredientsList from '../components/IngredientsList';
import IngredientForm from '../components/IngredientForm';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const User = () => {
  // const { userId } = useParams();
  const userData = Auth.getUser();
  console.log(userData);

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userData.data._id ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userData.data._id },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};
  console.log(user);
  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userData.data._id) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation
        links above to register or log in!
      </h4>
    );
  }

  return (
    <div>
      <h1>Welcome back, {user.name}</h1>
      <h2 className="card-header">
        {userData.data._id ? `${user.name}'s` : 'Your'} friends have collect these recipes...
      </h2>

      {user.ingredients?.length > 0 && (
        <IngredientsList
          ingredients={user.ingrdients}
          isLoggedInUser={!userData.data._id && true}
        />
      )}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <IngredientForm userId={user._id} />
      </div>
    </div>
  );
};

export default User;
