import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import logo from '../../assets/hdLogo.png';
import { observer } from 'mobx-react-lite';
import { Image, Dropdown, DropdownButton } from 'react-bootstrap';

const ProfileHeader = observer(({ info }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem('token', '');
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };

  return (
    <header className="reset-header">
      <div className="d-flex justify-content-between align-items-center">
        <Image src={logo} width={106} height={75} />
        <div className="d-flex justify-center align-items-center column-gap-3">
          <Image
            src={info.imageUrl}
            width={69}
            height={69}
            style={{ borderRadius: '50%' }}
          />
          <div className="d-flex flex-column justify-center align-items-start">
            <p style={{ fontWeight: 500, fontSize: 20 }}>
              {info.name} {info.surname[0]}.{info.patronymic[0]}.
            </p>
            <p style={{ fontWeight: 500, fontSize: 14, color: '#F48104' }}>
              {info.role}
            </p>
          </div>
          <DropdownButton
            variant="outline-danger"
            id="dropdown-split-basic"
            title="X"
          >
            <Dropdown.Item onClick={() => logOut()}>Выход</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </header>
  );
});

export default ProfileHeader;
