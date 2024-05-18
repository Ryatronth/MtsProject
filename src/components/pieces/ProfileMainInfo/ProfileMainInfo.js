import React, { useContext } from 'react';
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ico from '../../../assets/admin/ico-parentAva.png';
import styles from './ProfileMainInfo.module.css';

const ProfileMainInfo = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div
        className={`${styles.blockInfo} d-flex justify-center align-items-center column-gap-5`}
      >
        <Image className={`${styles.image}`} src={user.user.imageUrl || ico} />
        <div className="d-flex flex-column ">
          <h2 className={`${styles.title}`}>ФИО:</h2>
          <p className={`${styles.descr} px-4 py-2 mt-2`}>
            {user.user.surname} {user.user.name} {user.user.patronymic}
          </p>
          <h2 className={`${styles.title} mt-4`}>Номер телефона:</h2>
          <p className={`${styles.descr} px-4 py-2 mt-2`}>{user.user.phone}</p>
        </div>
      </div>
    </div>
  );
});

export default ProfileMainInfo;
