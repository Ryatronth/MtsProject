import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  adminRoutes,
  parentRoutes,
  publicRoutes,
  workerRoutes,
} from '../routers';
import { Context } from '../index';
import { PARENT_ROUTE, ADMIN_ROUTE, WORKER_ROUTE } from '../utils/consts';
import { jwtDecode } from 'jwt-decode';

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        jwtDecode(user.token).role === 'ADMIN' &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {user.isAuth &&
        jwtDecode(user.token).role === 'PARENT' &&
        parentRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {user.isAuth &&
        jwtDecode(user.token).role === 'WORKER' &&
        workerRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      {user.isAuth && jwtDecode(user.token).role === 'ADMIN' && (
        <Route path="*" element={<Navigate to={ADMIN_ROUTE} />} />
      )}
      {user.isAuth && jwtDecode(user.token).role === 'PARENT' && (
        <Route path="*" element={<Navigate to={PARENT_ROUTE} />} />
      )}
      {user.isAuth && jwtDecode(user.token).role === 'WORKER' && (
        <Route path="*" element={<Navigate to={WORKER_ROUTE} />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
