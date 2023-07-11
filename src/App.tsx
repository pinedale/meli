
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Checklist from './views/Checklist';
import Roster from './views/Roster';
import Login from './views/unauthenticated/Login';
import Test from './views/Test';
import Mandatories from './views/Mandatories';
import Documents from './views/Documents';
import Bundles from './views/Bundles';
import RequiredAuthRoute from './routes/RequiredRoute';
import { useEffect } from 'react';
import ChecklistSection from './views/ChecklistSection';
import ChecklistDetails from './views/ChecklistDetails';
import { useFetch } from './contexts/fetchProvider';

const Layout = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");
  const {organization} = useFetch();

  useEffect(() => {
    if (token) {
      navigate(`/organization/${organization}/roster`)
    }
  }, [token, navigate]);

  return (
    <>
      <Outlet />
    </>
  )
};

const App = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Login />} />
    </Route>
    <Route element={<RequiredAuthRoute />}>
      <Route path='/organization/:orgId/roster' element={<Roster />} />
      <Route path="/organization/:orgId/roster/:id" element={<Roster />} />
      <Route path='/organization/:orgId/checklist' element={<Checklist />} />
      <Route path='/organization/:orgId/checklist/:checklistId' element={<ChecklistDetails />} />
      <Route path='/organization/:orgId/checklist/:checklistId/categories/:categoryId' element={<ChecklistSection />} />
      <Route path='/organization/:orgId/test' element={<Test />} />
      <Route path='/organization/:orgId/mandatories' element={<Mandatories />} />
      <Route path='/organization/:orgId/documents' element={<Documents />} />
      <Route path='/organization/:orgId/bundles' element={<Bundles />} />
    </Route>
  </Routes>
);

export default App
