import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Image } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import ProfileHeader from '../../../components/pieces/ProfileHeader/ProfileHeader';
import ShowChildByGroupToView from '../../../components/pieces/Show/ShowChildByGroupToView/ShowChildByGroupToView';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import BackButton from '../../../components/buttons/BackButton/BackButton';
import { getOrdersForWorker } from '../../../http/userAPI';
import { dateToString } from '../../../utils/functions';
import { PDF_ROUTE, WORKER_ROUTE } from '../../../utils/consts';
import ico from '../../../assets/parent/ico-calendar.png';
import styles from './ViewMenu.module.css';

const ViewMenu = observer(() => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [dataByGroup, setDataByGroup] = useState([]);
  const [allGroupList, setAllGroupList] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  const [selectDate, setSelectDate] = useState(new Date());
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dishCount, setDishCount] = useState([]);

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  };

  const handlePDF = () => {
    navigate(PDF_ROUTE, {
      state: { data: dishCount, group: selectGroup },
    });
  };

  const handleSelect = (group) => {
    setSelectGroup(group);
    setDataByGroup(allData[group]?.details || []);
    const dishCounts = {};
    if (allData[group]) {
      allData[group].details.forEach((order) => {
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
    }
    setDishCount(Object.values(dishCounts));
  };

  const onChange = async (dates) => {
    setSelectDate(dates);
    let date = dateToString(dates);

    await getOrdersForWorker(date).then((data) => {
      if (Object.keys(data).length === 0) {
        alert('Групп нет!');
      } else {
        let groupList = Object.keys(data);
        const group = groupList.includes(selectGroup)
          ? selectGroup
          : groupList[0];
        setAllGroupList(groupList);
        setSelectGroup(group);
        setAllData(data);
        setDataByGroup(data[group]?.details || []);
        const dishCounts = {};
        if (data[group]) {
          data[group].details.forEach((order) => {
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
        }
        setDishCount(Object.values(dishCounts));
      }
    });
  };

  useEffect(() => {
    let date = dateToString(selectDate);

    getOrdersForWorker(date)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          // alert('Групп нет');
        } else {
          let groupList = Object.keys(data);
          setAllGroupList(groupList);
          setAllData(data);
          setSelectGroup(groupList[0]);
          setDataByGroup(data[groupList[0]].details);
          const dishCounts = {};
          data[groupList[0]].details.forEach((order) => {
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
          <BackButton route={WORKER_ROUTE} />
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
        <div className={`${styles.infoBlock}`}>
          <ShowChildByGroupToView
            mainData={dataByGroup}
            date={selectDate}
            group={selectGroup}
          />
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
});

export default ViewMenu;
