import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './MainButton.module.css';

const MainButton = ({ value, route, ico }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.mainContainerBtn} d-flex flex-column align-items-center`}
    >
      <Image src={ico} />
      <Button
        className={`${styles.mainBtn}`}
        variant="success"
        onClick={() => navigate(route)}
      >
        {value}
      </Button>
    </div>
  );
};

export default MainButton;
