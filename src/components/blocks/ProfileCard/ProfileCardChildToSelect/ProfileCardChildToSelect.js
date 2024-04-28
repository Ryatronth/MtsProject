import React from 'react';
import ico from '../../../../assets/admin/ico-childCard.png';
import { Button, Image } from 'react-bootstrap';
import styles from './ProfileCardChildToSelect.module.css';

const ProfileCardChildToSelect = ({
  mainData,
  listChild,
  setListChild,
  setModuleFlag,
}) => {
  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-start align-items-center`}
    >
      <Image style={{ marginRight: '53px' }} src={ico} />
      <p style={{ marginRight: '110px', width: '380px' }}>
        {mainData.surname} {mainData.name} {mainData.patronymic}
      </p>
      <Button
        variant="success"
        className={`reset-btn ${styles.mainBtnCancel}`}
        onClick={() => {
          setListChild([...listChild, mainData]);
          setModuleFlag(false);
          document.body.style.overflow = '';
        }}
      >
        Выбрать
      </Button>
    </div>
  );
};

export default ProfileCardChildToSelect;
