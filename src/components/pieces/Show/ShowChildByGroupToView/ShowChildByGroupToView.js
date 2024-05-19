import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import ModalWindowPreview from '../../ModalWindowPreview/ModalWindowPreview';
import ico from '../../../../assets/prewChild.png';
import styles from './ShowChildByGroupToView.module.css';

const ShowChildByGroupToView = ({ mainData, date, group }) => {
  const [modalWindowFlag, setModalWindowFlag] = useState(false);
  const [modalWindowInfo, setModalWindowInfo] = useState(false);

  if (!mainData) {
    return <div>Ни одной группы нет</div>;
  }

  if (!mainData.length) {
    return <div>У группы нет блюд</div>;
  }
  const viewModal = (obj) => {
    setModalWindowFlag(!modalWindowFlag);
    setModalWindowInfo(obj);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div
      className={`${styles.mainContainer} d-flex flex-column align-items-center`}
    >
      <h2>Группа:&nbsp;&nbsp;{group}</h2>
      <div className={`${styles.listContainer} d-flex flex-column`}>
        {mainData.map((obj) => (
          <div
            key={obj.id}
            className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
            onClick={() => viewModal(obj)}
          >
            <div className={`${styles.mainInf} d-flex align-items-center`}>
              <Image src={obj?.child?.imageUrl || ico} />
              <p>
                {obj.surname} {obj.name} {obj.patronymic}
              </p>
            </div>
            <p>ID&nbsp;:&nbsp;{obj.id}</p>
          </div>
        ))}
      </div>
      {modalWindowFlag && (
        <ModalWindowPreview
          mainData={modalWindowInfo}
          setFlag={setModalWindowFlag}
          date={date}
        />
      )}
    </div>
  );
};

export default ShowChildByGroupToView;
