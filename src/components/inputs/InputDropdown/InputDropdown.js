import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './InputDropdown.module.css';

const InputDropdown = (props) => {
  const choice = {
    chooseChild: {
      style: styles.chooseChild,
      toggle: props.selectedGroup || 'Выберите группу',
    },
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        className="children-card__dropdown-groups"
      >
        {choice[props.variant].toggle}
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${choice[props.variant].styles}`}>
        <Dropdown.Item onClick={() => props.func(null)}>
          Выберите группу
        </Dropdown.Item>
        {!!props.list.length &&
          props.list.map((obj) => {
            return (
              <Dropdown.Item key={obj.id} onClick={() => props.func(obj.id)}>
                {obj.id}
              </Dropdown.Item>
            );
          })}
        {!props.list.length && <Dropdown.Item>Групп пока нет!</Dropdown.Item>}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default InputDropdown;
