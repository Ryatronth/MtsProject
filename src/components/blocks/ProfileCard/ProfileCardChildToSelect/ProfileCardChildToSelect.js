import React from 'react';
import { Image } from 'react-bootstrap';
import ico from '../../../../assets/admin/ico-childCard.png';
import styles from './ProfileCardChildToSelect.module.css';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';

const ProfileCardChildToSelect = ({
  allChild,
  setAllChild,
  mainData,
  listChild,
  setListChild,
  setModuleFlag,
}) => {
  const select = () => {
    let newList = allChild.filter((child) => child.id !== mainData.id);
    setAllChild([...newList]);
    setListChild([...listChild, mainData]);
    setModuleFlag(false);
    document.body.style.overflow = '';
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
        text="Выбрать"
        variant="successSelectOnCard"
        mainFunc={select}
      />
    </div>
  );
};

export default ProfileCardChildToSelect;
