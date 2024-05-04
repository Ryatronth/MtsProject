import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { getGroups, getParents } from '../../../../http/userAPI';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import { Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import ProfileCardChildToEdit from '../../../blocks/ProfileCard/ProfileCardChildToEdit/ProfileCardChildToEdit';
import styles from './ShowParentToEdit.module.css';
import ProfileCardParentToEdit from '../../../blocks/ProfileCard/ProfileCardParentToEdit/ProfileCardParentToEdit';

const ShowParentToEdit = observer(() => {
  const [parentList, setParentList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredListData = parentList.filter((data) => {
    const searchMatch = `${data.surname} ${data.name} ${data.patronymic}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return searchMatch;
  });

  useEffect(() => {
    setTimeout(() => {
      const qparametr = ``;
      getParents(qparametr)
        .then((data) => {
          if (data) {
            console.log(data);
            setParentList(data);
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
      </div>
      <div
        style={{ height: '1015px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {filteredListData.map((data) => (
          <ProfileCardParentToEdit
            key={data.id}
            mainData={data}
            parentList={parentList}
            setParentList={setParentList}
          />
        ))}
      </div>
    </div>
  );
});

export default ShowParentToEdit;
