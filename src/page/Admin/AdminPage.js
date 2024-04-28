import React from 'react';
import {
  ADMIN_CREATE_PARENT_ROUTE,
  ADMIN_WORK_WITH_GROUPS_ROUTE,
  ADMIN_WORK_WITH_PROFILE_ROUTE,
} from '../../utils/consts';
import backgr from '../../assets/bgProfile.png';
import AdminButton from '../../components/buttons/AdminButton/AdminButton';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  return (
    <>
      <ProfileMainInfo />
      <div
        className={`mt-5 ${styles.adminBody}`}
        style={{
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div
          className={`${styles.admiContainer} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            style={{ width: '100%', flexWrap: 'wrap' }}
            className="d-flex justify-content-evenly align-items-center"
          >
            <AdminButton
              value={'Работа с группами'}
              route={ADMIN_WORK_WITH_GROUPS_ROUTE}
            />
            <AdminButton
              value={'Создать профиль родителя'}
              route={ADMIN_CREATE_PARENT_ROUTE}
            />
            <AdminButton
              value={'Редактировать профиль'}
              route={ADMIN_WORK_WITH_PROFILE_ROUTE}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
