import React from 'react';
import { Button, Image } from 'react-bootstrap';
import ico from '../../../assets/downArrow.png';
import styles from './InputCSV.module.css';

const InputCSV = ({ func, text, id }) => {
  const createCSV = async (eve) => {
    const choosedFile = eve.target.files[0];
    const formData = new FormData();
    formData.append('file', choosedFile);
    await func(formData)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    eve.target.value = '';
  };

  return (
    <div className={`d-flex flex-column align-items-center row-gap-2`}>
      <input
        id={id}
        type="file"
        accept=".csv"
        className={`input__file`}
        onChange={createCSV}
      />
      <label htmlFor={id}>
        <Button as="span" variant="success" className={`${styles.csvBtn}`}>
          {text}
        </Button>
      </label>
      <div className={`${styles.descr} d-flex align-items-center column-gap-3`}>
        <p>Загрузите CSV</p>
        <label
          htmlFor={id}
          className={`${styles.ico} d-flex justify-content-center align-items-center`}
        >
          <Image
            src={ico}
            width={'100%'}
            height={'100%'}
            style={{ opacity: '76%' }}
          />
        </label>
      </div>
    </div>
  );
};

export default InputCSV;
