import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:8080/',
});

const $authHost = axios.create({
  baseURL: 'http://localhost:8080/',
});

const $token = axios.create({
  baseURL: 'http://localhost:8080/',
});

const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
$token.interceptors.request.use(authInterceptor);

export { $host, $authHost, $token };
