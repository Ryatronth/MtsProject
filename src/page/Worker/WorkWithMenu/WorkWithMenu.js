import React from 'react';
import { observer } from 'mobx-react-lite';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import ShowMenuToEdit from '../../../components/pieces/Show/ShowMenuToEdit/ShowMenuToEdit';
import BackButton from '../../../components/buttons/BackButton/BackButton';
import { WORKER_ROUTE } from '../../../utils/consts';
import styles from './WorkWithMenu.module.css';

const WorkWithMenu = observer(() => {
  return (
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          className={`${styles.previewSection} d-flex justify-content-center align-items-center`}
        >
          <BackButton route={WORKER_ROUTE} />
          <h1 className={`${styles.workGroupsTitle}`}>Работа с меню</h1>
        </div>
        <div className={`${styles.infoBlock}`}>
          <ShowMenuToEdit />
        </div>
      </div>
    </div>
  );
});

export default WorkWithMenu;
