import { createBrowserRouter } from 'react-router-dom';
import BadRequestPage from './pages/BadRequestPage';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/bad-request',
    element: <BadRequestPage />,
  },
]);

export default router;
