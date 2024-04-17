import React, { useContext } from 'react';
import backgr from '../assets/bgProfile.png';
import { Container, Button } from 'react-bootstrap';

const AdminPage = () => {
  return (
    <div
      className="mt-5"
      style={{
        borderTopLeftRadius: '70px',
        borderTopRightRadius: '70px',
        height: '690px',
        background: `url(${backgr}) no-repeat center center`,
      }}
    >
      <div
        style={{ paddingTop: '160px', rowGap: '90px' }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="success"
            style={{
              height: 55,
              width: '370px',
              marginRight: '370px',
              borderRadius: '35px',
              borderColor: '#87C631',
              fontWeight: '500',
              fontSize: '24px',
              backgroundColor: '#87C631',
            }}
          >
            Создать профиль
          </Button>
          <Button
            variant="success"
            style={{
              height: 55,
              width: '370px',
              borderRadius: '35px',
              borderColor: '#87C631',
              fontWeight: '500',
              fontSize: '24px',
              backgroundColor: '#87C631',
            }}
          >
            Редактировать профиль
          </Button>
        </div>
        <div>
          <Button
            variant="success"
            style={{
              height: 55,
              width: '370px',
              borderRadius: '35px',
              borderColor: '#87C631',
              fontWeight: '500',
              fontSize: '24px',
              backgroundColor: '#87C631',
            }}
          >
            Редактировать профиль
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
