import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import styles from './ShowChildByGroup.module.css';
import { getChildren } from '../../../../http/userAPI';
import InputSearch from '../../../inputs/InputSearch/InputSearch';
import ProfileCardChildToDelete from '../../../blocks/ProfileCard/ProfileCardChildToDelete/ProfileCardChildToDelete';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_CREATE_CHILD_ROUTE } from '../../../../utils/consts';

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
    navigate(ADMIN_CREATE_CHILD_ROUTE, {
      state: { groupId: groupId },
    });
  };

  useEffect(() => {
    const qparametr = `?groupId=${groupId}`;
    getChildren(qparametr)
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
          customWidth="432px"
          customHeight="35px"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Button
          style={{
            fontSize: '14px',
            padding: '3px 40px',
            width: '309px',
            height: '32px',
          }}
          className={`reset-btn ${styles.mainBtnSuccess}`}
          variant="success"
          onClick={() => {
            document.body.style.overflow = '';
            handleCreateChild();
          }}
        >
          Создать ребёнка
        </Button>
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
