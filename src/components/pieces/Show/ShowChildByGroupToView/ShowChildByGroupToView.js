import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import ico from '../../../../assets/prewChild.png';
import styles from './ShowChildByGroupToView.module.css';
import ModalWindowPreview from '../../ModalWindowPreview/ModalWindowPreview';

const ShowChildByGroupToView = ({ mainData, date, group }) => {
  // console.log(mainData);
  const [modalWindowFlag, setModalWindowFlag] = useState(false);
  const [modalWindowInfo, setModalWindowInfo] = useState(false);

  // console.log(mainData, group);

  if (!mainData) {
    return <div>Ни одной группы нет</div>;
  }

  if (!mainData.length) {
    return <div>У группы нет блюд</div>;
  }
  const viewModal = (ob) => {
    setModalWindowFlag(!modalWindowFlag);
    setModalWindowInfo(ob);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div
      className={`${styles.mainContainer} d-flex flex-column align-items-center`}
    >
      <h2>Группа:&nbsp;&nbsp;{group}</h2>
      <div className={`${styles.listContainer} d-flex flex-column`}>
        {mainData.map((ob) => (
          <div
            key={ob.id}
            className={`${styles.profileCard} d-flex justify-content-between align-items-center`}
            onClick={() => viewModal(ob)}
          >
            <div
              style={{ columnGap: '70px' }}
              className={`d-flex align-items-center`}
            >
              <Image src={ob?.child?.imageUrl || ico} />
              <p>
                {ob.surname} {ob.name} {ob.patronymic}
              </p>
            </div>
            <p>ID&nbsp;:&nbsp;{ob.id}</p>
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
