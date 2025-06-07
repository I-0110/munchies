import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="w-screen bg-header flex border-b-10 border-accent shadow-xl shadow-accent">
      <div className="w-screen container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-sky-200 text-light" to="/">
          <h1 className="m-0 text-background" style={{ fontSize: '3rem' }}>
            Munchies
          </h1>
        </Link>
        <h2 className="hidden md:block text-background mb-5" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Plan your next meal. One meal at the time!
        </h2>
        <div className='w-full flex justify-end pr-3'>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Recipes
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="bg-button text-background px-4 py-2 rounded-t-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark" to="/login">
                Login
              </Link>
              <Link className="bg-button text-background px-4 py-2 rounded-t-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark" to="/signup">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;