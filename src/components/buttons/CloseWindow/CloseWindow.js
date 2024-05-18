import React from 'react';
import { Image } from 'react-bootstrap';
import exit from '../../../assets/exit.png';
import styles from './CloseWindow.module.css';

const CloseWindow = (props) => {
  return (
    <Image
      className={`${styles.exit}`}
      src={exit}
      onClick={() => {
        props.func(false);
        document.body.style.overflow = '';
      }}
    />
  );
};

export default CloseWindow;
