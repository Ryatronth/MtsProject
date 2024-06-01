import React from 'react';
import { Image } from 'react-bootstrap';
import ico from '../../../../assets/admin/ico-childAva-182.png';
import burgStyles from './ProfileCardChildForParentBurger.module.css';
import chocoStyles from './ProfileCardChildForParentChoco.module.css';

const ProfileCardChildForParent = ({ data, id, orientation }) => {
  const styles = orientation === 'burger' ? burgStyles : chocoStyles;

  return (
    <div
      id={id}
      className={`${styles.container} d-flex justify-content-start align-items-center CARD`}
    >
      <Image src={data.imageUrl || ico} />
      <div className={`${styles.infoBlock} d-flex`}>
        <p className={styles.info}>
          {data.surname} <span>{data.name}</span> {data.patronymic}
        </p>
        {data.childGroup.id}
      </div>
    </div>
  );
};

export default ProfileCardChildForParent;
