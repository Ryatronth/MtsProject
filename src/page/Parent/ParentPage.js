import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import ChildrenOfParenat from '../../components/pieces/ChildrenOfParenat/ChildrenOfParenat';
import ModalWindowPay from '../../components/pieces/ModalWindowPay/ModalWindowPay';
import {
  PARENT_CREATE_ORDER_ROUTE,
  PARENT_VIEW_ORDER_ROUTE,
} from '../../utils/consts';
import styles from './ParentPage.module.css';

const ParentPage = observer(() => {
  const navigate = useNavigate();
  const [orientation, setOrientation] = useState('chocolate');
  const [flag, setFlag] = useState(false);
  const basicList = [
    {
      func: () => navigate(PARENT_VIEW_ORDER_ROUTE),
      text: 'Посмотреть рацион',
    },
    {
      func: () => navigate(PARENT_CREATE_ORDER_ROUTE),
      text: 'Сформировать рацион',
    },
    { func: () => setFlag(true), text: 'Оплатить' },
  ];

  const toggleMenu = () => {
    const menu = document.querySelector('.childBtn');
    if (menu.classList.contains('burger')) {
      menu.classList.replace('burger', 'chocolate');
      setOrientation('chocolate');
    } else if (menu.classList.contains('chocolate')) {
      menu.classList.replace('chocolate', 'burger');
      setOrientation('burger');
    } else {
      menu.classList.add('burger');
      setOrientation('burger');
    }
  };

  return (
    <>
      <ProfileMainInfo />
      <div className={`${styles.parentBody} mt-5`}>
        <div
          className={`${styles.parentContainer} d-flex flex-column align-items-start`}
        >
          <div
            className={`${styles.childbtnCont} d-flex justify-content-between align-items-center`}
          >
            <h2 className={`${styles.childTitle}`}>Дети</h2>
            <button
              className={`${styles.childBtn} childBtn`}
              onClick={() => toggleMenu()}
            >
              <div className={`${styles.mainSpan} mainSpan`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`${styles.mainSpan} mainSpan`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`${styles.mainSpan} mainSpan`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div
            className={`${styles.mainContainer} d-flex justify-content-between align-items-start`}
          >
            <ChildrenOfParenat orientation={orientation} />
            <div
              className={`${styles.mainBtnContainer} d-flex flex-column justify-content-evenly align-items-center`}
            >
              {basicList.map((obj) => (
                <Button
                  key={obj.text}
                  variant="success"
                  className={`${styles.mainBtn}`}
                  onClick={obj.func}
                >
                  {obj.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {flag && <ModalWindowPay setFlag={setFlag} />}
      </div>
    </>
  );
});

export default ParentPage;
