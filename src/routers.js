import { PROFILE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from './utils/consts';
import Profile from './page/Profile';
import Auth from './page/Auth';
import Main from './page/Main';

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
];
