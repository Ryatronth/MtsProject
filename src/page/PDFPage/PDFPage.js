import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { WORKER_VIEW_MENU_ROUTE } from '../../utils/consts';
import styles from './PDFPage.module.css';

const PDFPage = () => {
  const location = useLocation();
  const { state } = location;
  const data = state?.data;
  const group = state?.group;
  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Заказ для группы ${group}`,
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
    onAfterPrint: () => navigate(WORKER_VIEW_MENU_ROUTE),
  });

  useEffect(() => {
    handlePrint();
    console.log(data);
  }, []);
  return (
    <>
      <div
        ref={componentRef}
        className={`d-flex flex-column justify-content-center align-items-center`}
      >
        <h2 className={`${styles.pdfTitle}`}>{group}</h2>
        <div className={`${styles.tableWrapper}`}>
          <table className={`${styles.flTable}`}>
            <thead>
              <tr>
                <th>БЛЮДО</th>
                <th>КОЛ.-ВО</th>
              </tr>
            </thead>
            <tbody>
              {data.map((o) => (
                <tr key={o.id}>
                  <td>{o.name}</td>
                  <td>{o.count}</td>
                </tr>
              ))}
              {data.map((o) => (
                <tr key={o.id}>
                  <td>{o.name}</td>
                  <td>{o.count}</td>
                </tr>
              ))}
              {data.map((o) => (
                <tr key={o.id}>
                  <td>{o.name}</td>
                  <td>{o.count}</td>
                </tr>
              ))}
              {data.map((o) => (
                <tr key={o.id}>
                  <td>{o.name}</td>
                  <td>{o.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PDFPage;
