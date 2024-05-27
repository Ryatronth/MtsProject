import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import ModalWindowAdd from '../../../components/pieces/ModalWindowAdd/ModalWindowAdd';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import ProfileCardChildToShow from '../../../components/blocks/ProfileCard/ProfileCardChildToShow/ProfileCardChildToShow';
import { createParent, getChildren, getGroups } from '../../../http/userAPI';
import { ADMIN_ROUTE } from '../../../utils/consts';
import { formatNumberPhone, formatFullName } from '../../../utils/functions';
import ico from '../../../assets/admin/ico-parentAva.png';
import styles from './CreateParentPage.module.css';
import InputsProfileBuilder from '../../../components/blocks/InputsProfileBuilder/InputsProfileBuilder';
import SaveCancelButtons from '../../../components/blocks/SaveCancelButtons/SaveCancelButtons';
import AddChildButton from '../../../components/buttons/AddChildButton/AddChildButton';

const CreateParentPage = observer(() => {
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

  const inputList = [
    {
      ref: fullNameInputRef,
      value: fullName,
      func: (string) => setFullName(formatFullName(string)),
      variant: 'fio',
    },
    {
      ref: phoneNumberInputRef,
      value: phoneNumber,
      func: (string) => setPhoneNumber(formatNumberPhone(string)),
      variant: 'phone',
    },
    {
      ref: loginInputRef,
      value: login,
      func: (string) => setLogin(string),
      variant: 'login',
    },
    {
      ref: passwordInputRef,
      value: password,
      func: (string) => setPassword(string),
      variant: 'password',
    },
  ];

  const clickCreateParent = async () => {
    const fioList = fullName.split(' ');
    if (fioList.length < 3 || fioList[2] === '') {
      fullNameInputRef.current.focus();
      alert('Введите полное ФИО родителя');
    } else {
      let phone = `+${phoneNumber.replace(/\D/g, '')}`;
      const user = {
        username: login,
        password: password,
        surname: fioList[0],
        name: fioList[1],
        patronymic: fioList[2],
        phone: phone,
        role: 'PARENT',
        imageUrl: null,
        children: listChild.map((child) => child.id),
      };
      await createParent(user)
        .then((data) => {
          console.log(data);
          alert(data.message);
          navigate(ADMIN_ROUTE);
        })
        .catch((e) => alert(e.response.data.message));
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
      <div className={`${styles.header}`}>
        <ProfileHeader />
      </div>
      <div
        className={`${styles.infoBlock} d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex align-items-center column-gap-5">
          <InputPicture ico={ico} />
          <div className="d-flex justify-content align-items-center column-gap-lg-5">
            <InputsProfileBuilder list={inputList.slice(0, 2)} />
            <InputsProfileBuilder list={inputList.slice(2, 4)} />
          </div>
        </div>
        <SaveCancelButtons
          funcSave={clickCreateParent}
          funcCencel={() => navigate(ADMIN_ROUTE)}
        />
      </div>
      <div className={`${styles.adminBody} mt-5 admin-body`}>
        <div
          className={`${styles.admiContainer} d-flex flex-column justify-content-center align-items `}
        >
          <h2 className={`${styles.childTitle}`}>Дети</h2>
          <div
            className={`${styles.childContainer} d-flex justify-content-start align-items-center`}
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
            <AddChildButton func={setFlagModalWindow} />
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
