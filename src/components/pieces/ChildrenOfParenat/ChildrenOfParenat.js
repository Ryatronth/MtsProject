import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SpinnerMain from '../../loaders/SpinnerMain';
import ProfileCardChildForParent from '../../blocks/ProfileCard/ProfileCardChildForParent/ProfileCardChildForParent';
import { getChildrenForParent } from '../../../http/userAPI';
import styles from './ChildrenOfParenat.module.css';

const ChildrenOfParenat = ({ orientation }) => {
  const [loading, setLoading] = useState(true);
  const [childrenList, setChildrenList] = useState([]);

  const styleOrient = orientation === 'burger' ? styles.burg : styles.choco

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
      className={`${styles.mainContainer} ${styleOrient} d-flex flex-wrap`}
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
