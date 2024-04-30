import React, { useContext, useState } from 'react';
import backgr from '../../assets/auth/bgAuth.png';
import logo from '../../assets/auth/logo.png';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { ADMIN_ROUTE, PARENT_ROUTE, WORKER_ROUTE } from '../../utils/consts';
import { login, mainInfo } from '../../http/userAPI';
import { Form, Button, Card, Image } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import styles from './Auth.module.css';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = {
    ADMIN: ADMIN_ROUTE,
    WORKER: WORKER_ROUTE,
    PARENT: PARENT_ROUTE,
  };

  const click = async () => {
    try {
      if (!email && !password) {
        alert('Введите данные');
      } else if (!password) {
        alert('Введите пароль');
      } else if (!email) {
        alert('Введите логин');
      } else {
        let data;
        data = await login(email, password);
        user.setToken(data);
        user.setIsAuth(true);
        user.setTimer(data.exp - Math.floor(Date.now() / 1000));
        const mainInf = await mainInfo();
        user.setUser(mainInf);
        navigate(router[jwtDecode(user.token).role]);
      }
    } catch (e) {
      console.log(e);
      alert(e.response);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F48104',
        background: `url(${backgr}) no-repeat center center`,
      }}
    >
      <Card
        className={`${styles.authBody} d-flex flex-column justify-content-center align-items-center`}
      >
        <Image
          src={logo}
          width={172}
          height={172}
          className={`${styles.authImg}`}
        />
        <h1 className={`${styles.authTitle}`}>Авторизация</h1>
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <Form.Control
            className={`${styles.authInput} text-center`}
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control
            className={`${styles.authInput} text-center`}
            placeholder="Пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button
            className={`reset-btn ${styles.authBtn}`}
            variant={'success'}
            onClick={click}
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
});

export default Auth;
