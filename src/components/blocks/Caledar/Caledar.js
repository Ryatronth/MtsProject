import React, { useEffect, useState } from 'react';
import styles from './Caledar.module.css';
import SpinnerMain from '../../loaders/SpinnerMain';

const Caledar = ({ setFlag, selectedTime, setSelectedTime }) => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const daysOfWeek = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };
  const month = {
    Jan: { str: 'Январь', int: 1 },
    Feb: { str: 'Февраль', int: 2 },
    Mar: { str: 'Март', int: 3 },
    Apr: { str: 'Апрель', int: 4 },
    May: { str: 'Май', int: 5 },
    Jun: { str: 'Июнь', int: 6 },
    Jul: { str: 'Июль', int: 7 },
    Aug: { str: 'Август', int: 8 },
    Sep: { str: 'Сентябрь', int: 9 },
    Oct: { str: 'Октябрь', int: 10 },
    Nov: { str: 'Ноябрь', int: 11 },
    Dec: { str: 'Декабрь', int: 12 },
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 29);
    let fff = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ];
    while (date.getMonth() === month) {
      fff.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    setDays(fff);
  };

  const addMonth = () => {
    console.log(1111);
    const currentDate = new Date(
      `${selectedTime.year}/${selectedTime.monthInt + 1}/1`
    )
      .toString()
      .split(' ');
    const time = {
      year: currentDate[3],
      monthString: month[currentDate[1]].str,
      monthInt: month[currentDate[1]].int,
      daysOfWeek: daysOfWeek[currentDate[0]],
      day: +currentDate[2],
    };
    getDaysInMonth(+time.year, +time.monthInt);
    setSelectedTime(time);
  };

  const subMonth = () => {
    console.log(2222);
    const currentDate = new Date(
      `${selectedTime.year}/${selectedTime.monthInt - 1}/1`
    )
      .toString()
      .split(' ');
    const time = {
      year: currentDate[3],
      monthString: month[currentDate[1]].str,
      monthInt: month[currentDate[1]].int,
      daysOfWeek: daysOfWeek[currentDate[0]],
      day: +currentDate[2],
    };
    getDaysInMonth(+time.year, +time.monthInt);
    setSelectedTime(time);
  };

  useEffect(() => {
    if (selectedTime === '') {
      const currentDate = new Date().toString().split(' ');
      const time = {
        year: currentDate[3],
        monthString: month[currentDate[1]].str,
        monthInt: month[currentDate[1]].int,
        daysOfWeek: daysOfWeek[currentDate[0]],
        day: +currentDate[2],
      };
      console.log(time);
      getDaysInMonth(+time.year, +time.monthInt);
      setSelectedTime(time);
    } else {
      getDaysInMonth(+selectedTime.year, +selectedTime.monthInt);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <SpinnerMain />;
  }

  console.log(selectedTime.day);
  return (
    <div className={`${styles.calendar}`}>
      <div className={`${styles.month}`}>
        <div className={`${styles.nav}`}>
          <span
            className={`${styles.fas} ${styles.faAngleLeft}`}
            onClick={() => subMonth()}
          ></span>
        </div>
        <div>
          {selectedTime.monthString}{' '}
          <span className={`${styles.year}`}>{selectedTime.year}</span>
        </div>
        <div className={`${styles.nav}`}>
          <span
            className={`${styles.fas} ${styles.faAngleRight}`}
            onClick={() => addMonth()}
          ></span>
        </div>
      </div>
      <div className={`${styles.days}`}>
        <span>ПН</span>
        <span>ВТ</span>
        <span>СР</span>
        <span>ЧТ</span>
        <span>ПТ</span>
        <span>СБ</span>
        <span>ВС</span>
      </div>
      <div className={`${styles.dates}`}>
        {days.map((day) => (
          <button
            key={day}
            className={`${styles.calendarBtn}`}
            style={
              day === 1
                ? {
                    gridColumn: `${
                      selectedTime.daysOfWeek - ((selectedTime.day % 7) - 1)
                    }`,
                    width: '15px',
                  }
                : {}
            }
          >
            <time>{day}</time>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Caledar;
