import React from 'react';
import { Image } from 'react-bootstrap';
import downArrow from '../../../assets/downArrow.png';
import ico from '../../../assets/worker/ico-mainDish.png';
import styles from './InputDishPicture.module.css';

const InputDishPicture = ({ setImage, setImageSrc, imageSrc }) => {
  const drowing = (eve) => {
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

  return (
    <div className={`${styles.inputImg} `}>
      <Image
        className={`${styles.img} input__picture`}
        alt=""
        src={imageSrc}
        onError={() => setImageSrc(ico)}
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
  );
};

export default InputDishPicture;
