import { createBrowserRouter } from 'react-router-dom';
import BadRequestPage from './pages/BadRequestPage';
import Home from './pages/Home';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap all routes with Layout
    children: [
      { path: '', element: <Home /> },
      { path: '/bad-request', element: <BadRequestPage /> },
      { path: '/add-flight', element: <div>ascasc</div> },
    ],
  },
]);

export default router;
