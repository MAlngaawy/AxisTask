import { Button, Container } from '@mantine/core';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useUserDataQuery } from '../../services/apiSlice';

const Layout = () => {
  const token = Cookies.get('token');
  //! I think user api has an issue
  // const { data: userData } = useUserDataQuery({});
  const navigate = useNavigate();
  const logOutFun = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    navigate('/login');
  };

  return (
    <Container size={'lg'}>
      <div>
        <header>
          <nav className="bg-blue-600 text-white p-4 my-5 rounded-xl flex justify-between items-center max-w-full">
            {/* <div className="flex gap-2"> */}
            {/* {token && 'user'} */}
            <ul className="flex items-center gap-5">
              <MyNavLink name="Flights" url="/" />
              <MyNavLink name="Add Flight" url="/add-flight" />
            </ul>
            {/* </div> */}
            {token && (
              <Button color="red" onClick={() => logOutFun()}>
                Log Out
              </Button>
            )}
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
