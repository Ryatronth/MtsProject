import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import SpinnerMain from '../../../components/loaders/SpinnerMain';
import TempEditCreateMenu from '../../../components/pieces/TempEditCreateMenu/TempEditCreateMenu';
import {
  getCurrentMenu,
  getDishes,
  getMenuId,
  updateCurrentMenu,
} from '../../../http/userAPI';
import { WORKER_WORK_WITH_MENU } from '../../../utils/consts';
import icoSub from '../../../assets/worker/ico-sub.png';
import icoPlus from '../../../assets/worker/ico-addDish.png';

const EditMenu = observer(() => {
  const location = useLocation();
  const { state } = location;
  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allDishesList, setAllDishesList] = useState([]);
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [stayDishesList, setStaydDishesList] = useState([]);
  const [selectedTime, setSelectedTime] = useState('Завтрак');
  const [menuId, setMenuId] = useState(-1);

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
      toAdd: selectedDishesList
        .filter((dish) => !stayDishesList.includes(dish))
        .map((dish) => dish.dish.id),
      toDelete: stayDishesList
        .filter((dish) => !selectedDishesList.includes(dish))
        .map((dish) => dish.dish.id),
    };
    updateCurrentMenu(menuId, dishes)
      .then((data) => {
        alert(data.message);
        navigate(WORKER_WORK_WITH_MENU);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    let qparametr = `?endDate=${endDate}`;
    getMenuId(qparametr).then((id) => {
      setMenuId(id[0].id);
      qparametr = id[0].id;
      getCurrentMenu(qparametr)
        .then((menu) => {
          const listMenu = menu.map((o) => o.dish);
          setSelectedDishesList(menu);
          setStaydDishesList(menu);
          qparametr = `?exclude=${listMenu.map((o) => o.id).join(',')}`;
          getDishes(qparametr).then((data) => {
            const newList = data.map((o, index) => {
              return { id: index, dish: o };
            });
            setAllDishesList(newList);
          });
        })
        .finally(() => setLoading(false));
    });
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

export default EditMenu;
