import React from 'react';
import { Image } from 'react-bootstrap';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';
import { dateToString } from '../../../utils/functions';
import ico from '../../../assets/childrenPP.png';
import styles from './ModalWindowPreview.module.css';

const ModalWindowPreview = ({ mainData, setFlag, date }) => {
  return (
    <div className={`${styles.blur}`}>
      <div className={`${styles.mainContainer} d-flex flex-column`}>
        <CloseWindow func={setFlag} />
        <div
          className={`d-flex flex-column justify-content-between align-items-start row-gap-3`}
        >
          <div className={`${styles.mainInfo} d-flex align-items-center`}>
            <Image src={mainData?.child?.imageUrl || ico} />
            <div
              className={`d-flex flex-column justify-content-between align-items-start row-gap-4`}
            >
              <div className={`d-flex align-items-center column-gap-4`}>
                <p className={`${styles.mainInfoTitle}`}>ФИО:</p>
                <p className={`${styles.mainInfoDescr}`}>
                  {mainData.surname} {mainData.name} {mainData.patronymic}
                </p>
              </div>
              <div className={`d-flex align-items-center column-gap-4`}>
                <p className={`${styles.mainInfoTitle}`}>ID:</p>
                <p className={`${styles.mainInfoDescr}`}>{mainData.id}</p>
              </div>
            </div>
          </div>
          <p className={`${styles.descr}`}>{dateToString(date)}</p>
          <div className={`${styles.dishesContainer}`}>
            <div className={`${styles.dishesList} d-flex align-items-center`}>
              {mainData.dishes.map((dish) => (
                <div
                  className={`${styles.cardDish} d-flex flex-column align-items-center justify-content-start`}
                >
                  <Image src={dish.imageUrl} className={`${styles.cardImg}`} />
                  <p className={`${styles.cardDescr}`}>{dish.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowPreview;
