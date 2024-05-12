import React, { useState } from 'react';
import {
  PARENT_CREATE_ORDER_ROUTE,
  PARENT_VIEW_ORDER_ROUTE,
} from '../../utils/consts';
import backgr from '../../assets/bgProfile.png';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import styles from './ParentPage.module.css';
import { Button } from 'react-bootstrap';
import ChildrenOfParenat from '../../components/pieces/ChildrenOfParenat/ChildrenOfParenat';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ModalWindowPay from '../../components/pieces/ModalWindowPay/ModalWindowPay';

const ParentPage = observer(() => {
  const navigate = useNavigate();
  const [orientation, setOrientation] = useState('chocolate');
  const [flag, setFlag] = useState(false);
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
            style={{ width: '100%', flexWrap: 'wrap' }}
            className={`d-flex justify-content-between align-items-start`}
          >
            <ChildrenOfParenat orientation={orientation} />
            <div
              style={{ rowGap: '41px' }}
              className="d-flex flex-column justify-content-evenly align-items-center"
            >
              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                onClick={() => navigate(PARENT_VIEW_ORDER_ROUTE)}
              >
                Посмотреть рацион
              </Button>
              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                onClick={() => navigate(PARENT_CREATE_ORDER_ROUTE)}
              >
                Сформировать рацион
              </Button>
              <Button
                variant="success"
                className={`${styles.mainBtn}`}
                onClick={() => setFlag(true)}
              >
                Оплатить
              </Button>
            </div>
          </div>
        </div>
        {flag && <ModalWindowPay setFlag={setFlag} />}
      </div>
    </>
  );
});

export default ParentPage;
