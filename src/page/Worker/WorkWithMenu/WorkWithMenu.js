import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import { useNavigate } from 'react-router-dom';
import { WORKER_ROUTE } from '../../../utils/consts';
import styles from './WorkWithMenu.module.css';
import { Button } from 'react-bootstrap';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';
import { getDishes } from '../../../http/userAPI';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { observer } from 'mobx-react-lite';

const WorkWithMenu = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');

  useEffect(() => {
    setTimeout(() => {
      const qparametr = [];
      getDishes(qparametr)
        .then((data) => setAllDishesList(data))
        .finally(() => setLoading(false));
      // getCurrentMenu();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  console.log(allDishesList);

  return (
    <div className="reset-container">
      <ProfileHeader info={user.user} />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          style={{ width: '100%' }}
          className={`d-flex justify-content- align-items-center`}
        >
          <Button
            variant="danger"
            className={`reset-btn ${styles.exit}`}
            onClick={() => navigate(WORKER_ROUTE)}
          >
            Назад
          </Button>
        </div>
        <div className={`d-flex column-gap-3`}>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'BREAKFAST'}
            onClick={() => setSelectedTime('BREAKFAST')}
          >
            breakfast
          </Button>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'LUNCH'}
            onClick={() => setSelectedTime('LUNCH')}
          >
            lunch
          </Button>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'SNACK'}
            onClick={() => setSelectedTime('SNACK')}
          >
            snack
          </Button>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'ALL'}
            onClick={() => setSelectedTime('ALL')}
          >
            All
          </Button>
        </div>
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <h2 className={`${styles.menuTitle}`}>Выбранные блюда</h2>
          <div style={{ width: '1657px' }}>
            <ShowDishesToSelect
              selectedTime={selectedTime}
              dishesList={selectedDishesList}
              exDishesList={allDishesList}
              funcAddSet={setAllDishesList}
              funcSubSet={setSelectedDishesList}
            />
          </div>
          <h2 style={{ marginTop: '25px' }} className={`${styles.menuTitle}`}>
            Выберите блюда
          </h2>
          <div style={{ width: '1657px' }}>
            <ShowDishesToSelect
              selectedTime={selectedTime}
              dishesList={allDishesList}
              exDishesList={selectedDishesList}
              funcAddSet={setSelectedDishesList}
              funcSubSet={setAllDishesList}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default WorkWithMenu;
