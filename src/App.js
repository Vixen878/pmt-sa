import './App.css';
import LoginPage from './pages/login';
import NavBar from './components/NavBar';
import Dashboard from './pages/dashboards/Dashboard';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UseAuthContext } from './hooks/useAuthContext';
import ManageAccountManagers from './pages/manageAccountManagers';
import ManageProjects from './pages/ManageProjects';
import PendingProject from './pages/Request';
import { GetUserAccessLevel, Users } from './hooks/useUserAccessLevel';
import Clients from './pages/Clients';
import Project from './pages/Project';
import Settings from './pages/Settings';
import ManageCategories from './components/ManageCategories';
import Notifications from './components/Notifications';

function App() {

  const { authIsReady, user } = UseAuthContext()

  const { accessLevel } = GetUserAccessLevel();

  return (
    <div className='flex'>
      {authIsReady && (
        <BrowserRouter>
          {user && <div className='flex w-[20%]'>
            <NavBar />
          </div>}
          <div className={user ? 'w-[80%]' : 'w-full'}>
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>

              <Route path="/notifications">
                {user && <Notifications />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/requests/:id">
                {user && <PendingProject />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/project/:id">
                {user && <Project />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/accountmanagers/:id">
                {user && <Dashboard />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/clients">
                {user && <Clients />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/accountmanagers">
                {user && accessLevel === Users.AccountManager && <Redirect to="/" />}
                {user && <ManageAccountManagers />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/manageprojects">
                {user && <ManageProjects />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/categories">
                {user && <ManageCategories />}
                {!user && <LoginPage />}
              </Route>

              <Route path="/settings">
                {!user && <Redirect to="/login" />}
                {user && <Settings />}
              </Route>

              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <LoginPage />}
              </Route>

              <Route path="*">
                Error
                {/* <ErrorPage /> */}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
