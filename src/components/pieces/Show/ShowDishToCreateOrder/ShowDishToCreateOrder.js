import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './ShowDishToCreateOrder.module.css';
import { observer } from 'mobx-react-lite';

const ShowDishToCreateOrder = observer(
  ({
    selectedchildrenList,
    selectedDishesList,
    setSelectedDishesList,
    setAllDishesList,
    allDishesList,
  }) => {
    const subDish = (data) => {
      console.log(data);
      setAllDishesList([...allDishesList, data]);
      setSelectedDishesList(
        selectedDishesList.filter((o) => o.dish.id !== data.dish.id)
      );
    };
    return (
      <div
        style={{ maxHeight: '430px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {selectedchildrenList.map((child) => (
          <div key={child.id} className={`${styles.containerChild}`}>
            <p className={`${styles.childName}`}>
              Список позиций для: {child.surname} {child.name}{' '}
              {child.patronymic}
            </p>
            <div className={`${styles.containerDish} d-flex flex-column`}>
              {selectedDishesList.map((data) => (
                <div
                  key={data.dish.id}
                  className={`${styles.dishInfo} d-flex justify-content-between align-items-center`}
                >
                  <p className={`${styles.dishName}`}>{data.dish.name}</p>
                  <p style={{ color: '#F48104' }}>₽&nbsp;{data.dish.price}</p>
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
        ))}
      </div>
    );
  }
);

export default ShowDishToCreateOrder;
