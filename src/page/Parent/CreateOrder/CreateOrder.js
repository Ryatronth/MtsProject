import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Context } from '../../../index';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import {
  createOrders,
  getChildrenForParent,
  getCurrentMenuForParent,
  getMenuIdForParent,
} from '../../../http/userAPI';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import ico from '../../../assets/parent/ico-calendar.png';
import styles from './CreateOrder.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowDishesToSelect from '../../../components/pieces/Show/ShowDishesToSelect/ShowDishesToSelect';

const CreateOrder = () => {
  const { user } = useContext(Context);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedchildrenList, setSelectedChildrenList] = useState([]);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() + 86400000)
  );
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
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

  const clickCreateOrder = async () => {
    const orders = selectedchildrenList.flatMap((child) => {
      const objList = [];
      let tempStartDate = new Date(startDate);

      while (tempStartDate <= endDate) {
        objList.push({
          childId: child.id,
          date: `${tempStartDate.getFullYear()}-${(tempStartDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${tempStartDate
            .getDate()
            .toString()
            .padStart(2, '0')}`,
          menuDishes: selectedDishesList.map((dish) => dish.id),
        });

        tempStartDate.setDate(tempStartDate.getDate() + 1);
      }
      return objList;
    });
    await createOrders(orders)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    let qparametr = `?endDate=2024-05-28`;
    getMenuIdForParent(qparametr).then((id) => {
      qparametr = `?menuId=${id[0].id}`;
      getCurrentMenuForParent(qparametr)
        .then((menu) => {
          const listMenu = menu.map((o) => o.dish);
          setAllDishesList(listMenu);
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
              onClick={() => setFlag(flag ? false : true)}
            >
              <Image src={ico} className={`${styles.calendarBtnImage}`} />
            </Button>
            {flag && (
              <DatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={startDate}
                onChange={onChange}
                minDate={new Date(new Date().getTime() + 86400000)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
                // locale="ru"
              />
            )}
          </div>
          <Button
            variant="outline-success"
            className={`${styles.createOrderBtn}`}
            onClick={() => clickCreateOrder()}
          >
            Составить рацион
          </Button>
        </div>
        <div
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
            />
          </div>
          <h2 style={{ marginTop: '25px' }} className={`${styles.menuTitle}`}>
            Выберите блюда
          </h2>
          <div style={{ width: '1657px' }}>
            <ShowDishesToSelect
              selectedTime={selectedTime}
              dishesList={allDishesList}
              exDishesList={selectedDishesList}
              funcAddSet={setSelectedDishesList}
              funcSubSet={setAllDishesList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
