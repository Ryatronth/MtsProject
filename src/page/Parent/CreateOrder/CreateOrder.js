import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';
import ModalWindowConfirmation from '../../../components/pieces/ModalWindowConfirmation/ModalWindowConfirmation';
import {
  getChildrenForParent,
  getCurrentMenuForParent,
  getMenuIdForParent,
} from '../../../http/userAPI';
import { dateToString } from '../../../utils/functions';
import ico from '../../../assets/parent/ico-calendar.png';
import icoSub from '../../../assets/worker/ico-sub.png';
import icoPlus from '../../../assets/worker/ico-addDish.png';
import styles from './CreateOrder.module.css';

const CreateOrder = () => {
  const [xxxId, setXxxId] = useState(-1);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedchildrenList, setSelectedChildrenList] = useState([]);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
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

  const basicListTime = [
    { text: 'Завтрак', time: 'BREAKFAST' },
    { text: 'Обед', time: 'LUNCH' },
    { text: 'Полдник', time: 'SNACK' },
  ];
  const basicListDishes = [
    {
      text: 'Выбранные блюда',
      dishesList: selectedDishesList,
      exDishesList: allDishesList,
      funcAddSet: setAllDishesList,
      funcSubSet: setSelectedDishesList,
      ico: icoSub,
    },
    {
      text: 'Выберите блюда',
      dishesList: allDishesList,
      exDishesList: selectedDishesList,
      funcAddSet: setSelectedDishesList,
      funcSubSet: setAllDishesList,
      ico: icoPlus,
    },
  ];

  const onChange = async (dates) => {
    const [start, end] = dates;
    if (maxDate < start) {
      setSelectedDishesList([]);
      let qparametr = `?date=${dateToString(start)}`;
      await getMenuIdForParent(qparametr).then((data) => {
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
          setXxxId(data[0].id);
          const menuId = data[0].id;
          getCurrentMenuForParent(menuId).then((menu) => {
            setAllDishesList(menu);
          });
        }
      });
    }
    if (minDate > start) {
      setSelectedDishesList([]);
      let qparametr = `?date=${dateToString(start)}`;
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
        setXxxId(data[0].id);
        const menuId = data[0].id;
        getCurrentMenuForParent(menuId).then((menu) => {
          setAllDishesList(menu);
        });
      });
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
    let qparametr = `?date=${dateToString(startDate)}`;
    getMenuIdForParent(qparametr).then((data) => {
      const tempEndDate = data[0].endDate.split('-');
      const tempStartDate = data[0].startDate.split('-');
      setMaxDate(
        new Date(`${tempEndDate[0]}/${tempEndDate[1]}/${tempEndDate[2]}`)
      );
      setMinDate(
        new Date(`${tempStartDate[0]}/${tempStartDate[1]}/${tempStartDate[2]}`)
      );
      setXxxId(data[0].id);
      const menuId = data[0].id;
      getCurrentMenuForParent(menuId)
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
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          className={`${styles.previewSection} d-flex justify-content-center align-items-center mt-5`}
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
          {basicListTime.map((obj) => (
            <Button
              key={obj.time}
              variant="outline-success"
              className={`${styles.mainBtn}`}
              active={selectedTime === obj.time}
              onClick={() => setSelectedTime(obj.time)}
            >
              {obj.text}
            </Button>
          ))}
          <div className={`${styles.calendarContainer}`}>
            <Button
              variant="outline-success"
              className={`${styles.calendarBtn}`}
              onClick={() => setCalendarFlag(!calendarFlag)}
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
          className={`${styles.dishesContainer} d-flex flex-column justify-content-center align-items-center`}
        >
          {basicListDishes.map((obj) => (
            <>
              <h2 className={`${styles.menuTitle}`}>{obj.text}</h2>
              <div className={`${styles.dishes}`}>
                <ShowDishesToSelect
                  selectedTime={selectedTime}
                  dishesList={obj.dishesList}
                  exDishesList={obj.exDishesList}
                  funcAddSet={obj.funcAddSet}
                  funcSubSet={obj.funcSubSet}
                  ico={obj.ico}
                />
              </div>
            </>
          ))}
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
          xxxId={xxxId}
        />
      )}
    </div>
  );
};

export default CreateOrder;
