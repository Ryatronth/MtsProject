import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { Button, Dropdown, Image } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import ProfileMainInfo from '../../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import {
  getChildrenForParent,
  getOrderForParent,
  getOrderIdForParent,
} from '../../../http/userAPI';
import ico from '../../../assets/parent/ico-calendarWite.png';
import styles from './ViewOrder.module.css';
import { dateToString } from '../../../utils/functions';

const ViewOrder = observer(() => {
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dishesList, setDiahesList] = useState([]);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedchildrenList, setSelectedchildrenList] = useState([]);
  const [orderBe, setOrderBe] = useState(false);
  const [loading, setLoading] = useState(true);

  const basicListTime = [
    { text: 'Завтрак', main: 'BREAKFAST' },
    { text: 'Обед', main: 'LUNCH' },
    { text: 'Ужин', main: 'SNACK' },
  ];

  const getter = async (dates, child) => {
    let qparametr = `?date=${dateToString(dates)}&childId=${child[0].id}`;
    await getOrderIdForParent(qparametr).then((dataId) => {
      if (dataId[0]) {
        const orderId = dataId[0].id;
        getOrderForParent(orderId).then((data) => {
          setDiahesList(data);
        });
        setOrderBe(true);
      } else {
        setOrderBe(false);
      }
    });
  };

  const onChange = (dates) => {
    setSelectedDate(dates);
    if (!selectedchildrenList.length) setOrderBe(false);
    else {
      getter(dates, selectedchildrenList);
    }
  };

  const handleSelect = (id) => {
    if (selectedchildrenList.some((child) => child.id === +id)) {
      setSelectedchildrenList(
        selectedchildrenList.filter((child) => child.id !== +id)
      );
      if (!selectedchildrenList.length) setOrderBe(false);
      else {
        getter(
          selectedDate,
          childrenList.filter((child) => child.id === +id)
        );
      }
    } else {
      setSelectedchildrenList([
        childrenList.filter((child) => child.id === +id)[0],
      ]);
      getter(
        selectedDate,
        childrenList.filter((child) => child.id === +id)
      );
    }
  };

  useEffect(() => {
    let qparametr = `?parentId=${jwtDecode(localStorage.getItem('token')).id}`;
    getChildrenForParent(qparametr)
      .then((dataChild) => {
        if (dataChild.length === 0) {
          alert('Детей нет');
        } else {
          setChildrenList(dataChild);
          setSelectedchildrenList([dataChild[0]]);
          qparametr = `?date=${dateToString(selectedDate)}&childId=${
            dataChild[0].id
          }`;
          getOrderIdForParent(qparametr).then((dataId) => {
            if (dataId[0]) {
              const orderId = dataId[0].id;
              getOrderForParent(orderId).then((data) => {
                setDiahesList(data);
                setOrderBe(true);
              });
            } else {
              setOrderBe(false);
            }
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SpinnerMain />;
  }

  return (
    <>
      <ProfileMainInfo />
      <div className={`${styles.parentBody} mt-5`}>
        <div
          className={`${styles.parentContainer} d-flex flex-column align-items-start`}
        >
          <div
            className={`${styles.firstCont} d-flex justify-content-between align-items-center`}
          >
            <div className={`${styles.btnContainer} d-flex align-items-center`}>
              <Dropdown
                onSelect={(eventKey) => {
                  handleSelect(eventKey);
                }}
              >
                <Dropdown.Toggle
                  className={`${styles.dropTitle}`}
                  variant="success"
                  id="dropdown-basic"
                >
                  {selectedchildrenList[0]
                    ? `${selectedchildrenList[0].surname} ${selectedchildrenList[0].name[0]}.${selectedchildrenList[0].patronymic[0]}.`
                    : 'Выберите ребёнка'}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  variant="success"
                  className={`${styles.dropMenu}`}
                >
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
                  variant="success"
                  className={`${styles.mainBtn}`}
                  active={selectedTime === obj.main}
                  onClick={() => setSelectedTime(obj.main)}
                >
                  {obj.text}
                </Button>
              ))}
            </div>
            <h1 className={`${styles.mainTitle}`}>Рацион</h1>
          </div>
          <div
            className={`${styles.orderContainer} d-flex justify-content-between align-items-start`}
          >
            <div
              className={`${styles.calendarContainer} d-flex flex-column align-items-center`}
            >
              <Button
                variant="outline-success"
                className={`${styles.calendarBtn}`}
              >
                <Image src={ico} className={`${styles.calendarBtnImage}`} />
              </Button>
              <ReactDatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={selectedDate}
                onChange={onChange}
                minDate={new Date()}
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className={`${styles.dishesContainer}`}>
              <div className={`${styles.dishesList} d-flex align-items-center`}>
                {orderBe
                  ? dishesList.map(
                      (dish) =>
                        dish.category === selectedTime && (
                          <div
                            key={dish.id}
                            className={`${styles.cardDish} d-flex flex-column align-items-center justify-content-start`}
                          >
                            <Image
                              src={dish.imageUrl}
                              className={`${styles.cardImg}`}
                            />
                            <p className={`${styles.cardDescr}`}>{dish.name}</p>
                          </div>
                        )
                    )
                  : 'Заказ не сформирован'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ViewOrder;
