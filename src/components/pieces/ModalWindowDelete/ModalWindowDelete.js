import React from 'react';
import { Image } from 'react-bootstrap';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';
import ManagementButton from '../../buttons/ManagementButton/ManagementButton';
import styles from './ModalWindowDelete.module.css';

const ModalWindowDelete = ({ img, text, mainFunc, setFlag, info }) => {
  const func = () => {
    mainFunc();
    setFlag(false);
    document.body.style.overflow = '';
  };

  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <CloseWindow func={setFlag} />
        <p className={`text-center ${styles.descr}`}>{text}</p>
        <div className={`${styles.modalDeleteCard} d-flex align-items-center`}>
          <Image src={img || null} />
          <p>{info}</p>
        </div>
        <ManagementButton
          text="Удалить"
          variant="dangerDeleteOnWindow"
          mainFunc={func}
        />
      </div>
    </div>
  );
};

export default ModalWindowDelete;
