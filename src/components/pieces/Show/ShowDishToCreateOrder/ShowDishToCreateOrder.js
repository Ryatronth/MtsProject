import React from 'react';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { countDay, countWeekendDays } from '../../../../utils/functions';
import styles from './ShowDishToCreateOrder.module.css';

const ShowDishToCreateOrder = observer(
  ({
    selectedchildrenList,
    selectedDishesList,
    setSelectedDishesList,
    setAllDishesList,
    allDishesList,
    resPrice,
    setResPrice,
    startDate,
    endDate,
  }) => {
    const names = selectedchildrenList
      .map((child) => `${child.surname} ${child.name} ${child.patronymic}`)
      .join(', ');

    const subDish = (data) => {
      setAllDishesList([...allDishesList, data]);
      setSelectedDishesList(
        selectedDishesList.filter((o) => o.dish.id !== data.dish.id)
      );
      setResPrice(
        resPrice -
          data.dish.price *
            selectedchildrenList.length *
            (countDay(startDate, endDate) -
              countWeekendDays(startDate, endDate))
      );
    };

    return (
      <div className={`${styles.section} d-flex flex-column`}>
        <div className={`${styles.containerChild}`}>
          <p className={`${styles.childName}`}>Список позиций для: {names}</p>
          <div className={`${styles.containerDish} d-flex flex-column`}>
            {selectedDishesList.map((data) => (
              <div
                key={data.dish.id}
                className={`${styles.dishInfo} d-flex justify-content-between align-items-center`}
              >
                <p className={`${styles.dishName}`}>{data.dish.name}</p>
                <p className={`${styles.dishPrice}`}>
                  ₽&nbsp;{data.dish.price}
                </p>
                <Button
                  variant="danger"
                  className={`${styles.deleteDish}`}
                  onClick={() => subDish(data)}
                >
                  Удалить
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ShowDishToCreateOrder;
