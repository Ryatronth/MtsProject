import React, { useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import ShowChildToEdit from '../../../components/pieces/Show/ShowChildToEdit/ShowChildToEdit';
import ShowParentToEdit from '../../../components/pieces/Show/ShowParentToEdit/ShowParentToEdit';
import BackButton from '../../../components/buttons/BackButton/BackButton';
import InformationSwitch from '../../../components/buttons/InformationSwitch/InformationSwitch';
import { ADMIN_ROUTE } from '../../../utils/consts';
import styles from './WorkWithProfile.module.css';

const WorkWithProfile = () => {
  const [profile, setProfile] = useState('Ребёнок');
  const listSwitch = ['Ребёнок', 'Родитель'];

  return (
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          className={`${styles.previewSection} d-flex justify-content-center align-items-center`}
        >
          <BackButton route={ADMIN_ROUTE} />
          <h1 className={`${styles.workGroupsTitle}`}>Редактировать профиль</h1>
        </div>
        <div
          className={`d-flex justify-content-center align-items-center column-gap-3 mb-5`}
        >
          {listSwitch.map((el) => (
            <InformationSwitch setFunc={setProfile} text={el} info={profile} />
          ))}
        </div>
        <div className={`${styles.infoBlock}`}>
          {profile === 'Ребёнок' && <ShowChildToEdit />}
          {profile === 'Родитель' && <ShowParentToEdit />}
        </div>
      </div>
    </div>
  );
};

export default WorkWithProfile;
