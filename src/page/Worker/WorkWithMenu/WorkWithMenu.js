import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import { useNavigate } from 'react-router-dom';
import { WORKER_ROUTE } from '../../../utils/consts';
import styles from './WorkWithMenu.module.css';
import { Button } from 'react-bootstrap';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';
import {
  createCurrentMenu,
  getCurrentMenu,
  getDishes,
  getMenuId,
} from '../../../http/userAPI';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { observer } from 'mobx-react-lite';

const WorkWithMenu = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');

  const clickSaveCurrentMenu = async () => {
    const dishes = {
      dishes: selectedDishesList.map((dish) => dish.id),
      endDate: `2024-05-14`,
      startDate: `2024-05-04`, //YYYY-MM-DD
    };
    createCurrentMenu(dishes);
  };

  useEffect(() => {
    setTimeout(() => {
      let qparametr = `?endDate=2024-05-14`;
      getMenuId(qparametr).then((id) => {
        qparametr = `?menuId=${id[0].id}`;
        getCurrentMenu(qparametr)
          .then((menu) => {
            const listMenu = menu.map((o) => o.dish);
            setSelectedDishesList(listMenu);
            qparametr = `?exclude=${listMenu.map((o) => o.id).join(',')}`;
            getDishes(qparametr).then((data) => {
              setAllDishesList(data);
            });
          })
          .finally(() => setLoading(false));
      });
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
        <div className={`d-flex column-gap-3 mb-4`}>
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
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            onClick={() => clickSaveCurrentMenu()}
          >
            Сохранить
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
