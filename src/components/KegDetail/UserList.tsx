import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import User from './User';
import AddBeer from './AddBeer';


const UserList = () => {
  return (
    <User actualVolume={0.5} alcInBlood={0.2} beerCount={6} beerPrice={89}
          lastTime={(new Date()).toLocaleString()} name="Petr" userId="abcd" />
  )
};

export default UserList;