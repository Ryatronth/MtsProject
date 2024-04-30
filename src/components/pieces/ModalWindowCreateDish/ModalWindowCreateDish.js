import React, { useState } from 'react';
import exit from '../../../assets/exit.png';
import { Button, Dropdown, Image } from 'react-bootstrap';
import downArrow from '../../../assets/downArrow.png';
import { createDish } from '../../../http/userAPI';
import ico from '../../../assets/worker/ico-mainDish.png';
import styles from './ModalWindowCreateDish.module.css';
import { observer } from 'mobx-react-lite';

const ModalWindowCreateDish = observer(
  ({ setFlag, dishesList, setDishesList, selectedTime }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(selectedTime.toLowerCase());
    const [image, setImage] = useState('');

    const drowing = async (eve) => {
      const choosedFile = eve.target.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          document
            .querySelector('.input__picture')
            .setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
        setImage(choosedFile);
      }
    };

    const clickCreateDish = async () => {
      try {
        if (!name) {
          alert('Введите название блюда');
        } else if (!description) {
          alert('Введите описание для блюда');
        } else if (!price) {
          alert('Введите цену блюда');
        } else if (!category) {
          alert('Выберите категорию блюда');
        } else if (!image) {
          alert('Выберите фотографию');
        } else {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('composition', description);
          formData.append('price', price);
          formData.append('category', category.toUpperCase());
          formData.append('image', image);
          console.log(image);
          const uwu = await createDish(formData).then((data) => {
            setFlag(false);
            alert(data.message);
            setDishesList([...dishesList, data.object]);
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div className={`${styles.blur}`}>
        <div className={`${styles.mainInfo} d-flex flex-column`}>
          <Image
            className={`${styles.exit}`}
            src={exit}
            onClick={() => {
              setFlag(false);
              document.body.style.overflow = '';
            }}
          />
          <div className={`d-flex justify-content-start align-items-start`}>
            <div className={`${styles.inputImg} `}>
              <Image
                className={`${styles.img} input__picture`}
                src={ico}
                alt=""
              />
              <input
                type="file"
                accept="image/*, .png, .jpg, .web"
                className="input__file"
                id="file"
                onChange={drowing}
              />
              <label
                htmlFor="file"
                className="d-flex justify-content-center align-items-center input__uploadbtn"
              >
                <Image
                  src={downArrow}
                  width={'75%'}
                  height={'75%'}
                  style={{ opacity: '76%' }}
                />
              </label>
            </div>
            <div
              style={{ paddingTop: '76px', height: '602px' }}
              className={`d-flex flex-column align-items-start justify-content-start row-gap-5`}
            >
              <div>
                <textarea
                  className={`${styles.inputTitle}`}
                  placeholder="Название блюда"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></textarea>
                <div
                  style={{ marginBottom: '52px' }}
                  className={`${styles.imputPrice}`}
                >
                  ₽&nbsp;
                  <input
                    className={`${styles.imputPrice}`}
                    type="number"
                    placeholder="цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>
                <div className={`${styles.description}`}>
                  <p>Состав:</p>
                  <textarea
                    className={`${styles.inputDescr}`}
                    placeholder="Состав"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div
                style={{ height: '100%', width: '100%' }}
                className="d-flex flex-column justify-content-between"
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
                      breakfast
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('lunch')}>
                      lunch
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('snack')}>
                      snack
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
  }
);

export default ModalWindowCreateDish;
