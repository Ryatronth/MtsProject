import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './BackButton.module.css';

const BackButton = (props) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="danger"
      className={`${styles.exit}`}
      onClick={() => navigate(props.route)}
    >
      Назад
    </Button>
  );
};

export default BackButton;
