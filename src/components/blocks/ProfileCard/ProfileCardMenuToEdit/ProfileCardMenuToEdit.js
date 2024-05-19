import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { WORKER_EDIT_MENU } from '../../../../utils/consts';
import styles from './ProfileCardMenuToEdit.module.css';

const ProfileCardMenuToEdit = observer(({ mainData }) => {
  const navigate = useNavigate();

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
        className={`${styles.dateContainer} d-flex justify-content-start align-items-center`}
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
