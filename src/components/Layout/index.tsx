import { Container } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  // const navigate = useNavigate();
  // const token = Cookies.get('token');

  // useEffect(() => {
  //   if (!token) {
  //     console.log('first');
  //     navigate('/register');
  //   }
  // }, [token]);

  return (
    <Container size={'lg'}>
      <div>
        <header>
          <nav className="bg-blue-600 text-white p-4 my-5 rounded-xl">
            <ul className="flex items-center gap-5">
              <MyNavLink name="Flights" url="/" />
              <MyNavLink name="Add Flight" url="/add-flight" />
            </ul>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default Layout;

const MyNavLink = ({ url, name }: { url: string; name: string }) => {
  return (
    <li>
      <NavLink
        to={url}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'font-bold' : ''
        }
      >
        {name}
      </NavLink>
    </li>
  );
};
