import React from 'react';
import { Button, Image } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { dateToString } from '../../../utils/functions';
import ico from '../../../assets/worker/ico-calendar.png';
import styles from './InputsDate.module.css';

const InputsDate = ({ obj }) => {
  return (
    <>
      <p>{obj.text}: </p>
      <div
        className={`${styles.beginCont} d-flex justify-content-between align-items-center`}
      >
        <span className={`${styles.dateText}`}>
          {obj.date && dateToString(obj.date)}
        </span>
        <div className={`${styles.calendarContainer}`}>
          <Button
            variant="outline-success"
            className={`${styles.calendarBtn}`}
            onClick={() => {
              obj.funcFalse(false);
              obj.funcRev((prevEl) => !prevEl);
            }}
          >
            <Image src={ico} className={`${styles.calendarBtnImage}`} />
          </Button>
          {obj.flag && (
            <ReactDatePicker
              calendarClassName={`${styles.customCalendar}`}
              selected={obj.date}
              onChange={obj.change}
              minDate={obj.minDate}
              maxDate={obj.maxDate}
              inline
              showDisabledMonthNavigation
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InputsDate;
