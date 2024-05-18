import React, { useContext, useRef, useState } from 'react';
import { Context } from '../../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import { ADMIN_WORK_WITH_GROUPS_ROUTE } from '../../../utils/consts';
import { createChild } from '../../../http/userAPI';
import { formatFullName } from '../../../utils/functions';
import ico from '../../../assets/admin/ico-childAva-195.png';
import styles from './CreateChildPage.module.css';
import SaveCancelButtons from '../../../components/blocks/SaveCancelButtons/SaveCancelButtons';

const CreateChildPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const groupId = state?.groupId;
  const [fullName, setFullName] = useState('');
  const fullNameInputRef = useRef(null);

  const cencel = () => {
    navigate(ADMIN_WORK_WITH_GROUPS_ROUTE, {
      state: { groupId: groupId },
    });
  };

  const clickCreateChild = async () => {
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
          groupId: groupId,
          parentId: null,
        };
        await createChild(data);
        navigate(ADMIN_WORK_WITH_GROUPS_ROUTE, {
          state: { groupId: groupId },
        });
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <div className={`${styles.header}`}>
        <ProfileHeader info={user.user} />
      </div>
      <div
        className={`${styles.infoBlock} d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex align-items-center column-gap-5">
          <InputPicture ico={ico} />
          <div className="d-flex justify-content align-items-center">
            <div className="d-flex flex-column ">
              <h2 className={`${styles.inputTitle}`}>ФИО</h2>
              <input
                ref={fullNameInputRef}
                className={`${styles.inputText} px-4 py-2 mt-2`}
                value={fullName}
                onChange={(e) => setFullName(formatFullName(e.target.value))}
                placeholder="Введите ФИО"
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
        <SaveCancelButtons funcSave={clickCreateChild} funcCencel={cencel} />
      </div>
      <div className={`${styles.adminBody} mt-5`}></div>
    </>
  );
});

export default CreateChildPage;
