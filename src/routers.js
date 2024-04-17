import { PROFILE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from './utils/consts';
import Profile from './page/Profile';
import Auth from './page/Auth';
import Main from './page/Main';
// import AdminPage from './components/AdminPage';
// import ParentPage from './components/AdminPage';

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

// export const profileRoutes = [
//   {
//     role: 'ADMIN',
//     path: PROFILE_ROUTE,
//     Component: AdminPage,
//   },
//   {
//     role: 'USER',
//     path: PROFILE_ROUTE,
//     Component: ParentPage,
//   },
// ];
