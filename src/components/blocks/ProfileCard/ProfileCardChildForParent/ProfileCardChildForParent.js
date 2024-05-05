import React from 'react';
import ico from '../../../../assets/admin/ico-childAva-182.png';
import { Image } from 'react-bootstrap';
import styles from './ProfileCardChildForParent.module.css';

const ProfileCardChildForParent = ({ data, id, orientation }) => {
  if (orientation === 'burger') {
    return (
      <div
        id={id}
        className={`${styles.mainContainerBurger} d-flex justify-content-start align-items-center CARD`}
      >
        <Image style={{ maxWidth: '84px' }} src={data.imageUrl || ico} />
        <div
          className={`${styles.mianInfoBurger} d-flex align-items-center justify-content-between`}
        >
          <p>
            {data.surname} {data.name} {data.patronymic}
          </p>
          {data.childGroup.id}
        </div>
      </div>
    );
  } else {
    return (
      <div
        id={id}
        className={`${styles.mainContainerChoco} d-flex justify-content-start align-items-center CARD`}
      >
        <Image src={data.imageUrl || ico} />
        <div
          className={`${styles.mianInfoChoco} d-flex flex-column align-items-start justify-content-center`}
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
      </div>
    );
  }
};

export default ProfileCardChildForParent;
