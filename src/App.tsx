
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
import RosterCourse from './views/RosterCourse';
import RosterTest from './views/RosterTest';
import BundleDetails from './views/BundleDetails';
import Profile from './views/Profile';
import RosterInvite from './views/RosterInvite';
import LayoutWithoutHeader from './routes/LayoutWithoutHeader';
import MandatoryNew from './views/MandatoryNew';
import TestNew from './views/TestNew';
import TestCategoryDetails from './views/TestCategoryDetails';
import TestQuestionNew from './views/TestQuestionNew';
import TestQuestionDetails from './views/TestQuestionDetails';

const Layout = () => {

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
      <Route path='/profile' element={<Profile />} />
      <Route path='/organization/:orgId/roster' element={<Roster />} />
      <Route path="/organization/:orgId/roster/:rosterId/course/:courseId" element={<RosterCourse />} />
      <Route path="/organization/:orgId/roster/:rosterId/test/:testId" element={<RosterTest />} />
      <Route path='/organization/:orgId/checklist' element={<Checklist />} />
      <Route path='/organization/:orgId/checklist/:checklistId' element={<ChecklistDetails />} />
      <Route path='/organization/:orgId/checklist/:checklistId/categories/:categoryId' element={<ChecklistSection />} />
      <Route path='/organization/:orgId/test' element={<Test />} />
      <Route path='/organization/:orgId/test/:testId' element={<TestDetails />} />
      <Route path='/organization/:orgId/mandatories' element={<Mandatories />} />
      <Route path='/organization/:orgId/mandatories/:mandatoryId/chapters/:chapterId' element={<MandatoryChapters />} />
      <Route path='/organization/:orgId/mandatories/:mandatoryId/chapters/:chapterId/question/:questionId' element={<MandatoryQuestion />} />
      <Route path='/organization/:orgId/bundles' element={<Bundles />} />
      <Route path='/organization/:orgId/bundles/new' element={<BundleDetails />} />
      <Route path='/organization/:orgId/bundles/:bundleId' element={<BundleDetails />} />
    </Route>
    <Route element={<LayoutWithoutHeader />}>
      <Route path='/organization/:orgId/mandatories/:mandatoryId' element={<MandatoryDetails />} />
      <Route path='/organization/:orgId/mandatories/new' element={<MandatoryNew />} />
      <Route path="/organization/:orgId/roster/:rosterId" element={<RosterDetails />} />
      <Route path="/organization/:orgId/roster/:rosterId/invite" element={<RosterInvite />} />
      <Route path='/organization/:orgId/test/new' element={<TestNew />} />
      <Route path='/organization/:orgId/test/:testId/category/:categoryId' element={<TestCategoryDetails />} />
      <Route path='/organization/:orgId/test/:testId/category/:categoryId/question/new' element={<TestQuestionNew />} />
      <Route path='/organization/:orgId/test/:testId/category/:categoryId/question/:questionId' element={<TestQuestionDetails />} />
    </Route>
  </Routes>
);

export default App
