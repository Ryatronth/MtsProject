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
      let data;
      data = await login(email, password);
      user.setUser(true);
      user.setIsAuth(true);
      navigate(PROFILE_ROUTE);
    } catch (e) {
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
      <Card
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          width: 794,
          backgroundColor: '#fff',
          padding: '99px 104px 90px',
        }}
      >
        <Image
          src={logo}
          width={172}
          height={172}
          style={{
            borderRadius: '50%',
            boxShadow: '15px 15px 40px rgba(0, 0, 0, 0.25)',
          }}
        />
        <h1
          style={{
            margin: 0,
            marginTop: '60px',
            fontSize: 48,
            fontWeight: 500,
            color: '#414141',
          }}
        >
          Авторизация
        </h1>
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <Form.Control
            style={{
              height: 90,
              width: 586,
              padding: '35px 20px',
              marginTop: '60px',
              borderRadius: '100px',
              background: '#f48104',
              fontWeight: 500,
              fontSize: 24,
              color: '#fff',
            }}
            className="text-center"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control
            style={{
              height: 90,
              width: 586,
              padding: '35px 20px',
              borderRadius: '100px',
              background: '#f48104',
              fontWeight: 500,
              fontSize: 24,
              color: '#fff',
            }}
            className="text-center mt-5"
            placeholder="Пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button
            style={{
              width: 224,
              padding: '10px 0px',
              marginTop: '126px',
              borderRadius: '100px',
              fontWeight: 500,
              fontSize: 24,
            }}
            variant={'outline-success'}
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
