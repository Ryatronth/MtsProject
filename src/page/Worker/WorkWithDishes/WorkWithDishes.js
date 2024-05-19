import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import ShowDishesToEdit from '../../../components/pieces/Show/ShowDishesToEdit/ShowDishesToEdit';
import { getDishes } from '../../../http/userAPI';
import { WORKER_ROUTE } from '../../../utils/consts';
import styles from './WorkWithDishes.module.css';
import BackButton from '../../../components/buttons/BackButton/BackButton';

const WorkWithDishes = observer(() => {
  const [loading, setLoading] = useState(true);
  const [dishesList, setDishesList] = useState([]);

  const basicList = [
    { text: 'ЗАВТРАК', time: 'BREAKFAST' },
    { text: 'ОБЕД', time: 'LUNCH' },
    { text: 'ПОЛДНИК', time: 'SNACK' },
  ];

  useEffect(() => {
    const qparametr = ``;
    getDishes(qparametr)
      .then((data) => setDishesList(data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  return (
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div className={`d-flex flex-column align-items-center`}>
        <div className={`${styles.previewSection} d-flex align-items-center`}>
          <BackButton route={WORKER_ROUTE} />
        </div>
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          {basicList.map((obj) => (
            <>
              <h2 className={`${styles.title}`}>{obj.text}</h2>
              <div className={`${styles.mainBlock}`}>
                <ShowDishesToEdit
                  selectedTime={obj.time}
                  dishesList={dishesList}
                  setDishesList={setDishesList}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
});

export default WorkWithDishes;
