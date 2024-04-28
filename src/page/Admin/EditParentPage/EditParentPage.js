import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import ico from '../../../assets/admin/ico-parentAva.png';
import backgr from '../../../assets/bgProfile.png';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import { Button, Dropdown } from 'react-bootstrap';
import { ADMIN_WORK_WITH_PROFILE_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { getGroups } from '../../../http/userAPI';
import styles from './EditParentPage.module.css';

const EditParentPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [FIO, setFIO] = useState('');
  const [phone, setPhone] = useState('');
  const location = useLocation();
  const { state } = location;
  const parentData = state?.parentData;
  const [groupList, setGroupList] = useState([]);

  const saveChanges = () => {
    console.log(1234); // допилить
  };

  useEffect(() => {
    setFIO(`${parentData.surname} ${parentData.name} ${parentData.patronymic}`);
    setPhone(parentData.phone);
  }, []);

  return (
    <>
      <div className={`reset-container`}>
        <ProfileHeader info={user.user} />
      </div>
      <div
        style={{ margin: '40px 40px 0', padding: '0 80px 0 68px' }}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center column-gap-5">
          <InputPicture ico={parentData.imageUrl || ico} />
          <div className="d-flex justify-content align-items-center column-gap-5">
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>ФИО:</h2>
              <input
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '420px',
                  minWidth: '350px',
                }}
                value={FIO}
                onChange={(e) => setFIO(e.target.value)}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Номер телефона:</h2>
              <input
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '230px',
                  minWidth: '200px',
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>Логин:</h2>
              <input
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Пароль:</h2>
              <input
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
              ></input>
            </div>
          </div>
        </div>
        <div
          style={{ rowGap: '41px' }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Button
            variant="success"
            style={{ width: '396px', fontSize: 24 }}
            className="reset-btn"
            onClick={saveChanges}
          >
            Сохранить
          </Button>
          <Button
            variant="danger"
            style={{ width: '396px', fontSize: 24 }}
            className="reset-btn cpecial-btn"
            onClick={() => navigate(ADMIN_WORK_WITH_PROFILE_ROUTE)}
          >
            Отмена
          </Button>
        </div>
      </div>
      <div
        className={`${styles.adminBody} mt-5 admin-body`}
        style={{
          padding: '0 67px',
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div
          className={`${styles.admiContainer} d-flex flex-column justify-content-center align-items-center `}
        ></div>
      </div>
    </>
  );
});

export default EditParentPage;
