import React from 'react';

const InputMainInfo = () => {
  return (
    <div className="d-flex justify-content align-items-center column-gap-lg-5">
      <div className="d-flex flex-column ">
        <h2 className="general-header__title">ФИО:</h2>
        <input
          className="px-4 py-2 mt-2 general-header__text"
          style={{
            maxWidth: '579px',
            minWidth: '479px',
          }}
        ></input>
        <h2 className="mt-4 general-header__title">Номер телефона:</h2>
        <input
          className="px-4 py-2 mt-2 general-header__text"
          style={{
            maxWidth: '230px',
            minWidth: '200px',
          }}
        ></input>
      </div>
      <div className="d-flex flex-column ">
        <h2 className="general-header__title">Usetname:</h2>
        <input
          className="px-4 py-2 mt-2 general-header__text"
          style={{
            maxWidth: '300px',
            minWidth: '270px',
          }}
        ></input>
        <h2 className="mt-4 general-header__title">Пароль:</h2>
        <input
          className="px-4 py-2 mt-2 general-header__text"
          style={{
            maxWidth: '300px',
            minWidth: '270px',
          }}
        ></input>
      </div>
    </div>
  );
};

export default InputMainInfo;
