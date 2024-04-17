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
    <div style={{ padding: '0 65px', margin: '0 auto' }}>
      <header style={{ padding: '15px 0', borderBottom: '1px solid #AFAFAF' }}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ margin: '0 59px' }}
        >
          <Image src={logo} width={106} height={75} />
          <div className="d-flex justify-center align-items-center column-gap-3">
            <Image
              src={info.imageUrl}
              width={69}
              height={69}
              style={{ borderRadius: '50%' }}
            />
            <div className="d-flex flex-column justify-center align-items-start">
              <div style={{ fontWeight: 500, fontSize: 20 }}>
                {info.name} {info.surname[0]}.{info.patronymic[0]}.
              </div>
              <div style={{ fontWeight: 500, fontSize: 14, color: '#F48104' }}>
                {info.role}
              </div>
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
          <h2
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: 22,
              color: '#414141',
            }}
          >
            ФИО:
          </h2>
          <div
            className="px-4 py-2"
            style={{
              marginTop: '7px',
              maxWidth: '579px',
              minWidth: '479px',
              borderRadius: '100px',
              border: '2px solid #F5AF61',
              fontWeight: '400',
              fontSize: '16px',
              color: '#414141',
            }}
          >
            {info.name} {info.surname} {info.patronymic}
          </div>
          <h2
            style={{
              margin: 0,
              marginTop: '25px',
              fontWeight: 500,
              fontSize: 22,
              color: '#414141',
            }}
          >
            Номер телефона:
          </h2>
          <div
            className="px-4 py-2"
            style={{
              marginTop: '7px',
              maxWidth: '230px',
              minWidth: '200px',
              borderRadius: '100px',
              border: '2px  solid #F5AF61',
              fontWeight: '400',
              fontSize: '16px',
              color: '#414141',
            }}
          >
            {info.phone}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileHeader;
