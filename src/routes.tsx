import { createBrowserRouter } from 'react-router-dom';
import BadRequestPage from './pages/BadRequestPage';
import Home from './pages/Home';
import Layout from './components/Layout';
import AddFlightForm from './components/AddFlightForm';
import Register from './pages/Register';
import PrivateRoute from './auth/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap all routes with Layout
    children: [
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          { path: '', element: <Home /> },
          { path: '/bad-request', element: <BadRequestPage /> },
          { path: '/add-flight', element: <AddFlightForm /> },
        ],
      },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
