import React, { useState } from 'react';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardChildToSelect from '../../../blocks/ProfileCard/ProfileCardChildToSelect/ProfileCardChildToSelect';
import InputDropdown from '../../../inputs/InputDropdown/InputDropdown';
import styles from './ShowChildToSelect.module.css';

const ShowChildToSelect = ({
  childData,
  setAllChild,
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
          customWidth="450px"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <InputDropdown
          func={setSelectedGroup}
          list={groupData}
          variant="chooseChild"
          selectedGroup={selectedGroup}
        />
      </div>
      <div className={`${styles.section} d-flex flex-column`}>
        {filteredListData.map((data) => (
          <ProfileCardChildToSelect
            key={data.id}
            mainData={data}
            allChild={childData}
            setAllChild={setAllChild}
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
