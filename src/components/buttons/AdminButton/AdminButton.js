import React from 'react';
import { Button, Image } from 'react-bootstrap';
import ico from '../../../assets/admin/ico-adminBtn.png';
import { useNavigate } from 'react-router-dom';
import styles from './AdminButton.module.css';

const AdminButton = ({ value, route }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.mainContainerAdmin} d-flex flex-column align-items-center`}
    >
      <Image src={ico} />
      <Button
        className={`${styles.adminBtn}`}
        variant="success"
        onClick={() => navigate(route)}
      >
        {value}
      </Button>
    </div>
  );
};

export default AdminButton;
