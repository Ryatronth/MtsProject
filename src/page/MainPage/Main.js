import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../../utils/consts';
import logo from '../../assets/hdLogo.png';
import styles from './Main.module.css';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      <header className={`${styles.header}`}>
        <div className="d-flex justify-content-between align-items-center ">
          <Image src={logo} width={106} height={75} />
          <Button
            variant="success"
            className={`reset-btn ${styles.headerBtn}`}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </Button>
        </div>
      </header>
      <div className={`${styles.infoBlock} d-flex align-items-center`}>
        <div
          className={`${styles.mainBody} d-flex flex-column justify-content-start align-items-start row-gap-5`}
        >
          <h1 className={`${styles.bodyTitle}`}>
            <span>Индивидуальный</span> рацион для вашего малыша
          </h1>
          <Button
            variant="success"
            className={`reset-btn ${styles.bodyBtn}`}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
