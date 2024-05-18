import React from 'react';
import styles from './SaveCancelButtons.module.css';
import ManagementButton from '../../buttons/ManagementButton/ManagementButton';

const SaveCancelButtons = ({ funcSave, funcCencel }) => {
  return (
    <div
      className={`${styles.container} d-flex flex-column justify-content-center align-items-center`}
    >
      <ManagementButton
        text="Сохранить"
        variant="successSaveProfile"
        mainFunc={funcSave}
      />
      <ManagementButton
        text="Отмена"
        variant="dangerDeleteProfile"
        mainFunc={funcCencel}
      />
    </div>
  );
};

export default SaveCancelButtons;
