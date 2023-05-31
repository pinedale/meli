
import { Outlet, useRoutes } from 'react-router-dom'

import Header from './components/Header';
import Menu from './components/Menu';
import Checklist from './views/Checklist';
import Roster from './views/Roster';
import Login from './views/authenticated/Login';
import Test from './views/Test';
import Mandatories from './views/Mandatories';

const Layout = () => (
  <>
    <Header />
    <Menu />
    <Outlet />
  </>
);

const PublicLayout = () => (
  <>
    <Outlet />
  </>
);

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/checklist",
        element: <Checklist />
      },
      {
        path: "/roster",
        element: <Roster />
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/mandatories",
        element: <Mandatories />
      },
    ]
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
    ]
  }
];

const App = () => {
  const routeElements = useRoutes(routes)
  return routeElements;
};

export default App
