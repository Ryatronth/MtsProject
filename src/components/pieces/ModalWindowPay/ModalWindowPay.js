import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import exit from '../../../assets/exit.png';
import styles from './ModalWindowPay.module.css';
import { getChildrenForParent, getPayment, pay } from '../../../http/userAPI';
import { jwtDecode } from 'jwt-decode';
import ShowOrderByChild from '../Show/ShowOrderByChild/ShowOrderByChild';
import { observer } from 'mobx-react-lite';

const ModalWindowPay = observer(({ setFlag }) => {
  const [mainData, setMainData] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  const onPay = () => {
    const xx = mainData.reduce((acc, obj) => acc + obj.data.totalPrice, 0);
    if (xx) {
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
              ₽&nbsp;
              {mainData.reduce((acc, obj) => acc + obj.data.totalPrice, 0)}
            </span>
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
