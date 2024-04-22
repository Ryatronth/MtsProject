import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { mainInfo } from '../http/userAPI';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../utils/consts';
import ProfileHeader from '../components/pieces/ProfileHeader';
import InputPicture from '../components/inputs/InputPicture';
import InputMainInfo from '../components/inputs/InputMainInfo';
import backgr from '../assets/bgProfile.png';
import ChildrenCards from '../components/blocks/ChildrenCards';

const CreateParentPage = observer(() => {
  const navigate = useNavigate();
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
    <div>
      <div className="reset-container">
        <ProfileHeader info={info} />
        <div
          style={{ margin: '40px 40px 0' }}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center column-gap-5">
            <InputPicture />
            <InputMainInfo />
          </div>
          <div
            style={{ rowGap: '41px' }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Button
              variant="success"
              style={{ width: '396px', fontSize: 24 }}
              className="reset-btn"
            >
              Сохранить
            </Button>
            <Button
              variant="danger"
              style={{ width: '396px', fontSize: 24 }}
              className="reset-btn cpecial-btn"
              onClick={() => navigate(PROFILE_ROUTE)}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
      <div
        className="mt-5 admin-body"
        style={{
          padding: '0 67px',
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center admin-body__container">
          <div
            style={{ width: '100%', gap: '60px', flexWrap: 'wrap' }}
            className="d-flex justify-content align-items-center"
          >
            <ChildrenCards />
            <ChildrenCards />
            <ChildrenCards />
            <ChildrenCards />
            <ChildrenCards />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateParentPage;
