import React, { useEffect, useRef } from 'react';
import styles from './InputsDishBuilder.module.css';
import { observer } from 'mobx-react-lite';
import AutoNumeric from 'autonumeric';

const InputsDishBuilder = observer(
  ({ setName, setPrice, setDescription, name, price, description }) => {
    const priceInputRef = useRef(null);

    const formater = (eve) => {
      if (eve.key === '+' || eve.key === '-') {
        eve.preventDefault();
      }
    };

    useEffect(() => {
      const an = new AutoNumeric(priceInputRef.current, price, {
        decimalCharacter: ',',
        digitGroupSeparator: ' ',
        styleRules: AutoNumeric.options.styleRules.positiveNegative,
      });

      return () => {
        an.remove();
      };
    }, []);

    return (
      <div>
        <textarea
          className={`${styles.inputTitle}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название блюда"
        ></textarea>
        <div className={`${styles.imputPriceContainer}`}>
          ₽&nbsp;
          <input
            ref={priceInputRef}
            className={`${styles.imputPrice}`}
            type="text"
            onKeyDown={formater}
            onChange={(e) =>
              setPrice(
                parseFloat(e.target.value.replace(/ /g, '').replace(',', '.'))
              )
            }
            placeholder="Цена"
          ></input>
        </div>
        <div className={`${styles.description}`}>
          <p>Состав:</p>
          <textarea
            className={`${styles.inputDescr}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
          ></textarea>
        </div>
      </div>
    );
  }
);

export default InputsDishBuilder;
