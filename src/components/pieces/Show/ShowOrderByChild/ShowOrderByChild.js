import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { PARENT_PDF_ORDER_ROUTE } from '../../../../utils/consts';
import styles from './ShowOrderByChild.module.css';

const ShowOrderByChild = observer(({ loading, mainData, childrenList }) => {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  const handlePDF = (child, data) => {
    navigate(PARENT_PDF_ORDER_ROUTE, {
      state: { data, child },
    });
  };

  return (
    <div className={`${styles.mainInfo}`}>
      <div className={`${styles.section} d-flex flex-column`}>
        {mainData.map((data) => {
          const child = childrenList.find((child) => child.id === data.id);
          return (
            <div
              key={data.id}
              className={`${styles.card} d-flex flex-column align-items-start justify-content-between`}
            >
              <p className={`${styles.cardName}`}>
                Ребёнок:&nbsp;{child.surname} {child.name} {child.patronymic}
              </p>
              <div
                className={`${styles.cardSection} d-flex justify-content-between align-items-center`}
              >
                <p className={`${styles.cardPrice}`}>
                  Сумма:&nbsp;&nbsp;
                  <span>₽ {data.data.totalPrice}</span>
                </p>
                <Button
                  variant="secondary"
                  className={`${styles.cardPdf}`}
                  onClick={() => handlePDF(child, data.data)}
                >
                  Сформировать отчёт
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ShowOrderByChild;
