import React from 'react';
import { Button } from 'react-bootstrap';

const KegMenu = () => {
  return (
    <>
      <Button>Add user</Button>
      <Button>Show timeline</Button>
      <Button variant="danger">Finish keg</Button>
    </>
  )
};

export default KegMenu;