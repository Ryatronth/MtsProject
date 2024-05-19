import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import { WORKER_CREATE_MENU } from '../../../../utils/consts';
import styles from './ProfileCardMenuToCreate.module.css';
import InputsDate from '../../InputsDate/InputsDate';

const ProfileCardMenuToCreate = ({ setModuleFlag, newMenuDate }) => {
  const navigate = useNavigate();
  const [startFlag, setStartFlag] = useState(false);
  const [endFlag, setEndFlag] = useState(false);
  const [startDate, setStartDate] = useState(newMenuDate);
  const [endDate, setEndDate] = useState(
    new Date(newMenuDate.getTime() + 86400000 * 29)
  );

  const changeMinDate = (date) => {
    if (endDate < new Date(date.getTime() + 86400000 * 28))
      setEndDate(new Date(date.getTime() + 86400000 * 28));
    if (endDate > new Date(date.getTime() + 86400000 * 31))
      setEndDate(new Date(date.getTime() + 86400000 * 28));
    setStartDate(date);
  };

  const basicList = [
    {
      text: 'Начало',
      date: startDate,
      funcFalse: setEndFlag,
      funcRev: setStartFlag,
      flag: startFlag,
      change: changeMinDate,
      minDate: new Date(new Date().getTime() + 86400000),
      maxDate: {},
    },
    {
      text: 'Конец',
      date: endDate,
      funcFalse: setStartFlag,
      funcRev: setEndFlag,
      flag: endFlag,
      change: setEndDate,
      minDate: new Date(startDate.getTime() + 86400000 * 28),
      maxDate: new Date(startDate.getTime() + 86400000 * 31),
    },
  ];

  const redirToCreate = () => {
    navigate(WORKER_CREATE_MENU, {
      state: { startDate: startDate, endDate: endDate },
    });
  };

  return (
    <div
      className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
    >
      <div className={`d-flex justify-content-start align-items-center`}>
        {basicList.map((obj) => (
          <InputsDate key={obj.text} obj={obj} />
        ))}
      </div>
      <div className={`d-flex justify-content-start`}>
        <ManagementButton
          mainFunc={() => redirToCreate()}
          secondFunc={setModuleFlag}
          variant="success"
          text="Сохранить"
        />
        <ManagementButton
          secondFunc={setModuleFlag}
          variant="danger"
          text="Отменить"
        />
      </div>
    </div>
  );
};

export default ProfileCardMenuToCreate;
