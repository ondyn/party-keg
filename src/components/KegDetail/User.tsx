import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AddBeer from './AddBeer';

interface IProps {
  userId: string;
  name: string;
  lastTime: string;
  alcInBlood: number;
  beerCount: number;
  actualVolume: number;
  beerPrice: number;
}

const User = (props: IProps) => {
  const {
    name,
    userId,
    lastTime,
    alcInBlood,
    beerCount,
    actualVolume,
    beerPrice
  } = props;


  const [showAddBeer, setShowAddBeer] = useState(false);
  const handleCloseAddBeer = () => setShowAddBeer(false);
  const handleShowAddBeer = () => setShowAddBeer(true);

  const [volume, setVolume] = useState(actualVolume);

  const onAddBeer = (userId: string, volume: number) => {
    setVolume(volume);
    handleCloseAddBeer();
  };

  const onChangeVolume = () => {

  };

  return (
    <Row style={{ border: 'solid 1px #116466'}}>
      <Col style={{ fontSize: '1.5em' }}>
        {name}
      </Col>
      <Col xs={3} style={{textAlign: 'center'}}>
        {lastTime}
        <div style={{ fontSize: '0.8em', marginTop:'-5px' }}>last beer time</div>
      </Col>
      <Col style={{textAlign: 'center'}}>
        <span>
        {alcInBlood}
        </span>
        <div style={{ fontSize: '0.8em', marginTop:'-5px' }}>&permil;&nbsp;in blood</div>
      </Col>
      <Col style={{textAlign: 'center'}}>
        <span>
        {beerCount/0.5}
        </span>
        <div style={{ fontSize: '0.8em', marginTop:'-5px' }}>beers</div>
      </Col>
      <Col style={{textAlign: 'center'}}>
        <span>
        {beerPrice}
        </span>
        <div style={{ fontSize: '0.8em', marginTop:'-5px' }}>Kč</div>
      </Col>
      <Col style={{ padding: '0px', color: 'blue', textAlign: 'right' }}>
        <Button onClick={handleShowAddBeer}>+</Button>
      </Col>
      <AddBeer show={showAddBeer} userName={name} lastTime={lastTime} userId={userId} lastVolume={volume} onAddBeer={onAddBeer}
               onClose={handleCloseAddBeer} />
    </Row>
  )
};
export default User;