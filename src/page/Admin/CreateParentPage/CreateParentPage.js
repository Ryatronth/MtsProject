import React, { useContext, useEffect, useState } from 'react';
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
  const [listChild, setListChild] = useState([]);
  const [allChild, setAllChild] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const [flagModalWindow, setFlagModalWindow] = useState(false);
  const [loading, setLoading] = useState(true);

  const clickCreateParent = async () => {
    try {
      const inputs = Array.from(document.querySelectorAll('#inputInfo'));
      let flag = true;
      inputs.forEach((el) => {
        flag = !el.value.trim() ? false : flag ? true : false;
      });
      if (!flag) {
        alert('Введите вверные данные');
      } else {
        const children = Array.from(document.querySelectorAll('.CARD'))
          .map((el) => {
            const id = parseInt(el.id);
            return id !== -1 ? id : undefined;
          })
          .filter((id) => typeof id === 'number' && !isNaN(id));
        if (!!children.length) {
          const user = {
            username: inputs[2].value,
            password: inputs[3].value,
            surname: inputs[0].value.split(' ')[0],
            name: inputs[0].value.split(' ')[1],
            patronymic: inputs[0].value.split(' ')[2],
            phone: inputs[1].value,
            role: 'PARENT',
            imageUrl: null,
            childrenId: children,
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
    getChildren()
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
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '420px',
                  minWidth: '350px',
                }}
              ></input>
              <h2 className={`${styles.inputTitle}`}>Номер телефона:</h2>
              <input
                id="inputInfo"
                className={`${styles.inputText}`}
                style={{
                  maxWidth: '230px',
                  minWidth: '200px',
                }}
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
