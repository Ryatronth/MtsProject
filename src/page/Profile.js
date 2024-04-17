import React, { useContext } from 'react';
import { Context } from '../index';
import { jwtDecode } from 'jwt-decode';
import AdminPage from '../components/AdminPage';
import ParentPage from '../components/ParentPage';
import WorkerPage from '../components/WorkerPage';
import ProfileHeader from '../components/ProfileHeader';

const Profile = () => {
  const { user } = useContext(Context);

  const data = jwtDecode(localStorage.getItem('token'));
  user.setUser(data);
  const mainUser = user.user;
  return (
    <div>
      <ProfileHeader />
      {mainUser.role === 'ADMIN' && <AdminPage />}
      {mainUser.role === 'USER' && <ParentPage />}
      {/* {mainUser.role === 'PARENT' && <ParentPage />} */}
      {mainUser.role === 'WORKER' && <WorkerPage />}
    </div>
  );
};

export default Profile;
