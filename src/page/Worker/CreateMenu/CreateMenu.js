import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import { useLocation, useNavigate } from 'react-router-dom';
import { WORKER_ROUTE, WORKER_WORK_WITH_MENU } from '../../../utils/consts';
import { Button } from 'react-bootstrap';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';
import { createCurrentMenu, getDishes } from '../../../http/userAPI';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { observer } from 'mobx-react-lite';
import icoSub from '../../../assets/worker/ico-sub.png';
import icoPlus from '../../../assets/worker/ico-addDish.png';
import styles from './CreateMenu.module.css';

const CreateMenu = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const { state } = location;
  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');

  const clickSaveCurrentMenu = async () => {
    const dishes = {
      dishes: selectedDishesList.map((dish) => dish.id),
      endDate: `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`,
      startDate: `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`, //YYYY-MM-DD
    };
    createCurrentMenu(dishes)
      .then((data) => {
        alert(data.message);
        navigate(WORKER_WORK_WITH_MENU);
      })
      .catch((e) => {
        alert(e.response.data.message);
        navigate(WORKER_WORK_WITH_MENU);
      });
  };

  useEffect(() => {
    let qparametr = ``;
    getDishes(qparametr)
      .then((data) => {
        setAllDishesList(data);
      })
      .finally(() => setLoading(false));
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
            onClick={() => navigate(WORKER_WORK_WITH_MENU)}
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
              ico={icoSub}
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
              ico={icoPlus}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateMenu;
