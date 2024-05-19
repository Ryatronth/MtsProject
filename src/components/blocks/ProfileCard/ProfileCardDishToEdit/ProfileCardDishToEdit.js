import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import ModalWindowEditDish from '../../../pieces/ModalWindowEditDish/ModalWindowEditDish';
import { deleteDish } from '../../../../http/userAPI';
import styles from './ProfileCardDishToEdit.module.css';

const ProfileCardDishToEdit = observer(
  ({ mainData, dishesList, setDishesList }) => {
    const [flag, setFlag] = useState(false);
    const [flagEdit, setFlagEdit] = useState(false);

    const showModalWindow = (func) => {
      func(true);
      document.body.style.overflow = 'hidden';
    };

    const clickDeleteDish = async () => {
      try {
        await deleteDish(mainData.id);
        setDishesList(dishesList.filter((dish) => dish.id !== mainData.id));
      } catch (e) {
        alert(e.response.data.message);
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
