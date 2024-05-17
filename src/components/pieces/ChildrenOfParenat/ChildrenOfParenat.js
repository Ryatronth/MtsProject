import React, { useEffect, useState } from 'react';
import { getChildrenForParent } from '../../../http/userAPI';
import SpinnerMain from '../../loaders/SpinnerMain';
import { jwtDecode } from 'jwt-decode';
import styles from './ChildrenOfParenat.module.css';
import ProfileCardChildForParent from '../../blocks/ProfileCard/ProfileCardChildForParent/ProfileCardChildForParent';

const ChildrenOfParenat = ({ orientation }) => {
  const [loading, setLoading] = useState(true);
  const [childrenList, setChildrenList] = useState(true);

  useEffect(() => {
    let qparametr = `?parentId=${jwtDecode(localStorage.getItem('token')).id}`;
    getChildrenForParent(qparametr)
      .then((data) => {
        setChildrenList(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative' }}>
        <SpinnerMain />
      </div>
    );
  }

  return (
    <div
      style={{ gap: orientation === 'burger' ? '48px' : '' }}
      className={`d-flex flex-wrap ${styles.mainContainer}`}
    >
      {childrenList.map((child) => (
        <ProfileCardChildForParent
          key={child.id}
          id={child.id}
          data={child}
          orientation={orientation}
        />
      ))}
    </div>
  );
};

export default ChildrenOfParenat;
