import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { getChildren, getGroups } from '../../../../http/userAPI';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import { Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './ShowChildToEdit.module.css';
import ProfileCardChildToEdit from '../../../blocks/ProfileCard/ProfileCardChildToEdit/ProfileCardChildToEdit';

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
    setTimeout(() => {
      getChildren()
        .then((data) => {
          if (data) {
            console.log(data);
            setChildList(data);
            getGroups().then((dataG) => setGroupList(dataG));
            return data;
          }
        })
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

  return (
    <div className={`${styles.mainInfo}`}>
      <div className="d-flex align-items-center column-gap-5 mb-2">
        <InputSearch
          customWidth="638px"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              className="children-card__dropdown-groups"
            >
              {selectedGroup || 'Выберите группу'}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '263px' }}>
              <Dropdown.Item onClick={() => setSelectedGroup(null)}>
                Выберите группу
              </Dropdown.Item>
              {!!groupList.length &&
                groupList.map(({ id }) => (
                  <Dropdown.Item key={id} onClick={() => setSelectedGroup(id)}>
                    {id}
                  </Dropdown.Item>
                ))}
              {!groupList.length && (
                <Dropdown.Item>Групп пока нет!</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        style={{ height: '1015px' }}
        className={`${styles.section} d-flex flex-column`}
      >
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
