import { $authHost, $host, $token } from './index';
import { jwtDecode } from 'jwt-decode';

export const login = async (username, password) => {
  const { data } = await $host.post('api/user/login', {
    username,
    password,
  });
  localStorage.setItem('token', data.accessToken);
  document.cookie = `token=${data.refreshToken}`;
  return data.accessToken;
};

export const mainInfo = async () => {
  const { data } = await $authHost.get('api/user/info');
  return data;
};

export const getGroups = async () => {
  const { data } = await $authHost.get('api/user/admin/get/groups');
  console.log(data);
  return data;
};

export const getParents = async (qparametr) => {
  const { data } = await $authHost.get('api/user/admin/get/parents', qparametr);
  return data;
};

export const getChildren = async (qparametr) => {
  const { data } = await $authHost.get(
    `api/user/admin/get/children${qparametr}`
  );
  return data;
};

export const getChildrenForParent = async (qparametr) => {
  const { data } = await $authHost.get(
    `api/user/parent/get/children${qparametr}`
  );
  return data;
};

export const getDishes = async (qparametr) => {
  const { data } = await $authHost.get(
    `api/user/worker/get/dishes${qparametr}`
  );
  return data;
};

export const getOrdersForWorker = async (date) => {
  const { data } = await $authHost.get(
    `api/user/worker/get/orders/date/${date}`
  );
  return data;
};

export const getMenuId = async (qparametr) => {
  const { data } = await $authHost.get(`api/user/worker/get/menus${qparametr}`);
  return data;
};

export const getMenuIdForParent = async (qparametr) => {
  const { data } = await $authHost.get(`api/user/parent/get/menus${qparametr}`);
  return data;
};

export const getCurrentMenu = async (id) => {
  const { data } = await $authHost.get(`api/user/worker/get/menu/${id}/dishes`);
  return data;
};

export const getCurrentMenuForParent = async (menuId) => {
  const { data } = await $authHost.get(
    `api/user/parent/get/menu/${menuId}/dishes`
  );
  return data;
};

export const getOrderIdForParent = async (qparametr) => {
  const { data } = await $authHost.get(
    `api/user/parent/get/orders${qparametr}`
  );
  return data;
};

export const getOrderForParent = async (orderId) => {
  const { data } = await $authHost.get(
    `api/user/parent/get/order/${orderId}/dishes`
  );
  return data;
};

export const getCurrentMenuId = async (qparametr) => {
  const { data } = await $authHost.post('api/user/worker/get/menu', qparametr);
  return data;
};

export const getPayment = async (childId) => {
  const { data } = await $authHost.get(
    `api/user/parent/child/${childId}/get/payment`
  );
  return data;
};

export const createGroup = async (groupId) => {
  const { data } = await $authHost.post('api/user/admin/create/group', {
    groupId,
  });
  return data;
};

export const createChild = async ({
  surname,
  name,
  patronymic,
  groupId,
  parentId,
}) => {
  const { data } = await $authHost.post('api/user/admin/create/child', {
    surname,
    name,
    patronymic,
    groupId,
    parentId,
    imageUrl: null,
  });
  return data;
};

export const createChildCsv = async (fileFormData) => {
  const { data } = await $authHost.post(
    'api/user/admin/create/child/csv',
    fileFormData
  );
  return data;
};

export const createParentCsv = async (fileFormData) => {
  const { data } = await $authHost.post(
    'api/user/admin/create/parents/csv',
    fileFormData
  );
  return data;
};

export const createParent = async (user) => {
  const { data } = await $authHost.post('api/user/admin/create/parent', user);
  return data;
};

export const createDish = async (formData) => {
  const { data } = await $authHost.post(
    'api/user/worker/create/dish',
    formData
  );
  return data;
};

export const createCurrentMenu = async (dishes) => {
  const { data } = await $authHost.post('api/user/worker/create/menu', dishes);
  return data;
};

export const createOrders = async (orders) => {
  const { data } = await $authHost.post(
    'api/user/parent/child/order/create',
    orders
  );
  return data;
};

export const deleteChild = async (childId) => {
  const { data } = await $authHost.delete(
    `api/user/admin/delete/child/${childId}`
  );
  return data;
};

export const deleteGroup = async (groupId) => {
  const { data } = await $authHost.delete(
    `api/user/admin/delete/group/${groupId}`
  );
  return data;
};

export const deleteParent = async (parentId) => {
  const { data } = await $authHost.delete(
    `api/user/admin/delete/parent/${parentId}`
  );
  return data;
};

export const deleteDish = async (dishId) => {
  const { data } = await $authHost.delete(
    `api/user/worker/delete/dish/${dishId}`
  );
  return data;
};

export const updateChild = async (
  childId,
  { surname, name, patronymic, groupId, parentId, imageUrl }
) => {
  const { data } = await $authHost.put(
    `api/user/admin/update/child/${childId}`,
    {
      surname,
      name,
      patronymic,
      groupId,
      parentId,
      imageUrl,
    }
  );
  return data;
};

export const updateParent = async (parentId, user) => {
  const { data } = await $authHost.put(
    `api/user/admin/update/parent/${parentId}`,
    user
  );
  return data;
};

export const updateDish = async (dishId, formData) => {
  const { data } = await $authHost.put(
    `api/user/worker/update/dish/${dishId}`,
    formData
  );
  return data;
};

export const updateCurrentMenu = async (menuId, dishes) => {
  const { data } = await $authHost.put(
    `api/user/worker/update/menu/${menuId}`,
    dishes
  );
  return data;
};

export const check = async () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

export const refresh = async () => {
  const cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('='));
  const cookieMap = Object.fromEntries(cookies);
  const refreshToken = cookieMap['token'];

  const { data } = await $token.post('api/user/refresh/access', {
    refreshToken,
  });
  console.log(data);
  localStorage.setItem('token', data.accessToken);
  document.cookie = '';
  document.cookie = `token=${data.refreshToken}`;

  return {
    data: jwtDecode(data.accessToken),
    cookies,
    cookieMap,
    refreshToken,
  };
};
