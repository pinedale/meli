
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Checklist from './views/Checklist';
import Roster from './views/roster';
import Login from './views/unauthenticated/Login';
import Test from './views/Test';
import Mandatories from './views/Mandatories';
import Documents from './views/Documents';
import Bundles from './views/Bundles';
import RequiredAuthRoute from './routes/RequiredRoute';
import { useEffect } from 'react';

const Layout = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");
  console.log("🚀 ~ file: App.tsx:15 ~ Layout ~ tokenssss:", token)

  useEffect(() => {
    if (token) {
      navigate('/roster')
    }
  }, [token]);

  return(
  <>
    <Outlet />
  </>
)};

const App = () => {
  
  return(
    <>
      <Routes>
        <Route  path='/' element={<Layout />}>
          <Route path='/' element={<Login />}/>
        <Route element={<RequiredAuthRoute />}>
          <Route path='/roster' element={<Roster />}/>
          <Route path='/checklist' element={<Checklist />}/>
          <Route path='/test' element={<Test />}/>
          <Route path='/mandatories' element={<Mandatories />}/>
          <Route path='/documents' element={<Documents />}/>
          <Route path='/bundles' element={<Bundles />}/>
        </Route>
        </Route>
      </Routes>
    </>
  )
};

export default App
