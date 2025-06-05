import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { DELETE_USER } from '../utils/mutations';

import Week from '../components/Week';

const User = () => {
  const userData = Auth.getUser();

  const [deleteUser] = useMutation(DELETE_USER);

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_ME,
    {
      variables: { userId: userData.data._id },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  if (!Auth.loggedIn() || Auth.getUser().data._id !== userData.data._id) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="flex-row justify-center mb-4">
        <h1>Welcome back, {user.name}</h1>
        <button
          className="btn btn-lg btn-danger m-2"
          onClick={() => {
            Auth.logout()
          }}
        >
          Logout
        </button>

        <button className="btn btn-lg btn-danger m-2"
          onClick={async () => {
            await deleteUser({ variables: { userId: userData.data._id } });
            Auth.logout();
          }}
        >
          Delete Account
        </button>
      </section>
        <Week user={user} />
    </div>
  );
}
export default User;
