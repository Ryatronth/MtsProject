import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardDishToEdit from '../../../blocks/ProfileCard/ProfileCardDishToEdit/ProfileCardDishToEdit';
import ModalWindowDish from '../../ModalWindowDish/ModalWindowDish';
import { createDish } from '../../../../http/userAPI';
import ico from '../../../../assets/worker/ico-mainDish.png';
import styles from './ShowDishesToEdit.module.css';

const ShowDishesToEdit = observer(
  ({ selectedTime, dishesList, setDishesList }) => {
    const [searchValue, setSearchValue] = useState('');
    const [flagModalWindow, setFlagModalWindow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(selectedTime);
    const [image, setImage] = useState(null);

    const filteredListData = dishesList.filter((data) => {
      const searchMatch = `${data.name}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const groupMatch = data.category === selectedTime;
      return searchMatch && groupMatch;
    });

    const showModalWindowToCreate = () => {
      setFlagModalWindow(true);
      document.body.style.overflow = 'hidden';
    };

    const clickCreateDish = async () => {
      if (!price) {
        alert('Введите цену блюда');
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('composition', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        await createDish(formData)
          .then((data) => {
            setFlagModalWindow(false);
            alert(data.message);
            document.body.style.overflow = '';
            setDishesList([...dishesList, data.object]);
          })
          .catch((e) => alert(e.response.data.message));
      }
    };

    return (
      <div className={`${styles.mainInfo}`}>
        <div className="d-flex align-items-center column-gap-5 mb-3">
          <InputSearch
            customWidth="638px"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Button
            variant="success"
            className={`${styles.showListBtn}`}
            onClick={showModalWindowToCreate}
          >
            Создать блюдо
          </Button>
        </div>
        <div className={`${styles.section} d-flex flex-column`}>
          {filteredListData.map((data) => (
            <ProfileCardDishToEdit
              key={data.id}
              mainData={data}
              dishesList={dishesList}
              setDishesList={setDishesList}
            />
          ))}
        </div>
        {flagModalWindow && (
          <ModalWindowDish
            ico={ico}
            setFlag={setFlagModalWindow}
            setImage={setImage}
            imageSrc={ico}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            mianFunc={clickCreateDish}
          />
        )}
      </div>
    );
  }
);

export default ShowDishesToEdit;
