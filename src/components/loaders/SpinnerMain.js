import React from 'react';
import styles from './SpinnerMain.module.css';

const SpinnerMain = () => {
  return (
    <div className={`${styles.load}`}>
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  );
};

export default SpinnerMain;
