import {
  PROFILE_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  CREATE_PARENT_ROUTE,
} from './utils/consts';
import Profile from './page/Profile';
import Auth from './page/Auth';
import Main from './page/Main';
import CreateParentPage from './page/CreateParentPage';

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: CREATE_PARENT_ROUTE,
    Component: CreateParentPage,
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
