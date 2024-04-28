import React, { useContext, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import backgr from '../../../assets/bgProfile.png';
import ico from '../../../assets/admin/ico-childAva-195.png';
import { Context } from '../../../index';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import { Button } from 'react-bootstrap';
import { ADMIN_WORK_WITH_GROUPS_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CreateChildPage.module.css';
import { createChild } from '../../../http/userAPI';

const CreateChildPage = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const { state } = location;
  const groupId = state?.groupId;
  const navigate = useNavigate();
  const [FIO, setFIO] = useState(null);

  const clickCreateChild = async () => {
    try {
      if (!FIO) {
        alert('Введите ФИО ребёнка');
      } else {
        const fio = FIO.split(' ');
        const data = {
          surname: fio[0],
          name: fio[1],
          patronymic: fio[2],
          groupId: groupId,
          parentId: null,
        };
        const uwu = await createChild(data);
        console.log(uwu);
        navigate(ADMIN_WORK_WITH_GROUPS_ROUTE);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className={`reset-container`}>
        <ProfileHeader info={user.user} />
      </div>
      <div
        style={{ margin: '40px 40px 0' }}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center column-gap-5">
          <InputPicture ico={ico} />
          <div className="d-flex justify-content align-items-center">
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>ФИО</h2>
              <input
                className={`px-4 py-2 mt-2 ${styles.inputText}`}
                onChange={(e) => setFIO(e.target.value)}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Группа</h2>
              <p
                className={`${styles.groupText} d-flex justify-content-start align-items-center`}
              >
                {groupId}
              </p>
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
            onClick={clickCreateChild}
          >
            Сохранить
          </Button>
          <Button
            variant="danger"
            style={{ width: '396px', fontSize: 24 }}
            className="reset-btn cpecial-btn"
            onClick={() => navigate(ADMIN_WORK_WITH_GROUPS_ROUTE)}
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

export default CreateChildPage;
