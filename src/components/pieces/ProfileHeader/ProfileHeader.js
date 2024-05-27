import React, { useContext, useState } from 'react';
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Image, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../../../utils/consts';
import logo from '../../../assets/hdLogo.png';
import ico from '../../../assets/ico-headerAva.png';
import styles from './ProfileHeader.module.css';
import { deleteNotification, getNotif } from '../../../http/userAPI';
import { jwtDecode } from 'jwt-decode';

const ProfileHeader = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [flag, setFlag] = useState(false);

  const deleteNotif = (id) => {
    console.log(id);
    deleteNotification(id, user.user.role.toLowerCase()).then((data) =>
      console.log(data)
    );
    const changeList = notifications.filter((notif) => notif.id !== id);
    setNotifications(changeList);
    if (!changeList.length) {
      setFlag(false);
    }
  };

  const notifs = () => {
    if (flag) {
      setFlag(false);
    } else {
      getNotif(jwtDecode(user.token).id, user.user.role.toLowerCase()).then(
        (data) => {
          setFlag(true);
          setNotifications(data);
        }
      );
    }
  };

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
        <div
          className={`${styles.block} d-flex justify-center align-items-center column-gap-3`}
        >
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
          {user.user.role !== 'ADMIN' && (
            <Button variant="outline-success" onClick={notifs}>
              Уведы
            </Button>
          )}
          {flag && (
            <div
              className={`${styles.notifications} d-flex flex-column align-items-center`}
            >
              {notifications.length
                ? notifications.map((obj) => (
                    <div
                      className={`${styles.notification} d-flex flex-column align-items-center`}
                    >
                      <button
                        className={`${styles.notifClose}`}
                        onClick={() => deleteNotif(obj.id)}
                      >
                        X
                      </button>
                      <p>{obj.message}</p>
                      <p className={`${styles.notifTime}`}>
                        {obj.date} - {obj.time}
                      </p>
                    </div>
                  ))
                : 'Уведомлений нет'}
            </div>
          )}
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
