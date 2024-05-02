import React, { useState } from 'react';
import { deleteDish } from '../../../../http/userAPI';
import { observer } from 'mobx-react-lite';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import styles from './ProfileCardDishToEdit.module.css';
import ModalWindowEditDish from '../../../pieces/ModalWindowEditDish/ModalWindowEditDish';

const ProfileCardDishToEdit = observer(
  ({ mainData, dishesList, setDishesList }) => {
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

    const clickDeleteDish = async () => {
      try {
        const data = await deleteDish(mainData.id);
        setDishesList(dishesList.filter((dish) => dish.id !== mainData.id));
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
          <p className={styles.groupInfoText}>{mainData.name}</p>
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
            info={mainData.name}
            mainFunc={clickDeleteDish}
            setFlag={setFlag}
            text="Удалить блюдо?"
          />
        )}
        {flagEdit && (
          <ModalWindowEditDish
            dishData={mainData}
            setFlag={setFlagEdit}
            dishesList={dishesList}
            setDishesList={setDishesList}
          />
        )}
      </div>
    );
  }
);

export default ProfileCardDishToEdit;
