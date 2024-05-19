import React from 'react';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import MainButton from '../../components/buttons/MainButton/MainButton';
import {
  WORKER_VIEW_MENU_ROUTE as viewMenu,
  WORKER_WORK_WITH_DISHES as workDish,
  WORKER_WORK_WITH_MENU as workMenu,
} from '../../utils/consts';
import icoWrokDish from '../../assets/worker/book.png';
import icoWrokMenu from '../../assets/worker/list.png';
import icoViewMenu from '../../assets/worker/icon-menu.png';
import styles from './WorkerPage.module.css';

const WorkerPage = () => {
  const basicList = [
    { text: 'Работа с блюдами', route: workDish, ico: icoWrokDish },
    { text: 'Работа с меню', route: workMenu, ico: icoWrokMenu },
    { text: 'Посмотреть меню', route: viewMenu, ico: icoViewMenu },
  ];

  return (
    <>
      <ProfileMainInfo />
      <div className={`${styles.workerBody} mt-5`}>
        <div
          className={`${styles.mainBtn} d-flex justify-content-evenly align-items-center`}
        >
          {basicList.map((obj) => (
            <MainButton value={obj.text} route={obj.route} ico={obj.ico} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkerPage;
