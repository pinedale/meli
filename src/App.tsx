
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
import ChecklistSection from './views/checklist-section';

const Layout = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate('/roster')
    }
  }, [token]);

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
      <Route element={<RequiredAuthRoute />}>
        <Route path='/roster' element={<Roster />} />
        <Route path="/roster/:id" element={<Roster />} />
        <Route path='/checklist' element={<Checklist />} />
        <Route path='/checklist/:id' element={<Checklist />} />
        <Route path='/checklist/:id/:id' element={<ChecklistSection />} />
        <Route path='/test' element={<Test />} />
        <Route path='/mandatories' element={<Mandatories />} />
        <Route path='/documents' element={<Documents />} />
        <Route path='/bundles' element={<Bundles />} />
      </Route>
    </Route>
  </Routes>
);

export default App
