import React, { useEffect, useState } from 'react';
import ProfileMainInfo from '../../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import backgr from '../../../assets/bgProfile.png';
import { Button, Dropdown, Image } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import ico from '../../../assets/parent/ico-calendarWite.png';
import styles from './ViewOrder.module.css';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { observer } from 'mobx-react-lite';
import {
  getChildrenForParent,
  getOrderForParent,
  getOrderIdForParent,
} from '../../../http/userAPI';
import { jwtDecode } from 'jwt-decode';

const ViewOrder = observer(() => {
  const [selectedTime, setSelectedTime] = useState('BREAKFAST');
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [calendarFlag, setCalendarFlag] = useState(false);
  const [dishesList, setDiahesList] = useState([]);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedchildrenList, setSelectedchildrenList] = useState([]);
  const [orderBe, setOrderBe] = useState(false);
  const [loading, setLoading] = useState(true);

  const getter = async (dates, child) => {
    let qparametr = `?date=${dates.getFullYear()}-${(dates.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dates
      .getDate()
      .toString()
      .padStart(2, '0')}&childId=${child[0].id}`;
    await getOrderIdForParent(qparametr).then((dataId) => {
      if (dataId[0]) {
        qparametr = `?orderId=${dataId[0].id}`;
        getOrderForParent(qparametr).then((data) => {
          console.log(data);
          setDiahesList(data.map((o) => o.dish));
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
          qparametr = `?date=${selectedDate.getFullYear()}-${(
            selectedDate.getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}-${selectedDate
            .getDate()
            .toString()
            .padStart(2, '0')}&childId=${dataChild[0].id}`;
          getOrderIdForParent(qparametr).then((dataId) => {
            if (dataId[0]) {
              qparametr = `?orderId=${dataId[0].id}`;
              getOrderForParent(qparametr).then((data) => {
                setDiahesList(data.map((o) => o.dish));
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

  console.log(selectedchildrenList);

  return (
    <>
      <ProfileMainInfo />
      <div
        className={`mt-5 ${styles.parentBody}`}
        style={{
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
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

              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                active={selectedTime === 'BREAKFAST'}
                onClick={() => setSelectedTime('BREAKFAST')}
              >
                Завтрак
              </Button>
              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                active={selectedTime === 'LUNCH'}
                onClick={() => setSelectedTime('LUNCH')}
              >
                Обед
              </Button>
              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                active={selectedTime === 'SNACK'}
                onClick={() => setSelectedTime('SNACK')}
              >
                Полдник
              </Button>
            </div>
            <h1 className={`${styles.mainTitle}`}>Рацион</h1>
          </div>
          <div
            className={`${styles.orderContainer} d-flex justify-content-end align-items-start`}
          >
            <div className={`${styles.calendarContainer}`}>
              <Button
                variant="outline-success"
                className={`${styles.calendarBtn}`}
                // onClick={() => setCalendarFlag(calendarFlag ? false : true)}
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
                // locale="ru"
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
                            className={`${styles.cardDish}  d-flex flex-column align-items-center justify-content-start`}
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
