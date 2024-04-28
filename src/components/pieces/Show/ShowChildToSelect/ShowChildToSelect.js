import React, { useState } from 'react';
import styles from './ShowChildToSelect.module.css';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import { Dropdown } from 'react-bootstrap';
import ProfileCardChildToSelect from '../../../blocks/ProfileCard/ProfileCardChildToSelect/ProfileCardChildToSelect';

const ShowChildToSelect = ({
  childData,
  groupData,
  listChild,
  setListChild,
  setModuleFlag,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const filteredListData = childData.filter((data) => {
    const searchMatch = `${data.surname} ${data.name} ${data.patronymic}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const groupMatch =
      selectedGroup === null || data.childGroup.id === selectedGroup;
    return searchMatch && groupMatch;
  });

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
              {!!groupData.length &&
                groupData.map(({ id }) => (
                  <Dropdown.Item key={id} onClick={() => setSelectedGroup(id)}>
                    {id}
                  </Dropdown.Item>
                ))}
              {!groupData.length && (
                <Dropdown.Item>Групп пока нет!</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        style={{ height: '407px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {filteredListData.map((data) => (
          <ProfileCardChildToSelect
            key={data.id}
            mainData={data}
            listChild={listChild}
            setListChild={setListChild}
            setModuleFlag={setModuleFlag}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowChildToSelect;
