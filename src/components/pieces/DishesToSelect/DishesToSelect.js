import React from 'react';
import ShowDishesToSelect from '../Show/ShowDishesToSelect/ShowDishesToSelect';
import styles from './DishesToSelect.module.css';

const DishesToSelect = ({ obj }) => {
  return (
    <>
      <h2 className={`${styles.menuTitle}`}>{obj.title}</h2>
      <div className={`${styles.infoBlock}`}>
        <ShowDishesToSelect
          selectedTime={obj.selectedTime}
          dishesList={obj.dishesList}
          exDishesList={obj.exDishesList}
          funcAddSet={obj.funcAddSet}
          funcSubSet={obj.funcSubSet}
          ico={obj.ico}
        />
      </div>
    </>
  );
};

export default DishesToSelect;
