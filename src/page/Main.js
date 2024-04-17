import React, { useContext, useState } from 'react';
import logo from '../assets/hdLogo.png';
import bgMain from '../assets/bgMain.png';
import { LOGIN_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '0 65px',
        margin: '0 auto',
        background: `url(${bgMain}) no-repeat center center`,
      }}
    >
      <header style={{ padding: '15px 0', borderBottom: '1px solid #AFAFAF' }}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ margin: '0 59px' }}
        >
          <Image src={logo} width={106} height={75} />
          <Button
            variant="outline-success"
            style={{
              borderRadius: '35px',
              width: '159px',
              height: '51px',
              fontWeight: '500',
              fontSize: '24px',
            }}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </Button>
        </div>
      </header>
      <div
        style={{
          width: '832px',
          height: '720px',
          marginTop: '257px',
          marginLeft: '65px',
          paddingBottom: '356px',
        }}
        className="d-flex flex-column justify-content-start align-items-start row-gap-4"
      >
        <h1
          className="m-0"
          style={{
            width: '832px',
            fontWeight: '700',
            fontSize: '58px',
            color: '#414141',
          }}
        >
          <span style={{ color: '#F48104' }}>Индивидуальный</span> рацион для
          вашего малыша
        </h1>
        <div
          style={{
            fontWeight: '500',
            fontSize: '32px',
            color: '#414141',
          }}
        >
          Жёсткое описаниеЖёсткое описаниеЖёсткое описаниеЖёсткое описание
          Жёсткое описание Жёсткое описание Жёсткое описание
        </div>
        <Button
          variant="outline-success"
          style={{
            borderRadius: '35px',
            width: '224px',
            height: '72px',
            fontWeight: '500',
            fontSize: '32px',
          }}
          onClick={() => navigate(LOGIN_ROUTE)}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Main;
