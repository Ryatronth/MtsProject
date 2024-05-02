import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './ShowDishesToSelect.module.css';
import ProfileCardDishToSelect from '../../../blocks/ProfileCard/ProfileCardDishToSelect/ProfileCardDishToSelect';

const ShowDishesToSelect = observer(
  ({ selectedTime, dishesList, funcAddSet, funcSubSet, exDishesList }) => {
    const filteredListData = dishesList.filter((data) => {
      if (selectedTime === 'ALL') return data;
      const groupMatch = data.category === selectedTime;
      return groupMatch;
    });

    return (
      <div style={{ marginBottom: '134px' }} className={`${styles.mainInfo}`}>
        <div
          style={{ maxHeight: '745px' }}
          className={`${styles.section} d-flex ${
            filteredListData.length % 5 > 2 || filteredListData.length % 5 === 0
              ? 'justify-content-center'
              : 'justify-content-start'
          }`}
        >
          {filteredListData.map((data) => (
            <ProfileCardDishToSelect
              key={data.id}
              dishData={data}
              dishesList={dishesList}
              funcAddSet={funcAddSet}
              funcSubSet={funcSubSet}
              exDishesList={exDishesList}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default ShowDishesToSelect;
