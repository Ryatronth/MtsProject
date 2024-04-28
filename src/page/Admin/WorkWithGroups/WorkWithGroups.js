import React, { useContext } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import styles from './WorkWithGroups.module.css';
import ShowGroupToEdit from '../../../components/pieces/Show/ShowGroupToEdit/ShowGroupToEdit';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';

const WorkWithGroups = () => {
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
            onClick={() => navigate(ADMIN_ROUTE)}
          >
            Назад
          </Button>
          <h1 className={`${styles.workGroupsTitle}`}>Группы</h1>
        </div>
        <div style={{ width: '1400px' }}>
          <ShowGroupToEdit />
        </div>
      </div>
    </div>
  );
};

export default WorkWithGroups;
