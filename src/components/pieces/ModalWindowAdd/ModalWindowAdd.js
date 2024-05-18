import React from 'react';
import ShowChildToSelect from '../Show/ShowChildToSelect/ShowChildToSelect';
import styles from './ModalWindowAdd.module.css';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';

const ModalWindowAdd = ({
  childData,
  setAllChild,
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
        <CloseWindow func={setModuleFlag} />
        <p className={`text-center ${styles.descr}`}>Выберите ребёнка</p>
        <div className={`${styles.infoBlock}`}>
          <ShowChildToSelect
            childData={childData}
            setAllChild={setAllChild}
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
