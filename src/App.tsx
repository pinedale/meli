
import { Outlet, Route, Routes } from 'react-router-dom'
import Checklist from './views/Checklist';
import Roster from './views/roster';
import Login from './views/unauthenticated/Login';
import Test from './views/Test';
import Mandatories from './views/Mandatories';
import Documents from './views/Documents';
import Bundles from './views/Bundles';
import RequiredAuthRoute from './routes/RequiredRoute';

const Layout = () => {
  return(
  <>
    <Outlet />
  </>
)};

const PublicLayout = () => (
  <>
    <Outlet />
  </>
);

const UnAuthenticatedViews = () => {
  return(
    <Routes>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

const AuthenticatedViews = () => {
  return(
    <Routes>
      <Route path='/roster' element={<Roster />}/>
    </Routes>
  )
}

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
