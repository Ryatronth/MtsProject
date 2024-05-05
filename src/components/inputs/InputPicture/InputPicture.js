import React from 'react';
import downArrow from '../../../assets/downArrow.png';
import { Image } from 'react-bootstrap';

const InputPicture = ({ ico }) => {
  const drowing = (eve) => {
    const choosedFile = eve.target.files[0];
    // if (choosedFile) {
    //   const reader = new FileReader();
    //   reader.addEventListener('load', () => {
    //     document
    //       .querySelector('.input__picture')
    //       .setAttribute('src', reader.result);
    //   });
    //   reader.readAsDataURL(choosedFile);
    // }
  };

  return (
    <div className="input__user-img">
      <Image
        style={{ borderRadius: '50%' }}
        width={195}
        height={195}
        src={ico}
        className="input__picture"
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
  );
};

export default InputPicture;
