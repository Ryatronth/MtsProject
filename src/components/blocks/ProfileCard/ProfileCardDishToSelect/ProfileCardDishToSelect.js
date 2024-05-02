import React from 'react';
import { Button, Image } from 'react-bootstrap';
import icoBtn from '../../../../assets/worker/ico-addDish.png';
import styles from './ProfileCardDishToSelect.module.css';

const ProfileCardDishToSelect = ({
  dishData,
  dishesList,
  exDishesList,
  funcAddSet,
  funcSubSet,
}) => {
  const exchange = () => {
    const newList = dishesList.filter((dish) => dish.id !== dishData.id);
    funcAddSet([...exDishesList, dishData]);
    funcSubSet(newList);
  };

  return (
    <div
      className={`${styles.profileCard} d-flex flex-column align-items-center justify-content-between row-gap-4`}
    >
      <div className={`${styles.imgContainer}`}>
        <Image src={dishData.imageUrl} className={`${styles.img}`}></Image>
      </div>
      <h2 className={`${styles.titleCard}`}>{dishData.name}</h2>
      <div
        className={`${styles.secContainerCard} d-flex justify-content-between align-items-center`}
      >
        <span className={`${styles.priceCard}`}>₽{dishData.price}</span>
        <Button
          variant="success"
          className={`${styles.btnCard} d-flex justify-content-center align-items-center`}
          onClick={() => exchange()}
        >
          <Image src={icoBtn}></Image>
        </Button>
      </div>
    </div>
  );
};

export default ProfileCardDishToSelect;
