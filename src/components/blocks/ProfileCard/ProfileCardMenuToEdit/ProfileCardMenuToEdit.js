import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import styles from './ProfileCardMenuToEdit.module.css';
import { useNavigate } from 'react-router-dom';
import { WORKER_EDIT_MENU } from '../../../../utils/consts';

const ProfileCardMenuToEdit = observer(({ mainData }) => {
  const navigate = useNavigate();

  console.log(mainData);

  const redirToEdit = () => {
    navigate(WORKER_EDIT_MENU, {
      state: { startDate: mainData.startDate, endDate: mainData.endDate },
    });
  };
  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
    >
      <div
        style={{ columnGap: '65px' }}
        className={`d-flex justify-content-start align-items-center`}
      >
        <p className={styles.groupInfoText}>
          Начало:&nbsp;&nbsp;{mainData.startDate}
        </p>
        <p className={styles.groupInfoText}>
          Конец:&nbsp;&nbsp;{mainData.endDate}
        </p>
      </div>
      <div className={`d-flex justify-content-start`}>
        <ManagementButton
          mainFunc={redirToEdit}
          variant="success"
          text="Редактировать"
        />
      </div>
    </div>
  );
});

export default ProfileCardMenuToEdit;
