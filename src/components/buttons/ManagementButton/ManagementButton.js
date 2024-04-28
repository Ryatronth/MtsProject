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
    danger: { option: 'danger', style: styles.mainBtnCancel },
  };
  return (
    <Button
      variant={choice[variant].option}
      className={`reset-btn ${choice[variant].style}`}
      onClick={() => {
        if (!!secondFunc) secondFunc(false);
        if (!!mainFunc) mainFunc();
      }}
    >
      {text}
    </Button>
  );
};

export default ManagementButton;
