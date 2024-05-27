import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import styles from './MainButton.module.css';

const MainButton = ({ value, route, ico, func }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.container} d-flex flex-column align-items-center`}
    >
      <Image src={ico} />
      <Button
        variant="success"
        className={`${styles.mainBtn}`}
        onClick={route ? () => navigate(route) : func}
      >
        {value}
      </Button>
    </div>
  );
};

export default MainButton;
