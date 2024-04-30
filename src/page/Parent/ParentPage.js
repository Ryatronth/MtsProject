import React from 'react';
import {
  ADMIN_CREATE_PARENT_ROUTE,
  ADMIN_WORK_WITH_GROUPS_ROUTE,
  ADMIN_WORK_WITH_PROFILE_ROUTE,
} from '../../utils/consts';
import backgr from '../../assets/bgProfile.png';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import MainButton from '../../components/buttons/MainButton/MainButton';
import ico from '../../assets/admin/ico-adminBtn.png';
import styles from './ParentPage.module.css';

const ParentPage = () => {
  return (
    <>
      <ProfileMainInfo />
      <div
        className={`mt-5 ${styles.parentBody}`}
        style={{
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div
          className={`${styles.parentContainer} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            style={{ width: '100%', flexWrap: 'wrap' }}
            className="d-flex justify-content-evenly align-items-center"
          >
            <MainButton
              value={'Работа с группами'}
              route={ADMIN_WORK_WITH_GROUPS_ROUTE}
              ico={ico}
            />
            <MainButton
              value={'Создать профиль родителя'}
              route={ADMIN_CREATE_PARENT_ROUTE}
              ico={ico}
            />
            <MainButton
              value={'Редактировать профиль'}
              route={ADMIN_WORK_WITH_PROFILE_ROUTE}
              ico={ico}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentPage;
