import React from 'react';
import ProfileMainInfo from '../../components/pieces/ProfileMainInfo/ProfileMainInfo';
import backgr from '../../assets/bgProfile.png';
// import WorkerButton from '../../components/buttons/WorkerButton/WorkerButton';

const WorkerPage = () => {
  return (
    <>
      <ProfileMainInfo />
      <div
        className="mt-5 admin-body"
        style={{
          background: `url(${backgr}) no-repeat center center`,
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center admin-body__container">
          <div
            style={{ width: '100%', flexWrap: 'wrap' }}
            className="d-flex justify-content-evenly align-items-center"
          >
            {/* <WorkerButton variant="dishes" />
            <WorkerButton variant="menu" />
            <WorkerButton variant="view" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerPage;
