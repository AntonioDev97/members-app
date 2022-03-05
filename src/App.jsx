import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import DashboardPage from './pages/Dashboard.page';
import NotfoundPage from './pages/Notfound.page';
import { Loading } from 'carbon-components-react';
import { useMemberContext } from './Member.context';
import ProtectedRoute from './components/ProtectedRoute';
import useSession from './hooks/useSession';
import './App.scss';

const App = () => {
  const { dispatch, state } = useMemberContext();
  const { setSession } = useSession(dispatch);

  return (
    <Router>
      <Loading active={state.loading} />
      <Routes>
        <Route path='/' element={ <Navigate to='/dashboard' /> } />
        <Route path='/login' element={ <LoginPage setSession={setSession} /> } />
        <Route path='/dashboard' element={
          <ProtectedRoute> 
            <DashboardPage />
          </ProtectedRoute> 
        } />
        <Route path='/dashboard/view/:id' element={
          <ProtectedRoute> 
            <DashboardPage />
          </ProtectedRoute> 
        } />
        <Route path='/dashboard/add' element={
          <ProtectedRoute> 
            <DashboardPage />
          </ProtectedRoute> 
        } />
        <Route path='*' element={ <NotfoundPage /> } />
      </Routes>
    </Router>
  );
}

export default App;
