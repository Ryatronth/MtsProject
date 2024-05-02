import React from 'react';
import ico from '../../../../assets/admin/ico-childCard.png';
import { Button, Image } from 'react-bootstrap';
import styles from './ProfileCardChildToSelect.module.css';
import { all } from 'axios';

const ProfileCardChildToSelect = ({
  allChild,
  setAllChild,
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
          let newList = allChild.filter((child) => child.id !== mainData.id);
          setAllChild([...newList]);
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
