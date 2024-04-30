import React, { useContext } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WORKER_ROUTE } from '../../../utils/consts';
import styles from './WorkWithDishes.module.css';
import ShowDishesToEdit from '../../../components/pieces/Show/ShowDishesToEdit/ShowDishesToEdit';
import { observer } from 'mobx-react-lite';

const WorkWithDishes = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
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
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <h2 style={{ marginBottom: '25px' }}>Завтрак</h2>
          <div style={{ width: '1268px' }}>
            <ShowDishesToEdit selectedTime="BREAKFAST" />
          </div>
          <h2 style={{ marginBottom: '25px' }}>ОБЕД</h2>
          <div style={{ width: '1268px' }}>
            <ShowDishesToEdit selectedTime="LUNCH" />
          </div>
          <h2 style={{ marginBottom: '25px' }}>Полдник</h2>
          <div style={{ width: '1268px' }}>
            <ShowDishesToEdit selectedTime="SNAKE" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default WorkWithDishes;
