import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://192.168.159.16:8080/',
});

const $authHost = axios.create({
  baseURL: 'http://192.168.159.16:8080/',
});

const $token = axios.create({
  baseURL: 'http://192.168.159.16:8080/',
});

const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const refreshInterceptor = (config) => {
  const cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('='));
  const cookieMap = Object.fromEntries(cookies);
  const refreshToken = cookieMap['token'];
  config.headers.Authorization = `Bearer ${refreshToken}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
$token.interceptors.request.use(refreshInterceptor);

export { $host, $authHost, $token };
