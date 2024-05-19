import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import InputDishPicture from '../../inputs/InputDishPicture/InputDishPicture';
import CloseWindow from '../../buttons/CloseWindow/CloseWindow';
import InputsDishBuilder from '../../blocks/InputsDishBuilder/InputsDishBuilder';
import styles from './TempWindow.module.css';

const TempWindow = ({
  setFlag,
  setImage,
  setImageSrc,
  imageSrc,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  category,
  setCategory,
  clickCreateDish,
}) => {
  return (
    <div className={`${styles.blur}`}>
      <div className={`${styles.mainInfo} d-flex flex-column`}>
        <CloseWindow func={setFlag} />
        <div className={`d-flex justify-content-start align-items-start`}>
          <InputDishPicture
            setImage={setImage}
            setImageSrc={setImageSrc}
            imageSrc={imageSrc}
          />
          <div
            className={`${styles.infoBlock} d-flex flex-column align-items-start justify-content-start row-gap-5`}
          >
            <InputsDishBuilder
              setName={setName}
              setPrice={setPrice}
              setDescription={setDescription}
              name={name}
              price={price}
              description={description}
            />
            <div
              className={`${styles.dropContainer} d-flex flex-column justify-content-between`}
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className="children-card__dropdown-groups"
                >
                  {category || 'Выберите категорию'}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '263px' }}>
                  <Dropdown.Item onClick={() => setCategory('breakfast')}>
                    Завтрак
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory('lunch')}>
                    Обед
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCategory('snack')}>
                    Полдник
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="success"
                className={`${styles.saveBtn}`}
                onClick={() => clickCreateDish()}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempWindow;
