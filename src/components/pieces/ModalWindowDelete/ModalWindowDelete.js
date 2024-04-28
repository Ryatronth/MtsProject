import React from 'react';
import exit from '../../../assets/exit.png';
import { Button, Image } from 'react-bootstrap';
import styles from './ModalWindowDelete.module.css';

const ModalWindowDelete = ({ img, text, mainFunc, setFlag, info }) => {
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
        <p className={`text-center ${styles.descr}`}>{text}</p>
        <div className={`${styles.modalDeleteCard} d-flex align-items-center`}>
          <Image src={img} />
          <p>{info}</p>
        </div>
        <Button
          variant="danger"
          className={`${styles.modalDeleteBtn}`}
          onClick={() => {
            mainFunc();
            setFlag(false);
            document.body.style.overflow = '';
          }}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default ModalWindowDelete;
