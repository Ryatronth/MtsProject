import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { ADMIN_EDIT_CHILD_PROFILE_ROUTE } from '../../../../utils/consts';
import { deleteChild } from '../../../../http/userAPI';
import ico from '../../../../assets/admin/ico-childCard-79.png';
import styles from './ProfileCardChildToEdit.module.css';

const ProfileCardChildToEdit = observer(
  ({ mainData, childList, setChildList }) => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    const showModalWindowDelete = () => {
      setFlag(true);
      document.body.style.overflow = 'hidden';
    };

    const handleEditChild = () => {
      navigate(ADMIN_EDIT_CHILD_PROFILE_ROUTE, {
        state: { childData: mainData },
      });
    };

    const delChild = async () => {
      try {
        await deleteChild(mainData.id);
        setChildList(childList.filter((child) => child.id !== mainData.id));
      } catch (e) {
        alert(e.response.data.message);
      }
    };

    return (
      <div
        className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
      >
        <div className={`d-flex justify-content-start align-items-center`}>
          <Image src={ico} className={styles.groupInfoImg} />
          <p className={styles.groupInfoText}>
            {mainData.surname} {mainData.name} {mainData.patronymic}
          </p>
        </div>
        <div className={`d-flex justify-content-start`}>
          <ManagementButton
            mainFunc={handleEditChild}
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
            info={`${mainData.surname} ${mainData.name} ${mainData.patronymic}`}
            mainFunc={delChild}
            setFlag={setFlag}
            img={ico}
            text="Удалить профиль?"
          />
        )}
      </div>
    );
  }
);

export default ProfileCardChildToEdit;
