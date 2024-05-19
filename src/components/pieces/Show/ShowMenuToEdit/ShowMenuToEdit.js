import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import SpinnerMain from '../../../loaders/SpinnerMain';
import ProfileCardMenuToEdit from '../../../blocks/ProfileCard/ProfileCardMenuToEdit/ProfileCardMenuToEdit';
import ProfileCardMenuToCreate from '../../../blocks/ProfileCard/ProfileCardMenuToCreate/ProfileCardMenuToCreate';
import { getMenuId } from '../../../../http/userAPI';
import styles from './ShowMenuToEdit.module.css';

const ShowMenuToEdit = observer(() => {
  const [listData, setListData] = useState([]);
  const [newMenu, setNewMenu] = useState(false);
  const [newMenuDate, setNewMenuDate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuId('')
      .then((data) => {
        setListData(data);
        setNewMenuDate(
          new Date(
            new Date(data[data.length - 1]?.endDate).getTime() + 86400000 ||
              new Date(new Date().getTime() + 86400000)
          )
        );
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
      <div className={`${styles.section} d-flex flex-column`}>
        {newMenu && (
          <ProfileCardMenuToCreate
            newMenuDate={newMenuDate}
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
