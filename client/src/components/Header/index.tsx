import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  // const path = useLocation().pathname
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="min-w-full bg-header flex border-b-10 border-accent shadow-[2px_5px_4px_0px] shadow-accent relative z-3">
      <div className="min-w-full container flex-column justify-space-between-lg justify-center align-center text-center">
        <span className='flex justify-center'>
          <Link className="" to="/">
          <img className='w-19 h-19' src="/munchies.png" alt="munchies logo" />
          </Link>
            <h1 className="m-0 text-background pl-5" style={{ fontSize: '3rem' }}>
              Munchies
            </h1>
        </span>
        <h2 className="hidden md:block w-full text-background mb-5" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Plan your next meal. One meal at the time!
        </h2>
        <div className='min-w-full flex justify-end md:pr-3'>
          {Auth.loggedIn() ? (
            <>
              <Link className="bg-button text-background px-4 py-2 rounded-t-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark" to="/me">
                View My Recipes
              </Link>
              <button className="bg-button text-background px-4 py-2 rounded-t-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark" onClick={logout}>
                Logout
              </button>
              <Link className="bg-button text-background px-4 py-2 rounded-t-lg border-2 border-accent inset-shadow-sm/80 inset-shadow-accent focus:bg-button-focus hover:bg-button-dark" to="/add">
                Add My Recipe
              </Link>
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