import React from 'react';
import ShowChildByGroup from '../Show/ShowChildByGroup/ShowChildByGroup';
import styles from './ModalWindowEdit.module.css';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';

const ModalWindowEdit = ({ setFlag, mainData }) => {
  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <CloseWindow func={setFlag} />
        <p className={`text-center ${styles.descr}`}>{mainData.id}</p>
        <div className={`${styles.container}`}>
          <ShowChildByGroup groupId={mainData.id} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindowEdit;
