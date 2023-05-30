
import { Outlet, useRoutes } from 'react-router-dom'

import Header from './components/Header';
import Menu from './components/Menu';
import Checklist from './views/Checklist';
import Roster from './views/Roster';

const Layout = () => (
  <>
    <Header />
    <Menu />
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
    ]
  }
];

const App = () => {
  const routeElements = useRoutes(routes)
  return routeElements;
};

export default App
