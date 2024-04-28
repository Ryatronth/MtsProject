import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import { Context } from '../../../index';
import styles from './ProfileMainInfo.module.css';

const ProfileMainInfo = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="reset-container">
      <ProfileHeader info={user.user} />
      <div
        style={{ margin: '40px 40px 0' }}
        className="d-flex justify-center align-items-center column-gap-5"
      >
        <Image
          style={{ borderRadius: '50%' }}
          src={user.user.imageUrl}
          width={195}
          height={195}
        />
        <div className="d-flex flex-column ">
          <h2 className={`${styles.mainInfoTitle}`}>ФИО:</h2>
          <p
            className={`${styles.mainInfoDescr} px-4 py-2 mt-2`}
            style={{
              maxWidth: '579px',
              minWidth: '479px',
            }}
          >
            {user.user.surname} {user.user.name} {user.user.patronymic}
          </p>
          <h2 className={`mt-4 ${styles.mainInfoTitle}`}>Номер телефона:</h2>
          <p
            className={`${styles.mainInfoDescr} px-4 py-2 mt-2`}
            style={{
              maxWidth: '230px',
              minWidth: '200px',
            }}
          >
            {user.user.phone}
          </p>
        </div>
      </div>
    </div>
  );
});

export default ProfileMainInfo;
