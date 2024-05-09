import React, { useEffect, useState } from 'react';
import SpinnerMain from '../../../loaders/SpinnerMain';
import { getMenuId } from '../../../../http/userAPI';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './ShowMenuToEdit.module.css';
import ProfileCardMenuToEdit from '../../../blocks/ProfileCard/ProfileCardMenuToEdit/ProfileCardMenuToEdit';
import ProfileCardMenuToCreate from '../../../blocks/ProfileCard/ProfileCardMenuToCreate/ProfileCardMenuToCreate';

const ShowMenuToEdit = observer(() => {
  const [listData, setListData] = useState([]);
  const [newMenu, setNewMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuId('')
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
        <Button
          variant="success"
          className={`${styles.showListBtn}`}
          onClick={() => setNewMenu(true)}
        >
          Создать меню
        </Button>
      </div>
      <div
        style={{ height: '785px' }}
        className={`${styles.section} d-flex flex-column`}
      >
        {newMenu && (
          <ProfileCardMenuToCreate
            setModuleFlag={setNewMenu}
            listData={listData}
            setListData={setListData}
          />
        )}
        {listData.map((data) => (
          <ProfileCardMenuToEdit key={data.id} mainData={data} />
        ))}
      </div>
    </div>
  );
});

export default ShowMenuToEdit;
