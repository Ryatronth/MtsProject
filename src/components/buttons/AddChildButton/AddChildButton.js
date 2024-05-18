import React from 'react';
import { Button, Image } from 'react-bootstrap';
import icoAdd from '../../../assets/admin/ico-addChildBtn.png';
import styles from './AddChildButton.module.css';

const AddChildButton = (props) => {
  return (
    <label
      htmlFor="BTN"
      className={`${styles.btnContainer} d-flex justify-content-center align-items-center`}
    >
      <Button
        id="BTN"
        variant="outline-success"
        className={`${styles.addBtn} d-flex justify-content-center align-items-center`}
        onClick={() => {
          props.func(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        <Image src={icoAdd} />
      </Button>
    </label>
  );
};

export default AddChildButton;
