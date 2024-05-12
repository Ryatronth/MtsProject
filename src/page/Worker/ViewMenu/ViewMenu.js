import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { Context } from '../../..';
import { useNavigate } from 'react-router-dom';
import { PDF_ROUTE, WORKER_ROUTE } from '../../../utils/consts';
import ReactDatePicker from 'react-datepicker';
import ico from '../../../assets/parent/ico-calendar.png';
import styles from './ViewMenu.module.css';
import { getOrdersForWorker } from '../../../http/userAPI';
import ShowChildByGroupToView from '../../../components/pieces/Show/ShowChildByGroupToView/ShowChildByGroupToView';

const ViewMenu = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [dataByGroup, setDataByGroup] = useState([]);
  const [allGroupList, setAllGroupList] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  const [selectDate, setSelectDate] = useState(new Date());
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [dishCount, setDishCount] = useState([]);

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    console.log(day);
    return day !== 0 && day !== 6;
  };

  const handlePDF = () => {
    navigate(PDF_ROUTE, {
      state: { data: dishCount, group: selectGroup },
    });
  };

  const handleSelect = (group) => {
    setSelectGroup(group);
    setDataByGroup(allData[group]);
    const dishCounts = {};
    allData[group].forEach((order) => {
      order.dishes.forEach((dish) => {
        if (dishCounts[dish.id]) {
          dishCounts[dish.id].count++;
        } else {
          dishCounts[dish.id] = {
            id: dish.id,
            name: dish.name,
            count: 1,
          };
        }
      });
    });
    setDishCount(Object.values(dishCounts));
  };

  const onChange = async (dates) => {
    setSelectDate(dates);
    let qparametr = `?date=${dates.getFullYear()}-${(dates.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dates.getDate().toString().padStart(2, '0')}`;

    await getOrdersForWorker(qparametr).then((data) => {
      if (Object.keys(data).length === 0) {
        alert('Групп нет!');
      } else {
        setAllData(data);
        setDataByGroup(data[selectGroup]);
        const dishCounts = {};
        data[selectGroup].forEach((order) => {
          order.dishes.forEach((dish) => {
            if (dishCounts[dish.id]) {
              dishCounts[dish.id].count++;
            } else {
              dishCounts[dish.id] = {
                id: dish.id,
                name: dish.name,
                count: 1,
              };
            }
          });
        });
        setDishCount(Object.values(dishCounts));
      }
    });
  };

  useEffect(() => {
    let qparametr = `?date=${selectDate.getFullYear()}-${(
      selectDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectDate.getDate().toString().padStart(2, '0')}`;

    getOrdersForWorker(qparametr).then((data) => {
      console.log(Object.keys(data).length);
      if (Object.keys(data).length === 0) {
        alert('Групп нет');
      } else {
        let groupList = Object.keys(data);
        setAllGroupList(groupList);
        setAllData(data);
        setSelectGroup(groupList[0]);
        setDataByGroup(data[groupList[0]]);
        const dishCounts = {};
        data[groupList[0]].forEach((order) => {
          order.dishes.forEach((dish) => {
            if (dishCounts[dish.id]) {
              dishCounts[dish.id].count++;
            } else {
              dishCounts[dish.id] = {
                id: dish.id,
                name: dish.name,
                count: 1,
              };
            }
          });
        });
        setDishCount(Object.values(dishCounts));
      }
    });
  }, []);

  return (
    <div className="reset-container">
      <ProfileHeader info={user.user} />
      <div className={`d-flex flex-column align-items-center`}>
        <div
          style={{ width: '100%', columnGap: '75px' }}
          className={`d-flex justify-content-center align-items-center mt-5`}
        >
          <Button
            variant="danger"
            className={`reset-btn ${styles.exit}`}
            onClick={() => navigate(WORKER_ROUTE)}
          >
            Назад
          </Button>
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
              {selectGroup || 'Выберите группу'}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="success" className={`${styles.dropMenu}`}>
              {allGroupList.map((group) => (
                <Dropdown.Item
                  key={group}
                  variant="success"
                  eventKey={group}
                  className={
                    selectGroup === group
                      ? styles.dropSelElem
                      : styles.dropSimpleElem
                  }
                >
                  {group}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className={`${styles.calendarContainer}`}>
            <Button
              variant="outline-success"
              className={`${styles.calendarBtn}`}
              onClick={() => setCalendarFlag(calendarFlag ? false : true)}
            >
              <Image src={ico} className={`${styles.calendarBtnImage}`} />
            </Button>
            {calendarFlag && (
              <ReactDatePicker
                calendarClassName={`${styles.customCalendar}`}
                selected={selectDate}
                onChange={onChange}
                minDate={new Date()}
                inline
                showDisabledMonthNavigation
                onClick={(e) => e.stopPropagation()}
                filterDate={isWeekday}
                // locale="ru"
              />
            )}
          </div>
        </div>
        <div style={{ width: '1110px', marginTop: '100px' }}>
          <ShowChildByGroupToView mainData={dataByGroup} date={selectDate} />
        </div>
        <Button
          variant="success"
          className={`${styles.savePdf}`}
          disabled={dataByGroup && !dataByGroup.length}
          onClick={async () => handlePDF()}
        >
          Сформировать PDF
        </Button>
      </div>
    </div>
  );
};

export default ViewMenu;
