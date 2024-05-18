import React from 'react';
import {
  ADMIN_CREATE_PARENT_ROUTE as newParent,
  ADMIN_WORK_WITH_GROUPS_ROUTE as workGroup,
  ADMIN_WORK_WITH_PROFILE_ROUTE as workProfile,
} from '../../utils/consts';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import MainButton from '../../components/buttons/MainButton/MainButton';
import ico from '../../assets/admin/ico-adminBtn.png';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const basicList = [
    { text: 'Работа с группами', route: workGroup },
    { text: 'Создать профиль родителя', route: newParent },
    { text: 'Редактировать профиль', route: workProfile },
  ];

  return (
    <>
      <ProfileMainInfo />
      <div className={`mt-5 ${styles.adminBody}`}>
        <div
          className={`${styles.admiContainer} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            className={`${styles.mainBtn} d-flex justify-content-evenly align-items-center`}
          >
            {basicList.map((el) => (
              <MainButton
                key={el.route}
                value={el.text}
                route={el.route}
                ico={ico}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
