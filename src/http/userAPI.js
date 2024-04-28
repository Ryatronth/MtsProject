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
  return data;
};

export const getParents = async () => {
  const { data } = await $authHost.get('api/user/admin/get/parents');
  return data;
};

export const getChildren = async () => {
  const { data } = await $authHost.get('api/user/admin/get/children');
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

export const createParent = async ({
  username,
  password,
  surname,
  name,
  patronymic,
  phone,
  role,
  imageUrl,
  childrenId,
}) => {
  const { data } = await $authHost.post('api/user/admin/create/parent', {
    username,
    password,
    surname,
    name,
    patronymic,
    phone,
    role,
    imageUrl,
    childrenId,
  });
  return data;
};

export const createWorker = async ({
  username,
  password,
  surname,
  name,
  patronymic,
  phone,
}) => {
  const { data } = await $authHost.post('api/user/admin/create/worker', {
    username,
    password,
    surname,
    name,
    patronymic,
    phone,
    role: 'WORKER',
    imageUrl: null,
  });
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

  const { data } = await $token.post('api/user/refresh/all', { refreshToken });
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
