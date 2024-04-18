import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import logo from '../assets/hdLogo.png';
import { observer } from 'mobx-react-lite';
import { mainInfo } from '../http/userAPI';
import { Spinner, Image, Dropdown, DropdownButton } from 'react-bootstrap';

const ProfileHeader = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    mainInfo()
      .then((data) => {
        setInfo(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }

  const logOut = () => {
    localStorage.setItem('token', '');
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className="reset-container">
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
      <div
        style={{ margin: '40px 40px 0' }}
        className="d-flex justify-center align-items-center column-gap-5"
      >
        <Image
          style={{ borderRadius: '50%' }}
          src={info.imageUrl}
          width={195}
          height={195}
        />
        <div className="d-flex flex-column ">
          <h2 className="general-header__title">ФИО:</h2>
          <p
            className="px-4 py-2 mt-2 general-header__text"
            style={{
              maxWidth: '579px',
              minWidth: '479px',
            }}
          >
            {info.name} {info.surname} {info.patronymic}
          </p>
          <h2 className="mt-4 general-header__title">Номер телефона:</h2>
          <p
            className="px-4 py-2 mt-2 general-header__text"
            style={{
              maxWidth: '230px',
              minWidth: '200px',
            }}
          >
            {info.phone}
          </p>
        </div>
      </div>
    </div>
  );
});

export default ProfileHeader;
