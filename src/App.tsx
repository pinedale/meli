
import { Outlet, Route, Routes } from 'react-router-dom'
import Checklist from './views/Checklist';
import Roster from './views/Roster';
import Login from './views/unauthenticated/Login';
import Test from './views/Test';
import Mandatories from './views/Mandatories';
import Bundles from './views/Bundles';
import RequiredAuthRoute from './routes/RequiredRoute';
import ChecklistSection from './views/ChecklistSection';
import ChecklistDetails from './views/ChecklistDetails';
import MandatoryDetails from './views/MandatoryDetails';
import RosterDetails from './views/RosterDetails';
import TestDetails from './views/TestDetails';
import MandatoryChapters from './views/MandatoryChapters';
import MandatoryQuestion from './views/MandatoryQuestion';

const Layout = () => {

  // useEffect(() => {
  //   if (token) {
  //     navigate(`/organization/${organization}/roster`);
  //     debugger;
  //   }
  // }, [token, navigate, organization]);

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
      <Route path="/organization/:orgId/roster/:rosterId" element={<RosterDetails />} />
      <Route path='/organization/:orgId/checklist' element={<Checklist />} />
      <Route path='/organization/:orgId/checklist/:checklistId' element={<ChecklistDetails />} />
      <Route path='/organization/:orgId/checklist/:checklistId/categories/:categoryId' element={<ChecklistSection />} />
      <Route path='/organization/:orgId/test' element={<Test />} />
      <Route path='/organization/:orgId/test/:testId' element={<TestDetails />} />
      <Route path='/organization/:orgId/mandatories' element={<Mandatories />} />
      <Route path='/organization/:orgId/mandatories/:mandatoryId' element={<MandatoryDetails />} />
      <Route path='/organization/:orgId/mandatories/:mandatoryId/chapters/:chapterId' element={<MandatoryChapters />} />
      <Route path='/organization/:orgId/mandatories/:mandatoryId/chapters/:chapterId/question/:questionId' element={<MandatoryQuestion />} />
      <Route path='/organization/:orgId/bundles' element={<Bundles />} />
    </Route>
  </Routes>
);

export default App
