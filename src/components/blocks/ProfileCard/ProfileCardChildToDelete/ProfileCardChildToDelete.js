import React from 'react';
import { Image } from 'react-bootstrap';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { deleteChild } from '../../../../http/userAPI';
import ico from '../../../../assets/admin/ico-childCard.png';
import styles from './ProfileCardChildToDelete.module.css';

const ProfileCardChildToDelete = ({ mainData, listData, setListData }) => {
  const delChild = async () => {
    try {
      await deleteChild(mainData.id);
      setListData(listData.filter((child) => child.id !== mainData.id));
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-start align-items-center`}
    >
      <Image src={ico} className={`${styles.image}`} />
      <p className={`${styles.descr}`}>
        {mainData.surname} {mainData.name} {mainData.patronymic}
      </p>
      <ManagementButton
        text="Удалить"
        variant="dangerDeleteOnCard"
        mainFunc={delChild}
      />
    </div>
  );
};

export default ProfileCardChildToDelete;
