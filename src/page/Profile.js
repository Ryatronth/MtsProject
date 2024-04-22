import React, { useContext } from 'react';
import { Context } from '../index';
import { jwtDecode } from 'jwt-decode';
import AdminPage from './AdminPage';
import ParentPage from './ParentPage';
import WorkerPage from './WorkerPage';
import ProfileMainInfo from '../components/pieces/ProfileMainInfo';

const Profile = () => {
  const { user } = useContext(Context);

  const data = jwtDecode(localStorage.getItem('token'));
  user.setUser(data);
  const mainUser = user.user;
  return (
    <div>
      <ProfileMainInfo />
      {mainUser.role === 'ADMIN' && <AdminPage />}
      {mainUser.role === 'PARENT' && <ParentPage />}
      {mainUser.role === 'WORKER' && <WorkerPage />}
    </div>
  );
};

export default Profile;
