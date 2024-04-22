import React, { useState } from 'react';
import { Image, Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import childrenPP from '../../assets/childrenPP.png';
import addPlus from '../../assets/addPlus.png';

const ChildrenCards = observer(() => {
  const [group, setGroup] = useState(null);
  return (
    <div className="d-flex justify-content-center align-items-center children-card">
      <Image style={{ marginRight: '26px' }} src={childrenPP}></Image>
      <div
        style={{ borderLeft: '1px solid #D9D9D9', padding: '14px 0 10px 18px' }}
        className="d-flex flex-column justify-content-center row-gap-2"
      >
        <p style={{ color: '#AFAFAF' }}>
          Константинов
          <br />
          Константин
          <br />
          Константинович
        </p>
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            className="children-card__dropdown-groups"
          >
            {group || 'Выберите группу'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '263px' }}>
            <Dropdown.Item onClick={() => setGroup('Action')}>
              Action
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGroup('Another action')}>
              Another action
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGroup('Something else')}>
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <label className="add">
        <Image src={addPlus} />
      </label>
    </div>
  );
});

export default ChildrenCards;
