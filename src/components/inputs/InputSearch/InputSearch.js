import React from 'react';
import styles from './InputSearh.module.css';

const InputSearch = ({
  customHeight,
  customWidth,
  searchValue,
  setSearchValue,
}) => {
  return (
    <input
      style={{
        width: customWidth,
        height: customHeight ? customHeight : '45px',
      }}
      className={`${styles.inputSearch}`}
      placeholder="Поиск"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    ></input>
  );
};

export default InputSearch;
