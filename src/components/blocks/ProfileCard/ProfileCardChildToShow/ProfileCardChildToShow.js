import React from 'react';
import styles from './ProfileCardChildToShow.module.css';
import ico from '../../../../assets/admin/ico-childAva-182.png';
import { Image } from 'react-bootstrap';

const ProfileCardChildToShow = ({
  data,
  listChild,
  setListChild,
  id,
  allChild,
  setAllChild,
}) => {
  return (
    <div
      id={id}
      className={`${styles.mainContainer} d-flex justify-content-start align-items-center CARD`}
    >
      <Image src={data.imageUrl || ico} />
      <div
        className={`${styles.mianInfo} d-flex flex-column align-items-start justify-content-center`}
      >
        <p>
          {data.surname}
          <br />
          {data.name}
          <br />
          {data.patronymic}
        </p>
        {data.childGroup.id}
      </div>
      <span
        className={`${styles.minus}`}
        onClick={() => {
          setListChild(listChild.filter((child) => child.id !== data.id));
          setAllChild([...allChild, data]);
        }}
      >
        -
      </span>
    </div>
  );
};

export default ProfileCardChildToShow;
