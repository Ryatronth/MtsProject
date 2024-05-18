import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './InformationSwitch.module.css';

const InformationSwitch = ({ text, setFunc, info }) => {
  return (
    <Button
      variant="outline-success"
      className={`${styles.btn}`}
      active={info === text}
      onClick={() => setFunc(text)}
    >
      {text}
    </Button>
  );
};

export default InformationSwitch;
