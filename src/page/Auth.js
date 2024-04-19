import React, { useContext, useState } from 'react';
import backgr from '../assets/bgAuth.png';
import logo from '../assets/logo.png';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { PROFILE_ROUTE } from '../utils/consts';
import { login } from '../http/userAPI';
import { Form, Button, Card, Image } from 'react-bootstrap';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        console.log(data);
        user.setUser(true);
        user.setIsAuth(true);
        user.setTimer(data.exp - Math.floor(Date.now() / 1000));
        navigate(PROFILE_ROUTE);
      }
    } catch (e) {
      console.log(e.response);
      alert(e.response.data.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F48104',
        background: `url(${backgr}) no-repeat center center`,
      }}
    >
      <Card className="auth-body d-flex flex-column justify-content-center align-items-center">
        <Image
          src={logo}
          width={172}
          height={172}
          style={{
            borderRadius: '50%',
            boxShadow: '15px 15px 40px rgba(0, 0, 0, 0.25)',
          }}
        />
        <h1 className="auth-body__title">Авторизация</h1>
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <Form.Control
            style={{
              marginTop: '60px',
            }}
            className="auth-body__input text-center"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control
            className="auth-body__input text-center mt-5"
            placeholder="Пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button
            className="reset-btn auth-body__btn"
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
