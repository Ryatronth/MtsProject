import React from 'react';
import { CREATE_PARENT_ROUTE } from '../utils/consts';
import backgr from '../assets/bgProfile.png';
import AdminButton from '../components/buttons/AdminButton';

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
          style={{ width: '100%' }}
          className="d-flex justify-content-evenly align-items-center"
        >
          <AdminButton value={'Создать профиль ребёнка'} />
          <AdminButton
            value={'Создать профиль родителя'}
            route={CREATE_PARENT_ROUTE}
          />
          <AdminButton value={'Редактировать профиль'} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
