import React from 'react';
import exit from '../../../assets/exit.png';
import { Button, Image } from 'react-bootstrap';
import styles from './ModalWindowConfirmation.module.css';
import ShowDishToCreateOrder from '../Show/ShowDishToCreateOrder/ShowDishToCreateOrder';
import { createOrders } from '../../../http/userAPI';

const ModalWindowConfirmation = ({
  setFlag,
  selectedchildrenList,
  selectedDishesList,
  setSelectedDishesList,
  allDishesList,
  setAllDishesList,
  startDate,
  endDate,
}) => {
  const clickCreateOrder = async () => {
    console.log(selectedDishesList.map((dish) => dish.id));
    const orders = selectedchildrenList.flatMap((child) => {
      const objList = [];
      let tempStartDate = new Date(startDate);

      while (tempStartDate <= endDate || !endDate) {
        objList.push({
          childId: child.id,
          date: `${tempStartDate.getFullYear()}-${(tempStartDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${tempStartDate
            .getDate()
            .toString()
            .padStart(2, '0')}`,
          menuDishes: selectedDishesList.map((dish) => dish.id),
        });
        if (!endDate) break;
        tempStartDate.setDate(tempStartDate.getDate() + 1);
      }
      return objList;
    });
    await createOrders(orders)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
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
        <p className={`text-center ${styles.descr}`}>Подтверждение рациона</p>
        <div style={{ width: '995px' }}>
          <ShowDishToCreateOrder
            selectedDishesList={selectedDishesList}
            selectedchildrenList={selectedchildrenList}
            setAllDishesList={setAllDishesList}
            setSelectedDishesList={setSelectedDishesList}
            allDishesList={allDishesList}
          />
        </div>
        <div
          className={`${styles.blockConfirmation} d-flex justify-content-between align-items-center`}
        >
          <h2 className={`${styles.result}`}>
            ИТОГ:&nbsp;<span className={`${styles.resultRub}`}>₽1000</span>
          </h2>
          <Button
            variant="success"
            className={`${styles.confirmationBtn}`}
            onClick={() => clickCreateOrder()}
          >
            Подтвердить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowConfirmation;
