import React, { useState } from 'react';
import ico from '../../../../assets/admin/ico-groupList.png';
import { Image } from 'react-bootstrap';
import { deleteGroup } from '../../../../http/userAPI';
import { observer } from 'mobx-react-lite';
import styles from './ProfileCardGroupToEdit.module.css';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ModalWindowEdit from '../../../pieces/ModalWindowEdit/ModalWindowEdit';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';

const ProfileCardGroupToEdit = observer(
  ({ mainData, listData, setListData }) => {
    const [flag, setFlag] = useState(false);
    const [flagEdit, setFlagEdit] = useState(false);

    const showModalWindowDelete = () => {
      setFlag(true);
      document.body.style.overflow = 'hidden';
    };

    const showModalWindowEdit = () => {
      setFlagEdit(true);
      document.body.style.overflow = 'hidden';
    };

    const delGroup = async () => {
      try {
        const data = await deleteGroup(mainData.id);
        setListData(listData.filter((group) => group.id !== mainData.id));
        console.log(data);
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
          <p className={styles.groupInfoText}>{mainData.id}</p>
        </div>
        <div className={`d-flex justify-content-start`}>
          <ManagementButton
            mainFunc={showModalWindowEdit}
            variant="success"
            text="Редактировать"
          />
          <ManagementButton
            mainFunc={showModalWindowDelete}
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
