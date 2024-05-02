import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import ico from '../../../assets/admin/ico-parentAva.png';
import backgr from '../../../assets/bgProfile.png';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import icoAdd from '../../../assets/admin/ico-addChildBtn.png';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { ADMIN_WORK_WITH_PROFILE_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { getChildren, getGroups, updateParent } from '../../../http/userAPI';
import styles from './EditParentPage.module.css';
import ProfileCardChildToShow from '../../../components/blocks/ProfileCard/ProfileCardChildToShow/ProfileCardChildToShow';
import ModalWindowAdd from '../../../components/pieces/ModalWindowAdd/ModalWindowAdd';

const EditParentPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [FIO, setFIO] = useState('');
  const [phone, setPhone] = useState('');
  const [childList, setChildList] = useState([]);
  const [allChild, setAllChild] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const [flagModalWindow, setFlagModalWindow] = useState(false);
  const location = useLocation();
  const { state } = location;
  const parentData = state?.parentData;

  const saveChanges = async () => {
    try {
      if (!FIO) {
        alert('Введите ФИО ребёнка');
      } else {
        const fio = FIO.split(' ');
        const data = {
          surname: fio[0],
          name: fio[1],
          patronymic: fio[2],
          phone: phone,
          role: 'PARENT',
          parentId: parentData.id,
          imageUrl: null,
          username: document.querySelector('#username').value
            ? document.querySelector('#username').value
            : null,
          password: document.querySelector('#password').value
            ? document.querySelector('#password').value
            : null,
          children: childList.map((child) => child.id),
        };
        const uwu = await updateParent(parentData.id, data);
        console.log(uwu);
        navigate(ADMIN_WORK_WITH_PROFILE_ROUTE);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setFIO(`${parentData.surname} ${parentData.name} ${parentData.patronymic}`);
    setPhone(parentData.phone);
    let qparametr = [
      {
        key: 'parent',
        value: parentData.id,
        operation: 'EQUAL',
      },
    ];
    getChildren(qparametr).then((data) => {
      setChildList(data);
      console.log(data);
    });
    qparametr = [
      {
        key: 'parent',
        value: null,
        operation: 'EQUAL',
      },
    ];
    getChildren(qparametr).then((data) => {
      setAllChild(data);
    });
    getGroups().then((dataG) => setAllGroup(dataG));
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
                id="username"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Пароль:</h2>
              <input
                id="password"
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
        <h2 className={`${styles.childTitle}`}>Дети</h2>
        <div
          style={{ width: '100%', gap: '60px', flexWrap: 'wrap' }}
          className={`d-flex justify-content-start align-items-center`}
        >
          {childList.map((data) => (
            <ProfileCardChildToShow
              id={data.id}
              key={data.id}
              allChild={allChild}
              setAllChild={setAllChild}
              data={data}
              listChild={childList}
              setListChild={setChildList}
            />
          ))}

          <label
            htmlFor="BTN"
            className={`${styles.btnContainer} d-flex justify-content-center align-items-center`}
          >
            <Button
              id="BTN"
              variant="outline-success"
              className={`reset-btn ${styles.addBtn} d-flex justify-content-center align-items-center`}
              onClick={() => {
                setFlagModalWindow(true);
                document.body.style.overflow = 'hidden';
              }}
            >
              <Image src={icoAdd} />
            </Button>
          </label>
        </div>
        {flagModalWindow && (
          <ModalWindowAdd
            childData={allChild}
            setAllChild={setAllChild}
            groupData={allGroup}
            listChild={childList}
            setListChild={setChildList}
            setModuleFlag={setFlagModalWindow}
          />
        )}
      </div>
    </>
  );
});

export default EditParentPage;
