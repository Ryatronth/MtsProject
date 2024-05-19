import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import TempEditCreateMenu from '../../../components/pieces/TempEditCreateMenu/TempEditCreateMenu';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import { createCurrentMenu, getDishes } from '../../../http/userAPI';
import { dateToString } from '../../../utils/functions';
import { WORKER_WORK_WITH_MENU } from '../../../utils/consts';
import icoSub from '../../../assets/worker/ico-sub.png';
import icoPlus from '../../../assets/worker/ico-addDish.png';

const CreateMenu = observer(() => {
  const location = useLocation();
  const { state } = location;
  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('Завтрак');

  const btnList = ['Завтрак', 'Обед', 'Полдник', 'Все'];
  const format = {
    Завтрак: 'BREAKFAST',
    Обед: 'LUNCH',
    Полдник: 'SNACK',
    Все: 'ALL',
  };
  const containerList = [
    {
      title: 'Выбранные блюда',
      selectedTime: format[selectedTime],
      dishesList: selectedDishesList,
      exDishesList: allDishesList,
      funcAddSet: setAllDishesList,
      funcSubSet: setSelectedDishesList,
      ico: icoSub,
    },
    {
      title: 'Выберите блюда',
      selectedTime: format[selectedTime],
      dishesList: allDishesList,
      exDishesList: selectedDishesList,
      funcAddSet: setSelectedDishesList,
      funcSubSet: setAllDishesList,
      ico: icoPlus,
    },
  ];

  const clickSaveCurrentMenu = async () => {
    const dishes = {
      dishes: selectedDishesList.map((data) => data.dish.id),
      endDate: dateToString(endDate),
      startDate: dateToString(startDate),
    };
    createCurrentMenu(dishes)
      .then((data) => {
        alert(data.message);
        navigate(WORKER_WORK_WITH_MENU);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  useEffect(() => {
    let qparametr = ``;
    getDishes(qparametr)
      .then((data) => {
        const newList = data.map((o, index) => {
          return { id: index, dish: o };
        });
        setAllDishesList(newList);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '400px' }}>
        <SpinnerMain />
      </div>
    );
  }

  return (
    <TempEditCreateMenu
      btnList={btnList}
      containerList={containerList}
      setSelectedTime={setSelectedTime}
      selectedTime={selectedTime}
      func={clickSaveCurrentMenu}
    />
  );
});

export default CreateMenu;
