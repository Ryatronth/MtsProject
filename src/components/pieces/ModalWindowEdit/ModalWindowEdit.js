import React from 'react';
import exit from '../../../assets/exit.png';
import { Image } from 'react-bootstrap';
import styles from './ModalWindowEdit.module.css';
import ShowChildByGroup from '../Show/ShowChildByGroup/ShowChildByGroup';

const ModalWindowEdit = ({ setFlag, mainData }) => {
  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <Image
          className={`${styles.exit}`}
          src={exit}
          onClick={() => {
            setFlag(false);
            document.body.style.overflow = '';
          }}
        />
        <p className={`text-center ${styles.descr}`}>{mainData.id}</p>
        <div style={{ width: '1007px' }}>
          <ShowChildByGroup groupId={mainData.id} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindowEdit;
