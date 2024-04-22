import React from 'react';
import { Button, Image } from 'react-bootstrap';
import picture from '../../assets/createOrUpdateProfile.png';
import { useNavigate } from 'react-router-dom';

const AdminButton = ({ value, route }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline-success"
      className="reset-btn admin-body__container-btn d-flex flex-column align-items-center"
      onClick={() => navigate(route)}
    >
      <h2 style={{ fontSize: 24 }} className="mb-5">
        {value}
      </h2>
      <Image src={picture} />
    </Button>
  );
};

export default AdminButton;
