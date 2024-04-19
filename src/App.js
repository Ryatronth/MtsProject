import React from 'react';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import AppRouter from './components/AppRouter';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        if (localStorage.getItem('token')) {
          user.setUser(true);
          user.setIsAuth(true);
          user.setTimer(data.exp - Math.floor(Date.now() / 1000));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  console.log(user.isAuth);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
