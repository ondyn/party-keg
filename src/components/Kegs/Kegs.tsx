import React, { Component, useContext, useEffect, useState } from 'react';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';
import { Button, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import CreateKeg from './CreateKeg';
import { IKeg } from '../../context/state';

const Kegs = (authUser: any) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [unsubscribe, setUnsubscribe] = useState();

  const [showAddKeg, setShowAddKeg] = useState(false);
  const handleShowAddKeg = () => setShowAddKeg(true);
  const handleCloseAddKeg = () => setShowAddKeg(false);

  const ctx: IContext = useContext(ApiContext);
  const { kegs, putKeg } = ctx;

  const onChangeText = (event: any) => {
    setText(event.target.value);
  };

  const onCreateKeg = (keg: IKeg) => {
    putKeg(keg);
    handleCloseAddKeg();
  };

  const onEditKeg = (message: any, text: any) => {
    const { uid, ...messageSnapshot } = message;

    // putKeg();
  };

  const onRemoveKeg = (uid: string) => {
    // todo implement keg deletition
  };

  const onNextPage = () => {
    setLimit(limit + 5);
  };

  const onKegClicked = () => {

  };

  const kegList = () => {
    return (
      <ListGroup defaultActiveKey="#link1">
        {kegs.map((keg: any) => (
          <ListGroup.Item key={keg.uid} action onClick={onKegClicked}>
            {keg.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            {false && !loading && kegs && (
              <button type="button" onClick={onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {
              kegs && kegList()
            }

            {!kegs && <div>You have no kegs ...</div>}
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', alignContent: 'center' }}>
          <Col>
            <Button onClick={handleShowAddKeg}>Add new keg</Button>
          </Col>
        </Row>
      </Container>
      <CreateKeg show={showAddKeg} onCreateKeg={onCreateKeg} onClose={handleCloseAddKeg} />
    </>
  );
};

export default Kegs;
