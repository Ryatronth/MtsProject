import { $authHost, $host, $token } from './index';
import { jwtDecode } from 'jwt-decode';

export const login = async (username, password) => {
  const { data } = await $host.post('api/user/login', {
    username,
    password,
  });
  localStorage.setItem('token', data.accessToken);
  document.cookie = `token=${data.refreshToken}`;
  return jwtDecode(data.accessToken);
};

export const mainInfo = async () => {
  const { data } = await $authHost.get('api/user/info');
  return data;
};

export const check = async () => {
  const token = localStorage.getItem('token');
  return token ? jwtDecode(token) : null;
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
  document.cookie = `token=${data.refreshToken}`;

  return jwtDecode(data.accessToken);
};
