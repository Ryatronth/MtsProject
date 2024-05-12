import React from 'react';
import styles from './ShowOrderByChild.module.css';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { useNavigate } from 'react-router-dom';
import { PARENT_PDF_ORDER_ROUTE } from '../../../../utils/consts';

const ShowOrderByChild = observer(({ loading, mainData }) => {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  const handlePDF = (data) => {
    navigate(PARENT_PDF_ORDER_ROUTE, {
      state: { data: data },
    });
  };

  return (
    <div className={`${styles.mainInfo}`}>
      <div
        style={{ maxHeight: '450px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {mainData.map((data) => (
          <div
            key={data.child.id}
            className={`${styles.card} d-flex flex-column align-items-start justify-content-between`}
          >
            <p className={`${styles.cardName}`}>
              Ребёнок:&nbsp;{data.child.surname} {data.child.name}{' '}
              {data.child.patronymic}
            </p>
            <div
              className={`${styles.cardSection} d-flex justify-content-between align-items-center`}
            >
              <p className={`${styles.cardPrice}`}>
                Сумма:&nbsp;&nbsp;
                <span>₽ {data.price}</span>
              </p>
              <Button
                variant="secondary"
                className={`${styles.cardPdf}`}
                onClick={async () => handlePDF(data)}
              >
                Сформировать отчёт
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ShowOrderByChild;
