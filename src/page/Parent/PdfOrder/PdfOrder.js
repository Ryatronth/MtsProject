import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './PdfOrder.module.css';
import { PARENT_ROUTE } from '../../../utils/consts';

const PdfOrder = () => {
  const location = useLocation();
  const { state } = location;
  const data = state?.data;
  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Заказ ребёнка: ${data.child.surname} ${data.child.name[0]} ${data.child.patronymic[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        .page-number:after {
          content: counter(page);
        }
      }
    `,
    onAfterPrint: () => navigate(PARENT_ROUTE),
  });

  useEffect(() => {
    data.orders.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
    handlePrint();
    console.log(data);
  }, []);
  return (
    <>
      <div
        ref={componentRef}
        className={`d-flex flex-column justify-content-center align-items-center`}
      >
        <h2 className={`${styles.pdfTitle}`}>
          {data.child.surname} {data.child.name[0]} {data.child.patronymic[0]}
        </h2>
        <div className={`${styles.tableWrapper}`}>
          <table className={`${styles.flTable}`}>
            <thead>
              <tr>
                <th>БЛЮДО</th>
                <th>СУММА</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.date}</td>
                  <td>₽&nbsp;{o.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PdfOrder;
