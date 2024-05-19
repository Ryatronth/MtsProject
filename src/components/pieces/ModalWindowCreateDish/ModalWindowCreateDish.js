import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TempWindow from '../Temp/TempWindow';
import { createDish } from '../../../http/userAPI';
import { loadImage } from '../../../utils/functions';
import ico from '../../../assets/worker/ico-mainDish.png';

const ModalWindowCreateDish = observer(
  ({ setFlag, dishesList, setDishesList, selectedTime }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(selectedTime.toLowerCase());
    const [image, setImage] = useState(null);

    const clickCreateDish = async () => {
      if (!price) {
        alert('Введите цену блюда');
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('composition', description);
        formData.append('price', price);
        formData.append('category', category.toUpperCase());
        formData.append('image', image);
        await createDish(formData)
          .then((data) => {
            setFlag(false);
            alert(data.message);
            document.body.style.overflow = '';
            setDishesList([...dishesList, data.object]);
          })
          .catch((e) => alert(e.response.data.message));
      }
    };

    useEffect(() => {
      loadImage(ico, setImage);
    }, []);

    return (
      <TempWindow
        setFlag={setFlag}
        setImage={setImage}
        imageSrc={ico}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        clickCreateDish={clickCreateDish}
      />
    );
  }
);

export default ModalWindowCreateDish;
