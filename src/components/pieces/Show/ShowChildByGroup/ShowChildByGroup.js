import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerMain from '../../../loaders/SpinnerMain';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardChildToDelete from '../../../blocks/ProfileCard/ProfileCardChildToDelete/ProfileCardChildToDelete';
import { ADMIN_CREATE_CHILD_ROUTE } from '../../../../utils/consts';
import { getChildren } from '../../../../http/userAPI';
import styles from './ShowChildByGroup.module.css';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';

const ShowChildByGroup = ({ groupId }) => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const filteredListData = listData.filter((data) => {
    const searchMatch = `${data.surname} ${data.name} ${data.patronymic}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const groupMatch = data.childGroup.id === groupId;
    return searchMatch && groupMatch;
  });

  const handleCreateChild = () => {
    document.body.style.overflow = '';
    navigate(ADMIN_CREATE_CHILD_ROUTE, {
      state: { groupId: groupId },
    });
  };

  useEffect(() => {
    const qparametr = `?groupId=${groupId}`;
    getChildren(qparametr)
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
    <div className={`${styles.mainInfo}`}>
      <div className="d-flex align-items-center column-gap-5 mb-2">
        <InputSearch
          customWidth="432px"
          customHeight="35px"
          setSearchValue={setSearchValue}
        />
        <ManagementButton
          text="Создать ребёнка"
          variant="successCreate"
          mainFunc={handleCreateChild}
        />
      </div>
      <div
        style={{ height: '430px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {filteredListData.map((data) => (
          <ProfileCardChildToDelete
            key={data.id}
            mainData={data}
            listData={listData}
            setListData={setListData}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowChildByGroup;
