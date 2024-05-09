import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import ico from '../../../assets/admin/ico-childAva-195.png';
import backgr from '../../../assets/bgProfile.png';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import styles from './EditChildPage.module.css';
import { Button, Dropdown } from 'react-bootstrap';
import { ADMIN_WORK_WITH_PROFILE_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { getGroups, updateChild } from '../../../http/userAPI';

const EditChildPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const childData = state?.childData;
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [fullName, setFullName] = useState('');
  const fullNameInputRef = useRef(null);

  const formatFullName = (FIO) => {
    const words = FIO.split(' ').slice(0, 3);
    setFullName(
      words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const saveChanges = async () => {
    try {
      const fio = fullName.split(' ');
      if (fio.length < 3 || fio[2] === '') {
        fullNameInputRef.current.focus();
        alert('Введите полное ФИО ребёнка');
      } else {
        const data = {
          surname: fio[0],
          name: fio[1],
          patronymic: fio[2],
          groupId: selectedGroup,
          parentId: null,
          imageUrl: null,
        };
        const uwu = await updateChild(childData.id, data);
        console.log(uwu);
        navigate(ADMIN_WORK_WITH_PROFILE_ROUTE);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getGroups().then((data) => {
      setGroupList(data);
      console.log(groupList);
      setFullName(
        `${childData.surname} ${childData.name} ${childData.patronymic}`
      );
      setSelectedGroup(childData.childGroup.id);
    });
    fullNameInputRef.current.focus();
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
          <InputPicture ico={childData.imageUrl || ico} />
          <div className="d-flex justify-content align-items-center">
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>ФИО</h2>
              <input
                ref={fullNameInputRef}
                className={`px-4 py-2 mt-2 ${styles.inputText}`}
                value={fullName}
                onChange={(e) => formatFullName(e.target.value)}
                placeholder="Введите ФИО"
              ></input>
              <h2 className={`${styles.inputTitle}`}>Группа</h2>
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    className="children-card__dropdown-groups"
                  >
                    {selectedGroup || 'Выберите группу'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '263px' }}>
                    <Dropdown.Item
                      onClick={() => setSelectedGroup(childData.childGroup.id)}
                    >
                      Не изменять группу
                    </Dropdown.Item>
                    {!!groupList.length &&
                      groupList.map(({ id }) => (
                        <Dropdown.Item
                          key={id}
                          onClick={() => setSelectedGroup(id)}
                        >
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

export default EditChildPage;
