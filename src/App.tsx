
import { Outlet, useRoutes } from 'react-router-dom'

import Header from './components/Header'
import Results from './components/Results';
import Product from './components/Product';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/items",
        element: <Results />
      },
      {
        path: "/items/:id",
        element: <Product />
      },
    ]
  }
];

const App = () => {
  const routeElements = useRoutes(routes)
  return routeElements;
};

export default App
