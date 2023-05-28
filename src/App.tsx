
import { Outlet, useRoutes } from 'react-router-dom'

import Header from './components/Header'
import Results from './components/Results';
import Product from './components/Product';
import Menu from './components/Menu';
import Summary from './components/Summary';
import Table from './components/Table';

const Layout = () => (
  <>
    <Header />
    <Menu />
    <Summary />
    <div className="max-w-6xl mx-auto">
      <Table />
    </div>
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
