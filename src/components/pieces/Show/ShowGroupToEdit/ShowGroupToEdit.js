import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { getGroups } from '../../../../http/userAPI';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import { Button } from 'react-bootstrap';
import styles from './ShowGroupToEdit.module.css';
import { observer } from 'mobx-react-lite';
import ProfileCardGroupToEdit from '../../../blocks/ProfileCard/ProfileCardGroupToEdit/ProfileCardGroupToEdit';
import ProfileCardGroupToCrete from '../../../blocks/ProfileCard/ProfileCardGroupToCrete/ProfileCardGroupToCrete';

const ShowGroupToEdit = observer(() => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredListData = listData.filter((data) => {
    console.log(data);
    const searchMatch = `${data.id}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return searchMatch;
  });

  useEffect(() => {
    getGroups()
      .then((data) => {
        if (data) {
          console.log(data);
          setListData(data);
          return data;
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  return (
    <div className={`${styles.mainInfo}`}>
      <div className="d-flex align-items-center column-gap-5 mb-2">
        <InputSearch
          customWidth="638px"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Button
          variant="success"
          className={`${styles.showListBtn}`}
          onClick={() => setNewGroup(true)}
        >
          Создать группу
        </Button>
      </div>
      <div
        style={{ height: '939px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {newGroup && (
          <ProfileCardGroupToCrete
            setModuleFlag={setNewGroup}
            listData={listData}
            setListData={setListData}
          />
        )}
        {filteredListData.map((data) => (
          <ProfileCardGroupToEdit
            key={data.id}
            mainData={data}
            listData={listData}
            setListData={setListData}
          />
        ))}
      </div>
    </div>
  );
});

export default ShowGroupToEdit;
