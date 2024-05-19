import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ModalWindowCreateDish from '../../ModalWindowCreateDish/ModalWindowCreateDish';
import ProfileCardDishToEdit from '../../../blocks/ProfileCard/ProfileCardDishToEdit/ProfileCardDishToEdit';
import styles from './ShowDishesToEdit.module.css';

const ShowDishesToEdit = observer(
  ({ selectedTime, dishesList, setDishesList }) => {
    const [searchValue, setSearchValue] = useState('');
    const [flagModalWindow, setFlagModalWindow] = useState(false);

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
          <ModalWindowCreateDish
            setFlag={setFlagModalWindow}
            dishesList={dishesList}
            setDishesList={setDishesList}
            selectedTime={selectedTime}
          />
        )}
      </div>
    );
  }
);

export default ShowDishesToEdit;
