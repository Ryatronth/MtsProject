import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const location = useLocation();
  const { state } = location;
  const parentData = state?.parentData;
  // data
  const [childList, setChildList] = useState([]);
  const [allChild, setAllChild] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  // input`s
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // ссылки на input`s
  const fullNameInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const loginInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  // специфические state`s
  const [flagModalWindow, setFlagModalWindow] = useState(false);

  const formatFullName = (FIO) => {
    const words = FIO.split(' ').slice(0, 3);
    setFullName(
      words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const formatPhoneNumber = (inputStr) => {
    let input = inputStr.replace(/\D/g, '');
    const formats = [
      { length: 1, format: '+7' },
      { length: 4, format: '+7 ($2' },
      { length: 7, format: '+7 ($2) $3' },
      { length: 9, format: '+7 ($2) $3-$4' },
      { length: 11, format: '+7 ($2) $3-$4-$5' },
    ];

    for (const format of formats) {
      if (
        input.length <= format.length ||
        (input.length > 11 && format.length === 11)
      ) {
        const formattedInput = input.replace(
          /^(\d{1,1})(\d{1,3})(\d{0,3})(\d{0,2})(\d{0,2})(\d*)/,
          format.format
        );
        if (formattedInput !== input) {
          input = formattedInput;
          break;
        }
      }
    }
    setPhone(input);
  };

  const saveChanges = async () => {
    const fioList = fullName.split(' ');
    let phoneNumber = `+${phone.replace(/\D/g, '')}`;
    const data = {
      surname: fioList[0],
      name: fioList[1],
      patronymic: fioList[2],
      phone: phoneNumber,
      role: 'PARENT',
      parentId: parentData.id,
      imageUrl: null,
      username: login !== '' ? login : null,
      password: password !== '' ? password : null,
      children: childList.map((child) => child.id),
    };
    await updateParent(parentData.id, data)
      .then((data) => {
        console.log(data);
        alert(data.message);
        navigate(ADMIN_WORK_WITH_PROFILE_ROUTE);
      })
      .catch((e) => alert(e.response.data.message));
  };

  useEffect(() => {
    setFullName(
      `${parentData.surname} ${parentData.name} ${parentData.patronymic}`
    );
    setPhone(parentData.phone);
    formatPhoneNumber(parentData.phone);
    let qparametr = `?parentId=${parentData.id}`;
    getChildren(qparametr).then((data) => {
      setChildList(data);
      console.log(data);
    });
    qparametr = `?unlinked=uwu`;
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
                ref={fullNameInputRef}
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '420px',
                  minWidth: '350px',
                }}
                value={fullName}
                onChange={(e) => formatFullName(e.target.value)}
                placeholder="Введите ФИО"
              ></input>
              <h2 className={`${styles.inputTitle}`}>Номер телефона:</h2>
              <input
                ref={phoneNumberInputRef}
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '230px',
                  minWidth: '200px',
                }}
                value={phone}
                onChange={(e) => formatPhoneNumber(e.target.value)}
                placeholder="Введите телефон"
              ></input>
            </div>
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>Логин:</h2>
              <input
                ref={loginInputRef}
                id="username"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Отставьте поле пустым или измените логин" //допилить
              ></input>
              <h2 className={`${styles.inputTitle}`}>Пароль:</h2>
              <input
                ref={passwordInputRef}
                id="password"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Отставьте поле пустым или измените пароль" //допилить
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
