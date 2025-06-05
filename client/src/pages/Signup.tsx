import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import veggies from '/veggies.mp4';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      const { data } = await addUser({
        variables: { 
          input: { 
            name: formState.name,
            email: formState.email,
            password: formState.password,
          }, 
        },
      });
      console.log('Signup success:', data);
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <form className="space-y-4">
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/" className="text-blue-600 underline">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-2">
                <h4 className="text-2xl font-bold text-gray-900 mb-5 text-center">Register</h4>
                <input
                  placeholder="Your name"
                  name="name"
                  className="mt-1 flex rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  placeholder="Your email"
                  name="email"
                  className="mt-1 flex rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="******"
                  name="password"
                  className="mt-1 flex border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" 
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
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
        className='absolute w-full h-full object-cover z-[-1]'
      ></video> 
    </main>
  );
};

export default Signup;
