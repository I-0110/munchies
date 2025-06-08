import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { DELETE_USER } from '../utils/mutations'

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
  console.log(user)

  if (!Auth.loggedIn() || Auth.getUser().data._id !== userData.data._id) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="user-ui w-1/2 mx-auto mt-5 bg-background-semi-transparent border border-accent min-w-[300px] "style={{border: '1px solid #ccc',borderRadius: '8px'}} >
        <h1 className='text-font text-background text-center '>Welcome back, {user.name}</h1>
        <section className='button-box w-max mx-auto'>
          <button
            className="bg-button text-background px-4 py-2 rounded-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark"
            onClick={() => {
              Auth.logout()
            }}
          >
            Logout
          </button>

          <button className="bg-button text-background px-4 py-2 rounded-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark"
            onClick={async () => {
              await deleteUser({ variables: { userId: userData.data._id } });
              Auth.logout();
            }}
          >
            Delete Account
          </button>
        </section>
      </section>
      <Week user={user} />
    </div>
  );
}
export default User;
