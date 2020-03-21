import React, { useContext, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import ApiContext from '../../context/context';
import { Crud, IContext, IKeg } from '../../context/interface';
import KegForm from './KegForm';
import KegItem from './KegItem';

const Kegs = () => {
  const [showAddKeg, setShowAddKeg] = useState(false);
  const handleShowAddKeg = () => setShowAddKeg(true);
  const handleCloseAddKeg = () => setShowAddKeg(false);

  const ctx: IContext = useContext(ApiContext);
  const {
    kegs, putKeg, userId, loadingData,
  } = ctx;

  const onCreateKeg = (keg: IKeg, variant: Crud) => {
    putKeg(keg, variant);
    handleCloseAddKeg();
  };

  const kegList = () => (
    kegs.map((keg: IKeg) => (
      <KegItem key={keg.uid} keg={keg} userUid={userId} />
    ))
  );

  return (
    <>
      <Container>
        {loadingData && <div>Loading ...</div>}
        {kegs.length > 0 ? kegList() : <div>You have no kegs ...</div>}
      </Container>
      <Container>
        <Row style={{ textAlign: 'center', alignContent: 'center', marginTop: '5px' }}>
          <Col>
            <Button onClick={handleShowAddKeg}>Add new keg</Button>
          </Col>
        </Row>
      </Container>
      <KegForm
        variant={Crud.Create}
        show={showAddKeg}
        onFromSubmit={onCreateKeg}
        onClose={handleCloseAddKeg}
        keg={null}
      />
    </>
  );
};

export default Kegs;
