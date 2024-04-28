import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check, mainInfo } from './http/userAPI';
import AppRouter from './components/AppRouter';
import { jwtDecode } from 'jwt-decode';
import SpinnerMain from './components/loaders/SpinnerMain';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          user.setToken(data);
          user.setIsAuth(true);
          user.setTimer(jwtDecode(data).exp - Math.floor(Date.now() / 1000));
          return mainInfo();
        }
      })
      .then((data) => {
        if (data) {
          user.setUser(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SpinnerMain />;
  }

  console.log(user.isAuth);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
