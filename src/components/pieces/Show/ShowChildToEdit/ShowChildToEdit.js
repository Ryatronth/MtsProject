import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SpinnerMain from '../../../loaders/SpinnerMain';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardChildToEdit from '../../../blocks/ProfileCard/ProfileCardChildToEdit/ProfileCardChildToEdit';
import { getChildren, getGroups } from '../../../../http/userAPI';
import styles from './ShowChildToEdit.module.css';
import InputDropdown from '../../../inputs/InputDropdown/InputDropdown';

const ShowChildToEdit = observer(() => {
  const [childList, setChildList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredListData = childList.filter((data) => {
    const searchMatch = `${data.surname} ${data.name} ${data.patronymic}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const groupMatch =
      selectedGroup === null || data.childGroup.id === selectedGroup;
    return searchMatch && groupMatch;
  });

  useEffect(() => {
    const qparametr = ``;
    getChildren(qparametr)
      .then((data) => {
        setChildList(data);
        getGroups()
          .then((dataG) => setGroupList(dataG))
          .catch((e) => console.log(e.response.data.message));
      })
      .catch((e) => console.log(e.response.data.message))
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
        <InputDropdown
          variant="chooseChild"
          selectedGroup={selectedGroup}
          func={setSelectedGroup}
          list={groupList}
        />
      </div>
      <div className={`${styles.section} d-flex flex-column`}>
        {filteredListData.map((data) => (
          <ProfileCardChildToEdit
            key={data.id}
            mainData={data}
            childList={childList}
            setChildList={setChildList}
          />
        ))}
      </div>
    </div>
  );
});

export default ShowChildToEdit;
