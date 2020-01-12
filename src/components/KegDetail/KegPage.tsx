import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import KegMenu from './KegMenu';
import UserList from './UserList';
import AddBeer from './AddBeer';

export const KegPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div>Keg name</div>
        </Col>
        <Col>
          <KegMenu />
        </Col>
      </Row>
      <UserList />
    </Container>
  )
};

export default KegPage;