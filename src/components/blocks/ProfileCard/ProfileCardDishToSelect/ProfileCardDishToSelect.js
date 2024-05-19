import React from 'react';
import { Button, Image } from 'react-bootstrap';
import styles from './ProfileCardDishToSelect.module.css';

const ProfileCardDishToSelect = ({
  dishData,
  dishesList,
  exDishesList,
  funcAddSet,
  funcSubSet,
  ico,
}) => {
  const exchange = () => {
    const newList = dishesList.filter(
      (data) => data.dish.id !== dishData.dish.id
    );
    funcAddSet([...exDishesList, dishData]);
    funcSubSet(newList);
  };

  return (
    <div
      className={`${styles.profileCard} d-flex flex-column align-items-center justify-content-between row-gap-4`}
    >
      <div className={`${styles.imgContainer}`}>
        <Image src={dishData.dish.imageUrl} className={`${styles.img}`} />
      </div>
      <h2 className={`${styles.titleCard}`}>{dishData.dish.name}</h2>
      <div
        className={`${styles.secContainerCard} d-flex justify-content-between align-items-center`}
      >
        <span className={`${styles.priceCard}`}>₽{dishData.dish.price}</span>
        <Button
          variant="success"
          className={`${styles.btnCard} d-flex justify-content-center align-items-center`}
          onClick={() => exchange()}
        >
          <Image src={ico} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileCardDishToSelect;
