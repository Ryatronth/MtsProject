import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ModalWindowCreateDish from '../../ModalWindowCreateDish/ModalWindowCreateDish';
import { getDishes } from '../../../../http/userAPI';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './ShowDishesToEdit.module.css';
import ProfileCardDishToEdit from '../../../blocks/ProfileCard/ProfileCardDishToEdit/ProfileCardDishToEdit';

const ShowDishesToEdit = observer(({ selectedTime }) => {
  const [dishesList, setDishesList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [flagModalWindow, setFlagModalWindow] = useState(false);

  const filteredListData = dishesList.filter((data) => {
    const searchMatch = `${data.name}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const groupMatch = data.category === selectedTime;
    return searchMatch && groupMatch;
  });

  useEffect(() => {
    setTimeout(() => {
      getDishes()
        .then((data) => setDishesList(data))
        .finally(() => setLoading(false));
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  console.log(filteredListData);

  return (
    <div style={{ marginBottom: '134px' }} className={`${styles.mainInfo}`}>
      <div className="d-flex align-items-center column-gap-5 mb-3">
        <InputSearch
          customWidth="638px"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Button
          variant="success"
          className={`${styles.showListBtn}`}
          onClick={() => setFlagModalWindow(true)}
        >
          Создать блюдо
        </Button>
      </div>
      <div
        style={{ maxHeight: '1057px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {filteredListData.map((data) => (
          <ProfileCardDishToEdit
            key={data.id}
            mainData={data}
            dishesList={dishesList}
            setDishesList={setDishesList}
          />
        ))}
        {filteredListData.map((data) => (
          <ProfileCardDishToEdit
            key={data.id}
            mainData={data}
            dishesList={dishesList}
            setDishesList={setDishesList}
          />
        ))}
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
});

export default ShowDishesToEdit;
