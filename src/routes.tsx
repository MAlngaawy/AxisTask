import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import BadRequestPage from './pages/BadRequestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/bad-request',
    element: <BadRequestPage />,
  },
]);

export default router;
