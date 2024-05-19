import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TempWindow from '../Temp/TempWindow';
import { updateDish } from '../../../http/userAPI';
import { loadImage } from '../../../utils/functions';

const ModalWindowEditDish = observer(
  ({ setFlag, dishData, dishesList, setDishesList }) => {
    const [name, setName] = useState(dishData.name);
    const [description, setDescription] = useState(dishData.composition);
    const [price, setPrice] = useState(dishData.price);
    const [category, setCategory] = useState(dishData.category.toLowerCase());
    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState(dishData.imageUrl);

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
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        await updateDish(dishData.id, formData)
          .then((data) => {
            const indexToUpdate = dishesList.findIndex(
              (dish) => dish.id === dishData.id
            );
            let updateDishesList = [...dishesList];
            updateDishesList[indexToUpdate] = data.object;
            setDishesList([...updateDishesList]);
            setFlag(false);
            document.body.style.overflow = '';
            alert(data.message);
          })
          .catch((e) => alert(e.response.data.message));
      }
    };

    useEffect(() => {
      loadImage(dishData.imageUrl, setImage);
    }, []);

    return (
      <TempWindow
        setFlag={setFlag}
        setImage={setImage}
        setImageSrc={setImageSrc}
        imageSrc={imageSrc}
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

export default ModalWindowEditDish;
