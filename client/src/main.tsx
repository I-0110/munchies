import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import User from './pages/User';
import RecipePage from './pages/MealDB';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import Add from './pages/Add';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/users/:userId',
        element: <User />
      }, {
        path: '/recipe/:name',
        element: <RecipePage />
      }, {
        path: '/me',
        element: <User />
      }, {
        path: '/add',
        element: <Add />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
