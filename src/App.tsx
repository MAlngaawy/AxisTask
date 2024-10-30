import { RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import router from './routes';

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
