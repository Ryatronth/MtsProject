import React from 'react';
import styles from './InputsProfileBuilder.module.css';

const InputsProfileBuilder = ({ list }) => {
  const choice = {
    fio: { text: 'ФИО:', placeholder: 'Введите ФИО', style: styles.fio },
    phone: {
      text: 'Номер телефона:',
      placeholder: 'Введите телефон',
      style: styles.phone,
    },
    login: {
      text: 'Логин:',
      placeholder: 'Введите логин',
      style: styles.login,
    },
    password: {
      text: 'Пароль:',
      placeholder: 'Введите пароль',
      style: styles.password,
    },
  };
  return (
    <div className="d-flex flex-column ">
      {list.map((obj) => (
        <>
          <h2 className={`${styles.inputTitle}`}>{choice[obj.variant].text}</h2>
          <input
            ref={obj.ref}
            className={`${styles.inputText} ${choice[obj.variant].style}`}
            value={obj.value}
            onChange={(e) => obj.func(e.target.value)}
            placeholder={choice[obj.variant].placeholder}
          ></input>
        </>
      ))}
    </div>
  );
};

export default InputsProfileBuilder;
