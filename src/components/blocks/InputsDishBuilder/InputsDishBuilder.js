import React from 'react';
import styles from './InputsDishBuilder.module.css';

const InputsDishBuilder = ({
  setName,
  setPrice,
  setDescription,
  name,
  price,
  description,
}) => {
  return (
    <div>
      <textarea
        className={`${styles.inputTitle}`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название блюда"
      ></textarea>
      <div className={`${styles.imputPriceContainer}`}>
        ₽&nbsp;
        <input
          className={`${styles.imputPrice}`}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="цена"
        ></input>
      </div>
      <div className={`${styles.description}`}>
        <p>Состав:</p>
        <textarea
          className={`${styles.inputDescr}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
        ></textarea>
      </div>
    </div>
  );
};

export default InputsDishBuilder;
