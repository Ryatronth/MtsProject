import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../../index';
import styles from './WorkWithMenu.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WORKER_ROUTE } from '../../../utils/consts';
import ShowMenuToEdit from '../../../components/pieces/Show/ShowMenuToEdit/ShowMenuToEdit';

const WorkWithMenu = observer(() => {
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
          <h1 className={`${styles.workGroupsTitle}`}>Работа с меню</h1>
        </div>
        <div style={{ width: '1400px' }}>
          <ShowMenuToEdit />
        </div>
      </div>
    </div>
  );
});

export default WorkWithMenu;
