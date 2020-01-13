import React, { useContext, useState } from 'react';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';
import { Button, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import CreateKeg from './CreateKeg';
import { IKeg } from '../../context/state';
import KegItem from './KegItem';

const Kegs = () => {
  const [limit, setLimit] = useState(5);

  const [showAddKeg, setShowAddKeg] = useState(false);
  const handleShowAddKeg = () => setShowAddKeg(true);
  const handleCloseAddKeg = () => setShowAddKeg(false);

  const ctx: IContext = useContext(ApiContext);
  const { kegs, putKeg, userId, removeKeg, editKeg, loadingData } = ctx;

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

  const kegList = () => (
    kegs.map((keg: IKeg) => (
      <KegItem key={keg.uid} keg={keg} userUid={userId} onRemoveKeg={removeKeg}
               onEditKeg={editKeg} />
    ))
  );

  return (
    <>
      <Container>
        {loadingData && <div>Loading ...</div>}
        {kegs.length > 0 ? kegList() : <div>You have no kegs ...</div>}
      </Container>
      <Container>
        <Row style={{ marginTop: '5px' }}>
          <Col>

          </Col>
        </Row>
        <Row style={{ textAlign: 'center', alignContent: 'center', marginTop: '5px' }}>
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
