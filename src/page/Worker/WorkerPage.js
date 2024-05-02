import React from 'react';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import backgr from '../../assets/bgProfile.png';
import MainButton from '../../components/buttons/MainButton/MainButton';
import {
  ADMIN_WORK_WITH_PROFILE_ROUTE,
  WORKER_WORK_WITH_DISHES,
  WORKER_WORK_WITH_MENU,
} from '../../utils/consts';
import icoWrokDish from '../../assets/worker/book.png';
import icoWrokMenu from '../../assets/worker/list.png';
import icoViewMenu from '../../assets/worker/icon-menu.png';
import styles from './WorkerPage.module.css';

const WorkerPage = () => {
  return (
    <>
      <ProfileMainInfo />
      <div
        className={`mt-5 ${styles.workerBody}`}
        style={{
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${styles.workerContainer}`}
        >
          <div
            style={{ width: '100%', flexWrap: 'wrap' }}
            className="d-flex justify-content-evenly align-items-center"
          >
            <MainButton
              value={'Работа с блюдами'}
              route={WORKER_WORK_WITH_DISHES}
              ico={icoWrokDish}
            />
            <MainButton
              value={'Работа с меню'}
              route={WORKER_WORK_WITH_MENU}
              ico={icoWrokMenu}
            />
            <MainButton
              value={'Посмотреть меню'}
              route={ADMIN_WORK_WITH_PROFILE_ROUTE}
              ico={icoViewMenu}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerPage;
