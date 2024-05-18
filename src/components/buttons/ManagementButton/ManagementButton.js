import React from 'react';
import styles from './ManagementButton.module.css';
import { Button } from 'react-bootstrap';

const ManagementButton = ({ mainFunc, secondFunc, variant, text }) => {
  // mainFunc --> функция ради которой создаётся кнопка (пока не обязательно)
  // secondFunc --> второстепенная функция, всегда вернёт false | НЕ ОБЯЗАТЕЛЬНО |
  // variant --> стиль кнопки | ОБЯЗАТЕЛЬНО |
  // text --> текст внутри кнопки | ОБЯЗАТЕЛЬНО |
  const choice = {
    success: { option: 'success', style: styles.mainBtnSuccess },
    danger: { option: 'danger', style: styles.mainBtnDelete },
    successCreate: { option: 'success', style: styles.mainBtnCreate },
    dangerDeleteOnWindow: {
      option: 'danger',
      style: styles.mainBtnDeleteOnWin,
    },
    dangerDeleteOnCard: { option: 'danger', style: styles.mainBtnDeleteOnCard },
    successSelectOnCard: {
      option: 'success',
      style: styles.mainBtnSelectOnCard,
    },
    successSaveProfile: {
      option: 'success',
      style: styles.mainBtnSaveProfile,
    },
    dangerDeleteProfile: {
      option: 'danger',
      style: styles.mainBtnCencelProfile,
    },
  };

  return (
    <Button
      variant={choice[variant].option}
      className={`${styles.mainBtnStyle} ${choice[variant].style}`}
      onClick={() => {
        if (!!secondFunc) secondFunc(false);
        if (!!mainFunc) mainFunc();
      }}
    >
      {text || ''}
    </Button>
  );
};

export default ManagementButton;
