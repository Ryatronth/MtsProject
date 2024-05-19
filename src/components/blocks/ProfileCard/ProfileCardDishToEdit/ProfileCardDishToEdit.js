import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ModalWindowDelete from '../../../pieces/ModalWindowDelete/ModalWindowDelete';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import ModalWindowDish from '../../../pieces/ModalWindowDish/ModalWindowDish';
import { deleteDish, updateDish } from '../../../../http/userAPI';
import styles from './ProfileCardDishToEdit.module.css';

const ProfileCardDishToEdit = observer(
  ({ mainData, dishesList, setDishesList }) => {
    const [flag, setFlag] = useState(false);
    const [flagEdit, setFlagEdit] = useState(false);
    const [name, setName] = useState(mainData.name);
    const [description, setDescription] = useState(mainData.composition);
    const [price, setPrice] = useState(mainData.price);
    const [category, setCategory] = useState(mainData.category);
    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState(mainData.imageUrl);

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

    const clickUpdateDish = async () => {
      if (!price) {
        alert('Введите цену блюда');
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('composition', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        await updateDish(mainData.id, formData)
          .then((data) => {
            const indexToUpdate = dishesList.findIndex(
              (dish) => dish.id === mainData.id
            );
            let updateDishesList = [...dishesList];
            updateDishesList[indexToUpdate] = data.object;
            setDishesList([...updateDishesList]);
            setFlagEdit(false);
            document.body.style.overflow = '';
            alert(data.message);
          })
          .catch((e) => alert(e.response.data.message));
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
          <ModalWindowDish
            ico={mainData.imageUrl}
            setFlag={setFlagEdit}
            setImage={setImage}
            setImageSrc={setImageSrc}
            imageSrc={mainData.imageUrl}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            mianFunc={clickUpdateDish}
          />
        )}
      </div>
    );
  }
);

export default ProfileCardDishToEdit;
