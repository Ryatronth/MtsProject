import React from 'react';
import exit from '../../../assets/exit.png';
import { Image } from 'react-bootstrap';
import styles from './ModalWindowAdd.module.css';
import ShowChildToSelect from '../Show/ShowChildToSelect/ShowChildToSelect';

const ModalWindowAdd = ({
  childData,
  groupData,
  listChild,
  setListChild,
  setModuleFlag,
}) => {
  return (
    <div className={`${styles.blur}`}>
      <div
        className={`${styles.mainInfo} d-flex flex-column align-items-center`}
      >
        <Image
          className={`${styles.exit}`}
          src={exit}
          onClick={() => {
            setModuleFlag(false);
            document.body.style.overflow = '';
          }}
        />
        <p className={`text-center ${styles.descr}`}>Выберите ребёнка</p>
        <div style={{ width: '1007px' }}>
          <ShowChildToSelect
            childData={childData}
            groupData={groupData}
            listChild={listChild}
            setListChild={setListChild}
            setModuleFlag={setModuleFlag}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWindowAdd;
