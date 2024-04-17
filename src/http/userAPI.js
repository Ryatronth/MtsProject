import { $authHost, $host } from './index';
import { jwtDecode } from 'jwt-decode';

// export const login = async (email, password) => {
//   const { data } = await $host.post('api/user/login', {
//     email,
//     password,
//   });
//   localStorage.setItem('token', data.token);
//   return jwtDecode(data.token);
// };

// -*-*-*-*-*-*-*-* For frontend *-*-*-*-*-*-*-*-*-
// export const check = async () => {
//   const { data } = await $authHost.get('api/user/auth');
//   localStorage.setItem('token', data.token);
//   return jwtDecode(data.token);
// };

// export const mainInfo = async () => {
//   const { data } = await $authHost.get('api/user/info');
//   return data.user;
// };
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

// -*-*-*-*-*-*-*-* For backend *-*-*-*-*-*-*-*-*-
export const login = async (username, password) => {
  const { data } = await $host.post('api/user/login', {
    username,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const mainInfo = async () => {
  const { data } = await $authHost.get('api/user/info');
  return data;
};

export const check = async () => {
  const token = localStorage.getItem('token');
  return !!token;
};
