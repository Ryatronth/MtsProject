import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'react-bootstrap';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ModalWindowEdit from '../../../pieces/ModalWindowEdit/ModalWindowEdit';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { deleteGroup } from '../../../../http/userAPI';
import ico from '../../../../assets/admin/ico-groupList.png';
import styles from './ProfileCardGroupToEdit.module.css';

const ProfileCardGroupToEdit = observer(
  ({ mainData, listData, setListData, groupId }) => {
    const [flag, setFlag] = useState(false);
    const [flagEdit, setFlagEdit] = useState(groupId ? true : false);

    const showModalWindow = (func) => {
      func(true);
      document.body.style.overflow = 'hidden';
    };

    const delGroup = async () => {
      try {
        await deleteGroup(mainData.id);
        setListData(listData.filter((group) => group.id !== mainData.id));
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
      }
    };

    return (
      <div
        className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
      >
        <div className={`d-flex justify-content-start align-items-center`}>
          <Image src={ico} className={styles.groupInfoImg} />
          <p className={styles.groupInfoText}>{mainData.id}</p>
        </div>
        <div className={`d-flex justify-content-start`}>
          <ManagementButton
            mainFunc={() => showModalWindow(setFlagEdit)}
            variant="success"
            text="Редактировать"
          />
          <ManagementButton
            mainFunc={() => showModalWindow(setFlag)}
            variant="danger"
            text="Удалить"
          />
        </div>
        {flag && (
          <ModalWindowDelete
            info={mainData.id}
            mainFunc={delGroup}
            setFlag={setFlag}
            img={ico}
            text="Удалить группу?"
          />
        )}
        {flagEdit && (
          <ModalWindowEdit
            mainData={mainData}
            setFlag={setFlagEdit}
            img={ico}
          />
        )}
      </div>
    );
  }
);

export default ProfileCardGroupToEdit;
