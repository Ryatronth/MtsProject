import React, { useState } from 'react';
import ico from '../../../../assets/worker/ico-calendar.png';
import { Button, Image } from 'react-bootstrap';
import ManagementButton from '../../../buttons/ManagementButton/ManagementButton';
import styles from './ProfileCardMenuToCreate.module.css';
import { useNavigate } from 'react-router-dom';
import { WORKER_CREATE_MENU } from '../../../../utils/consts';
import ReactDatePicker from 'react-datepicker';

const ProfileCardMenuToCreate = ({ setModuleFlag, listData, setListData }) => {
  const navigate = useNavigate();
  const [startFlag, setStartFlag] = useState(false);
  const [endFlag, setEndFlag] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() + 86400000)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 86400000 * 29)
  );

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
        <p>Начало: </p>
        <div
          style={{ marginRight: '36px' }}
          className={`${styles.beginCont} d-flex justify-content-between align-items-center`}
        >
          <span className={`${styles.dateText}`}>
            {startDate &&
              `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${startDate
                .getDate()
                .toString()
                .padStart(2, '0')}`}
          </span>
          <div className={`${styles.calendarContainer}`}>
            <Button
              variant="outline-success"
              className={`${styles.calendarBtn}`}
              onClick={() => {
                setEndFlag(false);
                setStartFlag(startFlag ? false : true);
              }}
            >
              <Image src={ico} className={`${styles.calendarBtnImage}`} />
            </Button>
            {startFlag && (
              <ReactDatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={startDate}
                onChange={(date) => {
                  if (endDate < new Date(date.getTime() + 86400000 * 28))
                    setEndDate(new Date(date.getTime() + 86400000 * 28));
                  if (endDate > new Date(date.getTime() + 86400000 * 31))
                    setEndDate(new Date(date.getTime() + 86400000 * 28));
                  setStartDate(date);
                }}
                minDate={new Date(new Date().getTime() + 86400000)}
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
                // locale="ru"
              />
            )}
          </div>
        </div>
        <p>Конец: </p>
        <div
          className={`${styles.beginCont} d-flex justify-content-between align-items-center`}
        >
          <span
            className={`${styles.dateText}`}
            style={endDate ? {} : { color: '#AFAFAF' }}
          >
            {endDate
              ? `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${endDate
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`
              : 'Дата'}
          </span>
          <div className={`${styles.calendarContainer}`}>
            <Button
              variant="outline-success"
              className={`${styles.calendarBtn}`}
              onClick={() => {
                setStartFlag(false);
                setEndFlag(endFlag ? false : true);
              }}
            >
              <Image src={ico} className={`${styles.calendarBtnImage}`} />
            </Button>
            {endFlag && (
              <ReactDatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={new Date(startDate.getTime() + 86400000 * 28)}
                maxDate={new Date(startDate.getTime() + 86400000 * 31)}
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
                // locale="ru"
              />
            )}
          </div>
        </div>
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
