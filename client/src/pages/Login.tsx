import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import veggies from '/veggies.mp4';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="min-w-fit flex-col-reverse border bg-(color:--color-background) px-6 py-14 shadow-md rounded-[4px]">
        <form onSubmit={handleFormSubmit} className="flex flex-col text-sm rounded-md">
          <h4 className="text-2xl font-bold text-gray-900 my-5 text-center">Login</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <div className="flex flex-col text-sm rounded-md">
                <input
                  className="mt-1 flex rounded-[4px] border p-3"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="mt-1 flex rounded-[4px] border p-3"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="mt-1 w-full border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                <Link className="text-center mt-5 mb-5 w-full border p-3 bg-gradient-to-r from-[#A2A2BE] bg-[#D72638] text-white rounded-[4px]" to="/signup" style={{ cursor: 'pointer' }}>
                Register
              </Link>
              </div>
            )}
            {error && (
              <div className="my-3 p-3 bg-red-600 text-white rounded-md">
                {error.message}
              </div>
            )}
          </div>
        </form>
      </div>
      <video
        src={veggies} autoPlay loop muted playsInline
        className='background-video object-cover'
      ></video>
    </main>
  );
};

export default Login;
