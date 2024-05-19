import React from 'react';
import { Button } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import BackButton from '../../buttons/BackButton/BackButton';
import InformationSwitch from '../../buttons/InformationSwitch/InformationSwitch';
import DishesToSelect from '../DishesToSelect/DishesToSelect';
import { WORKER_WORK_WITH_MENU } from '../../../utils/consts';
import styles from './TempEditCreateMenu.module.css';

const TempEditCreateMenu = ({
  btnList,
  containerList,
  setSelectedTime,
  selectedTime,
  func,
}) => {
  return (
    <div className={`${styles.container}`}>
      <ProfileHeader />
      <div className={`d-flex flex-column align-items-center`}>
        <div className={`${styles.previewSection} d-flex align-items-center`}>
          <BackButton route={WORKER_WORK_WITH_MENU} />
        </div>
        <div className={`d-flex column-gap-3 mb-4`}>
          {btnList.map((el) => (
            <InformationSwitch
              text={el}
              setFunc={setSelectedTime}
              info={selectedTime}
            />
          ))}
          <Button
            variant="outline-success"
            className={`${styles.mainBtn}`}
            onClick={func}
          >
            Сохранить
          </Button>
        </div>
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          {containerList.map((obj) => (
            <DishesToSelect key={obj.title} obj={obj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempEditCreateMenu;
