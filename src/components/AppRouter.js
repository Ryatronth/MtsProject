import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routers';
import { Context } from '../index';

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route
        path="*"
        element={<Navigate to={user.isAuth ? '/profile' : '/'} />}
      />
    </Routes>
  );
};

export default AppRouter;
