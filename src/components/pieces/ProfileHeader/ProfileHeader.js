import React, { useContext } from 'react';
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Image, Dropdown, DropdownButton } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../../../utils/consts';
import logo from '../../../assets/hdLogo.png';
import ico from '../../../assets/ico-headerAva.png';
import styles from './ProfileHeader.module.css';

const ProfileHeader = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const role = {
    ADMIN: 'Администратор',
    WORKER: 'Работник',
    PARENT: 'Родитель',
  };

  const logOut = () => {
    localStorage.setItem('token', '');
    user.setUser({});
    user.setIsAuth(false);
    user.setTimer(-1);
    navigate(LOGIN_ROUTE);
  };

  return (
    <header className={`${styles.container}`}>
      <div className="d-flex justify-content-between align-items-center">
        <Image src={logo} className={`${styles.logo}`} />
        <div className="d-flex justify-center align-items-center column-gap-3">
          <Image
            src={user.user.imageUrl || ico}
            className={`${styles.avatar}`}
          />
          <div className="d-flex flex-column justify-center align-items-start">
            <p className={`${styles.descr}`}>
              {user.user.surname} {user.user.name[0]}.{user.user.patronymic[0]}.
            </p>
            <p className={`${styles.descr}`}>{role[user.user.role]}</p>
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
