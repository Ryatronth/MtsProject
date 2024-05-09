import React, { useContext, useEffect, useRef, useState } from 'react';
import ico from '../../../assets/admin/ico-parentAva.png';
import backgr from '../../../assets/bgProfile.png';
import icoAdd from '../../../assets/admin/ico-addChildBtn.png';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../..';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';
import styles from './CreateParentPage.module.css';
import ModalWindowAdd from '../../../components/pieces/ModalWindowAdd/ModalWindowAdd';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { createParent, getChildren, getGroups } from '../../../http/userAPI';
import { observer } from 'mobx-react-lite';
import ProfileCardChildToShow from '../../../components/blocks/ProfileCard/ProfileCardChildToShow/ProfileCardChildToShow';

const CreateParentPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  // data
  const [listChild, setListChild] = useState([]);
  const [allChild, setAllChild] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  // input`s
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // ссылки на input`s
  const fullNameInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const loginInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  // специфические state`s
  const [flagModalWindow, setFlagModalWindow] = useState(false);
  const [loading, setLoading] = useState(true);

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
      { length: 1, format: '$1' },
      { length: 4, format: '$1 ($2' },
      { length: 7, format: '$1 ($2) $3' },
      { length: 9, format: '$1 ($2) $3-$4' },
      { length: 11, format: '$1 ($2) $3-$4-$5' },
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
    setPhoneNumber(input);
  };

  const clickCreateParent = async () => {
    try {
      const fioList = fullName.split(' ');
      if (fioList.length < 3 || fioList[2] === '') {
        alert('Введите верный ФИО');
        fullNameInputRef.current.focus();
      } else if (phoneNumber.replace(/\D/g, '').length < 11) {
        alert('Введите правильный номер телефона');
        phoneNumberInputRef.current.focus();
      } else if (login.length <= 3) {
        alert('Логин должен содержать более 3х символов');
        loginInputRef.current.focus();
      } else if (password.length <= 5) {
        alert('Пароль должен содержать более 5и символов');
        passwordInputRef.current.focus();
      } else {
        if (listChild.length) {
          const user = {
            username: login,
            password: password,
            surname: fioList[0],
            name: fioList[1],
            patronymic: fioList[2],
            phone: phoneNumber,
            role: 'PARENT',
            imageUrl: null,
            children: listChild.map((child) => child.id),
          };
          const uwu = await createParent(user);
          console.log(uwu);
          alert(uwu.message);
          navigate(ADMIN_ROUTE);
        } else {
          alert('Выберите ребёнка');
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const qparametr = `?unlinked=uwu`;
    getChildren(qparametr)
      .then((data) => {
        if (data) {
          console.log(data);
          getGroups().then((dataG) => setAllGroup(dataG));
          setAllChild(data);
          return data;
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SpinnerMain />;
  }

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
          <InputPicture ico={ico} />
          <div className="d-flex justify-content align-items-center column-gap-lg-5">
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
                placeholder="Введите ФИО"
                value={fullName}
                onChange={(e) => formatFullName(e.target.value)}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Номер телефона:</h2>
              <input
                ref={phoneNumberInputRef}
                id="inputInfo"
                type="tel"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '230px',
                  minWidth: '200px',
                }}
                placeholder="Введите телефон"
                value={phoneNumber}
                onChange={(e) => formatPhoneNumber(e.target.value)}
              ></input>
            </div>
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>Логин:</h2>
              <input
                ref={loginInputRef}
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Пароль:</h2>
              <input
                ref={passwordInputRef}
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '300px',
                  minWidth: '270px',
                }}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => clickCreateParent()}
          >
            Сохранить
          </Button>
          <Button
            variant="danger"
            style={{ width: '396px', fontSize: 24 }}
            className="reset-btn cpecial-btn"
            onClick={() => navigate(ADMIN_ROUTE)}
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
          className={`${styles.admiContainer} d-flex flex-column justify-content-center align-items `}
        >
          <h2 className={`${styles.childTitle}`}>Дети</h2>
          <div
            style={{ width: '100%', gap: '60px', flexWrap: 'wrap' }}
            className={`d-flex justify-content-start align-items-center`}
          >
            {listChild.map((data) => (
              <ProfileCardChildToShow
                id={data.id}
                key={data.id}
                allChild={allChild}
                setAllChild={setAllChild}
                data={data}
                listChild={listChild}
                setListChild={setListChild}
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
        </div>
        {flagModalWindow && (
          <ModalWindowAdd
            childData={allChild}
            setAllChild={setAllChild}
            groupData={allGroup}
            listChild={listChild}
            setListChild={setListChild}
            setModuleFlag={setFlagModalWindow}
          />
        )}
      </div>
    </>
  );
});

export default CreateParentPage;
