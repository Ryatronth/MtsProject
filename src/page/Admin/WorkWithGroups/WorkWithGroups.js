import React, { useContext } from 'react';
import { Context } from '../../..';
import { useLocation } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import ShowGroupToEdit from '../../../components/pieces/Show/ShowGroupToEdit/ShowGroupToEdit';
import styles from './WorkWithGroups.module.css';
import BackButton from '../../../components/buttons/BackButton/BackButton';

const WorkWithGroups = () => {
  const { user } = useContext(Context);
  const location = useLocation();
  const { state } = location;
  const groupId = state?.groupId;

  return (
    <div className={`${styles.container}`}>
      <ProfileHeader info={user.user} />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          className={`${styles.previewSection} d-flex justify-content-center align-items-center`}
        >
          <BackButton route={ADMIN_ROUTE} />
          <h1 className={`${styles.title}`}>Группы</h1>
        </div>
        <div className={`${styles.mainBlock}`}>
          <ShowGroupToEdit groupId={groupId ? groupId : undefined} />
        </div>
      </div>
    </div>
  );
};

export default WorkWithGroups;
