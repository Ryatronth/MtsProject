import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../../index';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import {
  getChildrenForParent,
  getCurrentMenuForParent,
  getMenuIdForParent,
} from '../../../http/userAPI';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import ico from '../../../assets/parent/ico-calendar.png';
import icoSub from '../../../assets/worker/ico-sub.png';
import icoPlus from '../../../assets/worker/ico-addDish.png';
import styles from './CreateOrder.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';
import ModalWindowConfirmation from '../../../components/pieces/ModalWindowConfirmation/ModalWindowConfirmation';

const CreateOrder = () => {
  const { user } = useContext(Context);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedchildrenList, setSelectedChildrenList] = useState([]);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  // const [selectedID, setSelectedID] = useState([]);
  // const [allID, setAllID] = useState([]);
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() + 86400000)
  );
  const [endDate, setEndDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(
    new Date(new Date().getTime() + 86400000)
  );
  const [loading, setLoading] = useState(true);
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [modalWindowFlag, setModalWindowFlag] = useState(false);

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  };

  const onChange = async (dates) => {
    const [start, end] = dates;
    if (maxDate < start) {
      let qparametr = `?date=${start.getFullYear()}-${(start.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
      await getMenuIdForParent(qparametr).then((data) => {
        console.log(data);
        if (data.length === 0) {
          alert('На данную дату меню не готово');
        } else {
          const tempEndDate = data[0].endDate.split('-');
          const tempStartDate = data[0].startDate.split('-');
          setMaxDate(
            new Date(`${tempEndDate[0]}/${tempEndDate[1]}/${tempEndDate[2]}`)
          );
          setMinDate(
            new Date(
              `${tempStartDate[0]}/${tempStartDate[1]}/${tempStartDate[2]}`
            )
          );
          qparametr = `?menuId=${data[0].id}`;
          getCurrentMenuForParent(qparametr).then((menu) => {
            setAllDishesList(menu);
          });
        }
      });
      console.log(start);
    }
    if (minDate > start) {
      let qparametr = `?date=${start.getFullYear()}-${(start.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
      await getMenuIdForParent(qparametr).then((data) => {
        const tempEndDate = data[0].endDate.split('-');
        const tempStartDate = data[0].startDate.split('-');
        setMaxDate(
          new Date(`${tempEndDate[0]}/${tempEndDate[1]}/${tempEndDate[2]}`)
        );
        setMinDate(
          new Date(
            `${tempStartDate[0]}/${tempStartDate[1]}/${tempStartDate[2]}`
          )
        );
        qparametr = `?menuId=${data[0].id}`;
        getCurrentMenuForParent(qparametr).then((menu) => {
          setAllDishesList(menu);
        });
      });
      console.log(start);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelect = (id) => {
    if (selectedchildrenList.some((child) => child.id === +id)) {
      setSelectedChildrenList(
        selectedchildrenList.filter((child) => child.id !== +id)
      );
    } else {
      setSelectedChildrenList([
        ...selectedchildrenList,
        childrenList.filter((child) => child.id === +id)[0],
      ]);
    }
  };

  useEffect(() => {
    let qparametr = `?date=${startDate.getFullYear()}-${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    getMenuIdForParent(qparametr).then((data) => {
      const tempEndDate = data[0].endDate.split('-');
      const tempStartDate = data[0].startDate.split('-');
      setMaxDate(
        new Date(`${tempEndDate[0]}/${tempEndDate[1]}/${tempEndDate[2]}`)
      );
      setMinDate(
        new Date(`${tempStartDate[0]}/${tempStartDate[1]}/${tempStartDate[2]}`)
      );
      qparametr = `?menuId=${data[0].id}`;
      getCurrentMenuForParent(qparametr)
        .then((menu) => {
          setAllDishesList(menu);
        })
        .finally(() => setLoading(false));
    });
    qparametr = `?parentId=${jwtDecode(localStorage.getItem('token')).id}`;
    getChildrenForParent(qparametr)
      .then((data) => {
        setChildrenList(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SpinnerMain />;
  }

  return (
    <div className={`reset-container`}>
      <ProfileHeader info={user.user} />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          style={{ width: '100%' }}
          className={`d-flex justify-content-center align-items-center mt-5`}
        >
          <Dropdown
            onSelect={(eventKey) => {
              handleSelect(eventKey);
            }}
          >
            <Dropdown.Toggle
              className={`${styles.dropTitle}`}
              variant="outline-success"
              id="dropdown-basic"
            >
              Выберите ребёнка
            </Dropdown.Toggle>

            <Dropdown.Menu variant="success" className={`${styles.dropMenu}`}>
              {childrenList.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  variant="success"
                  eventKey={child.id}
                  className={
                    selectedchildrenList.some(
                      (selChild) => child.id === selChild.id
                    )
                      ? styles.dropSelElem
                      : styles.dropSimpleElem
                  }
                >
                  {child.surname} {child.name[0]}.{child.patronymic[0]}.
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'BREAKFAST'}
            onClick={() => setSelectedTime('BREAKFAST')}
          >
            Завтрак
          </Button>
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            active={selectedTime === 'LUNCH'}
            onClick={() => setSelectedTime('LUNCH')}
          >
            Обед
          </Button>
          <Button
            variant="outline-success"
            style={{ marginRight: '50px' }}
            className={`${styles.mainBtn}`}
            active={selectedTime === 'SNACK'}
            onClick={() => setSelectedTime('SNACK')}
          >
            Полдник
          </Button>
          <div className={`${styles.calendarContainer}`}>
            <Button
              variant="outline-success"
              className={`${styles.calendarBtn}`}
              onClick={() => setCalendarFlag(calendarFlag ? false : true)}
            >
              <Image src={ico} className={`${styles.calendarBtnImage}`} />
            </Button>
            {calendarFlag && (
              <DatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={startDate}
                onChange={onChange}
                minDate={new Date(new Date().getTime() + 86400000)}
                maxDate={!(endDate && startDate) ? maxDate : ''}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
                filterDate={isWeekday}
                // locale="ru"
              />
            )}
          </div>
          <Button
            variant="outline-success"
            className={`${styles.createOrderBtn}`}
            onClick={() => {
              if (!selectedchildrenList.length) {
                alert('Выберите ребёнка/детей');
              } else if (!selectedDishesList.length) {
                alert('Выберите блюда для заказа');
              } else if (endDate === null) {
                setEndDate(startDate);
              } else {
                setModalWindowFlag(true);
                document.body.style.overflow = 'hidden';
              }
            }}
          >
            Составить рацион
          </Button>
        </div>
        <div
          style={{ marginTop: '45px' }}
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <h2 className={`${styles.menuTitle}`}>Выбранные блюда</h2>
          <div style={{ width: '1657px' }}>
            <ShowDishesToSelect
              selectedTime={selectedTime}
              dishesList={selectedDishesList}
              exDishesList={allDishesList}
              funcAddSet={setAllDishesList}
              funcSubSet={setSelectedDishesList}
              ico={icoSub}
            />
          </div>
          <h2 className={`${styles.menuTitle}`}>Выберите блюда</h2>
          <div style={{ width: '1657px' }}>
            <ShowDishesToSelect
              selectedTime={selectedTime}
              dishesList={allDishesList}
              exDishesList={selectedDishesList}
              funcAddSet={setSelectedDishesList}
              funcSubSet={setAllDishesList}
              ico={icoPlus}
            />
          </div>
        </div>
      </div>
      {modalWindowFlag && (
        <ModalWindowConfirmation
          setFlag={setModalWindowFlag}
          selectedchildrenList={selectedchildrenList}
          selectedDishesList={selectedDishesList}
          setAllDishesList={setAllDishesList}
          setSelectedDishesList={setSelectedDishesList}
          allDishesList={allDishesList}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
};

export default CreateOrder;
