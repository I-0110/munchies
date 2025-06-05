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
    <main className="flex items-center justify-center h-screen">
      <div className="min-w-fit flex-col-reverse border bg-(color:--color-backrgound) px-6 py-14 shadow-md rounded-[4px]">
        <form className="flex flex-col text-sm rounded-md">
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/" className="text-blue-600 underline">back to the homepage.</Link>
              </p>
            ) : (
              <div onSubmit={handleFormSubmit} className="flex flex-col text-sm rounded-md">
                <h4 className="text-2xl font-bold text-gray-900 my-5 text-center">Register</h4>
                <input
                  placeholder="Your name"
                  name="name"
                  className="mt-1 flex rounded-[4px] border p-3"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  placeholder="Your email"
                  name="email"
                  className="mt-1 flex rounded-[4px] border p-3"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="******"
                  name="password"
                  className="mt-1 flex border rounded-[4px] p-3"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="mt-1 mb-5 w-full border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]" 
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
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
        className='absolute w-full h-full object-cover z-[-1]'
      ></video> 
    </main>
  );
};

export default Signup;
