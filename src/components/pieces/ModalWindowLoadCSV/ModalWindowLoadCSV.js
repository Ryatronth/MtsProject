import React from 'react';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';
import InputCSV from '../../inputs/InputCSV/InputCSV';
import { createChildCsv, createParentCsv } from '../../../http/userAPI';
import styles from './ModalWindowLoadCSV.module.css';

const ModalWindowLoadCSV = ({ setFlag }) => {
  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <CloseWindow func={setFlag} />
        <p className={`text-center ${styles.descr}`}>Загрузка CSV</p>
        <div
          className={`${styles.infoBlock} d-flex justifu-content-center align-items-center column-gap-5`}
        >
          <InputCSV func={createChildCsv} text={'Добавить детей'} id="file" />
          <InputCSV
            func={createParentCsv}
            text={'Добавить родителей'}
            id="file2"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWindowLoadCSV;
