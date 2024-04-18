import React from 'react';
import logo from '../assets/hdLogo.png';
import bgMain from '../assets/bgMain.png';
import { LOGIN_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div
      className="reset-container"
      style={{
        background: `url(${bgMain}) no-repeat center center`,
      }}
    >
      <header className="reset-header">
        <div className="d-flex justify-content-between align-items-center ">
          <Image src={logo} width={106} height={75} />
          <Button
            variant="success"
            className="reset-btn header__btn"
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </Button>
        </div>
      </header>
      <div className="body d-flex flex-column justify-content-start align-items-start row-gap-4">
        <h1 className="body__title">
          <span style={{ color: '#F48104' }}>Индивидуальный</span> рацион для
          вашего малыша
        </h1>
        <p className="body__descr">
          Жёсткое описаниеЖёсткое описаниеЖёсткое описаниеЖёсткое описание
          Жёсткое описание Жёсткое описание Жёсткое описание
        </p>
        <Button
          variant="success"
          className="reset-btn body__btn"
          onClick={() => navigate(LOGIN_ROUTE)}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Main;
