import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  ADMIN_ROUTE,
  ADMIN_WORK_WITH_GROUPS_ROUTE,
  ADMIN_WORK_WITH_PROFILE_ROUTE,
  ADMIN_CREATE_CHILD_ROUTE,
  ADMIN_CREATE_PARENT_ROUTE,
  ADMIN_EDIT_CHILD_PROFILE_ROUTE,
  ADMIN_EDIT_PARENT_PROFILE_ROUTE,
  WORKER_ROUTE,
  WORKER_WORK_WITH_DISHES,
  WORKER_WORK_WITH_MENU,
  PARENT_ROUTE,
} from './utils/consts';
import Main from './page/MainPage/Main';
import Auth from './page/AuthPage/Auth';
import AdminPage from './page/Admin/AdminPage';
import WorkWithGroups from './page/Admin/WorkWithGroups/WorkWithGroups';
import CreateChildPage from './page/Admin/CreateChildPage/CreateChildPage';
import CreateParentPage from './page/Admin/CreateParentPage/CreateParentPage';
import WorkWithProfile from './page/Admin/WorkWithProfile/WorkWithProfile';
import EditChildPage from './page/Admin/EditChildPage/EditChildPage';
import EditParentPage from './page/Admin/EditParentPage/EditParentPage';
import WorkerPage from './page/Worker/WorkerPage';
import WorkWithDishes from './page/Worker/WorkWithDishes/WorkWithDishes';
import ParentPage from './page/Parent/ParentPage';
import WorkWithMenu from './page/Worker/WorkWithMenu/WorkWithMenu';

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

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: ADMIN_WORK_WITH_GROUPS_ROUTE,
    Component: WorkWithGroups,
  },
  {
    path: ADMIN_CREATE_CHILD_ROUTE,
    Component: CreateChildPage,
  },
  {
    path: ADMIN_CREATE_PARENT_ROUTE,
    Component: CreateParentPage,
  },
  {
    path: ADMIN_WORK_WITH_PROFILE_ROUTE,
    Component: WorkWithProfile,
  },
  {
    path: ADMIN_EDIT_CHILD_PROFILE_ROUTE,
    Component: EditChildPage,
  },
  {
    path: ADMIN_EDIT_PARENT_PROFILE_ROUTE,
    Component: EditParentPage,
  },
];

export const workerRoutes = [
  {
    path: WORKER_ROUTE,
    Component: WorkerPage,
  },
  {
    path: WORKER_WORK_WITH_DISHES,
    Component: WorkWithDishes,
  },
  {
    path: WORKER_WORK_WITH_MENU,
    Component: WorkWithMenu,
  },
];

export const parentRoutes = [
  {
    path: PARENT_ROUTE,
    Component: ParentPage,
  },
];
