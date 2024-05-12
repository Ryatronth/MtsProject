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
  WORKER_CREATE_MENU,
  WORKER_EDIT_MENU,
  PARENT_ROUTE,
  PARENT_VIEW_ORDER_ROUTE,
  PARENT_CREATE_ORDER_ROUTE,
  WORKER_VIEW_MENU_ROUTE,
  PDF_ROUTE,
  PARENT_PDF_ORDER_ROUTE,
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
import ViewOrder from './page/Parent/ViewOrder/ViewOrder';
import CreateOrder from './page/Parent/CreateOrder/CreateOrder';
import CreateMenu from './page/Worker/CreateMenu/CreateMenu';
import EditMenu from './page/Worker/EditMenu/EditMenu';
import ViewMenu from './page/Worker/ViewMenu/ViewMenu';
import PDFPage from './page/PDFPage/PDFPage';
import PdfOrder from './page/Parent/PdfOrder/PdfOrder';

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
  {
    path: WORKER_CREATE_MENU,
    Component: CreateMenu,
  },
  {
    path: WORKER_EDIT_MENU,
    Component: EditMenu,
  },
  {
    path: WORKER_VIEW_MENU_ROUTE,
    Component: ViewMenu,
  },
  {
    path: PDF_ROUTE,
    Component: PDFPage,
  },
];

export const parentRoutes = [
  {
    path: PARENT_ROUTE,
    Component: ParentPage,
  },
  {
    path: PARENT_CREATE_ORDER_ROUTE,
    Component: CreateOrder,
  },
  {
    path: PARENT_VIEW_ORDER_ROUTE,
    Component: ViewOrder,
  },
  {
    path: PARENT_PDF_ORDER_ROUTE,
    Component: PdfOrder,
  },
];
