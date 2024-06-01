import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import ShowOrderByChild from '../Show/ShowOrderByChild/ShowOrderByChild';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';
import { getChildrenForParent, getPayment, pay } from '../../../http/userAPI';
import styles from './ModalWindowPay.module.css';

const ModalWindowPay = observer(({ setFlag }) => {
  const [mainData, setMainData] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const onPay = () => {
    if (total) {
      children.forEach((child) => {
        pay(child.id).then((data) => console.log(data));
      });
    }
    setFlag(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qparametr = `?parentId=${
          jwtDecode(localStorage.getItem('token')).id
        }`;
        const childrenList = await getChildrenForParent(qparametr);
        const listChildID = childrenList.map((obj) => obj.id);

        const resData = await Promise.all(
          listChildID.map(async (id) => {
            const res = await getPayment(id);
            return { id: id, data: res };
          })
        );
        setChildren(childrenList);
        setMainData(resData);
        setTotal(resData.reduce((acc, obj) => acc + obj.data.totalPrice, 0));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <CloseWindow func={setFlag} />
        <p className={`${styles.descr} text-center`}>Оплата</p>
        <div className={`${styles.childrenBlock}`}>
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
            <span>₽&nbsp;{total}</span>
          </p>
          <Button
            variant="success"
            className={`${styles.resBtn}`}
            onClick={onPay}
          >
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ModalWindowPay;
