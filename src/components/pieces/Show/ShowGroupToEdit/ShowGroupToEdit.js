import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import SpinnerMain from '../../../loaders/SpinnerMain';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardGroupToEdit from '../../../blocks/ProfileCard/ProfileCardGroupToEdit/ProfileCardGroupToEdit';
import ProfileCardGroupToCrete from '../../../blocks/ProfileCard/ProfileCardGroupToCrete/ProfileCardGroupToCrete';
import { getGroups } from '../../../../http/userAPI';
import styles from './ShowGroupToEdit.module.css';

const ShowGroupToEdit = observer(({ groupId }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredListData = listData.filter((data) => {
    const searchMatch = `${data.id}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return searchMatch;
  });

  useEffect(() => {
    getGroups()
      .then((data) => {
        setListData(data);
      })
      .catch((e) => console.log(e))
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
    <div className={`${styles.container}`}>
      <div className="d-flex align-items-center column-gap-5 mb-2">
        <InputSearch customWidth="638px" setSearchValue={setSearchValue} />
        <Button
          variant="success"
          className={`${styles.createGroupBtn}`}
          onClick={() => setNewGroup(true)}
        >
          Создать группу
        </Button>
      </div>
      <div className={`${styles.section} d-flex flex-column`}>
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
            groupId={groupId === data.id ? data.id : undefined}
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
