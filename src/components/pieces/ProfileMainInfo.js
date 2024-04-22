import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { mainInfo } from '../../http/userAPI';
import { Spinner, Image } from 'react-bootstrap';
import ProfileHeader from './ProfileHeader';

const ProfileMainInfo = observer(() => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

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

  return (
    <div className="reset-container">
      <ProfileHeader info={info} />
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

export default ProfileMainInfo;
