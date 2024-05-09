import React, { useEffect, useRef, useState } from 'react';
import ico from '../../../../assets/admin/ico-groupList.png';
import styles from './ProfileCardGroupToCrete.module.css';
import { Image } from 'react-bootstrap';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { createGroup } from '../../../../http/userAPI';

const ProfileCardGroupToCrete = ({ setModuleFlag, listData, setListData }) => {
  const [groupName, setGroupName] = useState('');
  const groupNameRef = useRef(null);

  const creGroup = async () => {
    try {
      if (!groupName) {
        groupNameRef.current.focus();
        alert('Введите название группы');
      } else {
        console.log(groupName);
        const data = await createGroup(groupName);
        setListData([data.object, ...listData]);
        console.log(data.object);
        setModuleFlag(false);
      }
    } catch (e) {
      setGroupName('');
      groupNameRef.current.focus();
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    groupNameRef.current.focus();
  }, []);

  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
    >
      <div className={`d-flex justify-content-start align-items-center`}>
        <Image src={ico} className={styles.groupInfoImg} />
        <input
          ref={groupNameRef}
          className={`${styles.groupInfoInput}`}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Введите название группы"
        ></input>
      </div>
      <div className={`d-flex justify-content-start`}>
        <ManagementButton
          mainFunc={creGroup}
          // secondFunc={setModuleFlag}
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
