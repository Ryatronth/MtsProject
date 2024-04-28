import React from 'react';
import ico from '../../../../assets/admin/ico-childCard.png';
import { Button, Image } from 'react-bootstrap';
import styles from './ProfileCardChildToDelete.module.css';
import { deleteChild } from '../../../../http/userAPI';

const ProfileCardChildToDelete = ({ mainData, listData, setListData }) => {
  const delChild = async () => {
    try {
      const data = await deleteChild(mainData.id);
      setListData(listData.filter((child) => child.id !== mainData.id));
      console.log(data);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  console.log(mainData);
  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-start align-items-center`}
    >
      <Image style={{ marginRight: '53px' }} src={ico} />
      <p style={{ marginRight: '110px', width: '380px' }}>
        {mainData.surname} {mainData.name} {mainData.patronymic}
      </p>
      <Button
        variant="danger"
        className={`reset-btn ${styles.mainBtnCancel}`}
        onClick={delChild}
      >
        Удалить
      </Button>
    </div>
  );
};

export default ProfileCardChildToDelete;
