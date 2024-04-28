import React from 'react';
import ico from '../../../../assets/admin/ico-groupList.png';
import styles from './ProfileCardGroupToCrete.module.css';
import { Image } from 'react-bootstrap';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { createGroup } from '../../../../http/userAPI';

const ProfileCardGroupToCrete = ({ setModuleFlag, listData, setListData }) => {
  const creGroup = async () => {
    try {
      const name = document.querySelector('#inputToCreateGroup').value;
      if (name) {
        const data = await createGroup(name);
        setListData([data.object, ...listData]);
        console.log(data.object);
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
    >
      <div className={`d-flex justify-content-start align-items-center`}>
        <Image src={ico} className={styles.groupInfoImg} />
        <input
          id="inputToCreateGroup"
          placeholder="Введите название группы"
          className={`${styles.groupInfoInput}`}
        ></input>
      </div>
      <div className={`d-flex justify-content-start`}>
        <ManagementButton
          mainFunc={creGroup}
          secondFunc={setModuleFlag}
          variant="success"
          text="Сохранить"
        />
        <ManagementButton
          secondFunc={setModuleFlag}
          variant="danger"
          text="Отменить"
        />
      </div>
    </div>
  );
};

export default ProfileCardGroupToCrete;
