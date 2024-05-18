import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import InputPicture from '../../../components/inputs/InputPicture/InputPicture';
import { ADMIN_WORK_WITH_PROFILE_ROUTE } from '../../../utils/consts';
import { getGroups, updateChild } from '../../../http/userAPI';
import ico from '../../../assets/admin/ico-childAva-195.png';
import styles from './EditChildPage.module.css';
import { formatFullName } from '../../../utils/functions';
import InputDropdown from '../../../components/inputs/InputDropdown/InputDropdown';
import SaveCancelButtons from '../../../components/blocks/SaveCancelButtons/SaveCancelButtons';

const EditChildPage = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const childData = state?.childData;
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [fullName, setFullName] = useState('');
  const fullNameInputRef = useRef(null);

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
        await updateChild(childData.id, data);
        navigate(ADMIN_WORK_WITH_PROFILE_ROUTE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    getGroups().then((data) => {
      setGroupList(data);
      setFullName(
        `${childData.surname} ${childData.name} ${childData.patronymic}`
      );
      setSelectedGroup(childData.childGroup.id);
    });
    fullNameInputRef.current.focus();
  }, []);

  return (
    <>
      <div className={`${styles.header}`}>
        <ProfileHeader />
      </div>
      <div
        className={`${styles.infoBlock} d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex align-items-center column-gap-5">
          <InputPicture ico={childData.imageUrl || ico} />
          <div className="d-flex flex-column justify-content-center">
            <h2 className={`${styles.inputTitle}`}>ФИО</h2>
            <input
              ref={fullNameInputRef}
              className={`px-4 py-2 mt-2 ${styles.inputText}`}
              value={fullName}
              onChange={(e) => setFullName(formatFullName(e.target.value))}
              placeholder="Введите ФИО"
            ></input>
            <h2 className={`${styles.inputTitle}`}>Группа</h2>
            <InputDropdown
              variant="chooseChild"
              selectedGroup={selectedGroup}
              func={setSelectedGroup}
              list={groupList}
            />
          </div>
        </div>
        <SaveCancelButtons
          funcSave={saveChanges}
          funcCencel={() => navigate(ADMIN_WORK_WITH_PROFILE_ROUTE)}
        />
      </div>
      <div className={`${styles.adminBody} mt-5`}></div>
    </>
  );
});

export default EditChildPage;
