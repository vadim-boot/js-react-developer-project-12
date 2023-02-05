import './App.css';
import {
  BrowserRouter, Route, Routes, useLocation, Navigate, useNavigate,
} from 'react-router-dom';
import { useContext, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Layout from './Layout';
import Login from './Login';
import Error404 from './Error404';
import Chat from './Chat';
import { ApiProvider } from './ChatAPI';
import Signup from './Signup';
import AuthContext from './contexts/AuthContext';
import resources from './locales/index';

const rollbarConfig = {
  accessToken: 'a59dde1a08e641dbbe026fbc0a4f0040',
  environment: 'testenv',
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
  }).catch((e) => {
  console.log(`i18n error = ${e}`);
});

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currUser: { username } } = useContext(AuthContext);

  return (
    username !== null ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState({ username: null, token: '' });
  const logIn = ({ username, token }) => {
    setCurrUser({ username, token });
  }
  const logOut = () => {
    setCurrUser({ username: null, token: '' });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ApiProvider>
            <div>
              <Layout />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/"
                  element={(
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  )}
                />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </ApiProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
