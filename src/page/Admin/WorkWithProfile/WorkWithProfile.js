import React, { useContext, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import ShowGroupToEdit from '../../../components/pieces/Show/ShowGroupToEdit/ShowGroupToEdit';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';
import styles from './WorkWithProfile.module.css';
import ShowChildToEdit from '../../../components/pieces/Show/ShowChildToEdit/ShowChildToEdit';
import ShowParentToEdit from '../../../components/pieces/Show/ShowParentToEdit/ShowParentToEdit';

const WorkWithProfile = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [profile, setProfile] = useState('Ребёнок');

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
          <h1 className={`${styles.workGroupsTitle}`}>Редактировать профиль</h1>
        </div>
        <div
          className={`d-flex justify-content-center align-items-center column-gap-3 mb-5`}
        >
          <Button
            variant="outline-success"
            active={profile === 'Ребёнок'}
            className={`${styles.mainBtn}`}
            onClick={() => setProfile('Ребёнок')}
          >
            Ребёнок
          </Button>
          <Button
            variant="outline-success"
            active={profile === 'Родитель'}
            className={`${styles.mainBtn}`}
            onClick={() => setProfile('Родитель')}
          >
            Родитель
          </Button>
        </div>
        <div style={{ width: '1400px' }}>
          {profile === 'Ребёнок' && <ShowChildToEdit />}
          {profile === 'Родитель' && <ShowParentToEdit />}
        </div>
      </div>
    </div>
  );
};

export default WorkWithProfile;
