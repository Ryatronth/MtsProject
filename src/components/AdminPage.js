import React from 'react';
import backgr from '../assets/bgProfile.png';
import { Button } from 'react-bootstrap';

const AdminPage = () => {
  return (
    <div
      className="mt-5 admin-body"
      style={{
        background: `url(${backgr}) no-repeat center center`,
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center admin-body__container">
        <div
          style={{ columnGap: '370px' }}
          className="d-flex justify-content-center align-items-center"
        >
          <Button
            variant="success"
            className="reset-btn admin-body__container-btn"
          >
            Создать профиль
          </Button>
          <Button
            variant="success"
            className="reset-btn admin-body__container-btn"
          >
            Редактировать профиль
          </Button>
        </div>
        <div>
          <Button
            variant="success"
            className="reset-btn admin-body__container-btn"
          >
            Редактировать профиль
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
