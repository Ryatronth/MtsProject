import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import exit from '../../../assets/exit.png';
import styles from './ModalWindowPay.module.css';
import {
  getChildrenForParent,
  getOrderIdForParent,
} from '../../../http/userAPI';
import { jwtDecode } from 'jwt-decode';
import ShowOrderByChild from '../Show/ShowOrderByChild/ShowOrderByChild';
import { observer } from 'mobx-react-lite';

const ModalWindowPay = observer(({ setFlag }) => {
  const [mainData, setMainData] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addLeadingZero = (number) => (number < 10 ? '0' + number : number);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const datesArray = [];
    for (
      let i = firstDayOfMonth.getDate();
      i <= lastDayOfMonth.getDate();
      i++
    ) {
      const formattedDate = `${currentDate.getFullYear()}-${addLeadingZero(
        currentDate.getMonth() + 1
      )}-${addLeadingZero(i)}`;
      datesArray.push(formattedDate);
    }
    const func = async () => {
      let qparametr = `?parentId=${
        jwtDecode(localStorage.getItem('token')).id
      }`;
      await getChildrenForParent(qparametr).then((childrenList) => {
        setChildren(childrenList);
        let resArr = [];
        childrenList.forEach((child, i) => {
          let arr = [];
          const promises = [];
          datesArray.forEach((date) => {
            qparametr = `?date=${date}&childId=${child.id}`;
            promises.push(
              getOrderIdForParent(qparametr).then((data) => {
                arr.push(...data);
              })
            );
          });
          Promise.all(promises).then(() => {
            const totalPriceSum = arr.reduce((acc, o) => acc + o.totalPrice, 0);
            resArr.push({
              child: child,
              orders: arr,
              price: totalPriceSum,
            });
            setLoading(childrenList.length !== i + 1);
          });
        });
        setMainData(resArr);
      });
    };
    func();
  }, []);

  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <Image
          className={`${styles.exit}`}
          src={exit}
          onClick={() => {
            setFlag(false);
            document.body.style.overflow = '';
          }}
        />
        <p className={`text-center ${styles.descr}`}>Оплата</p>
        <div style={{ width: '990px' }}>
          <ShowOrderByChild
            childrenList={children}
            mainData={mainData}
            loading={loading}
          />
        </div>
        <div
          className={`${styles.result} d-flex justify-content-between align-items-center`}
        >
          <p className={`${styles.resDescr}`}>
            Итого:&nbsp;&nbsp;
            <span>
              ₽&nbsp;{mainData.reduce((acc, child) => acc + child.price, 0)}
            </span>
          </p>
          <Button variant="success" className={`${styles.resBtn}`}>
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ModalWindowPay;
