import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AddBeer from './AddBeer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  userId: string;
  name: string;
  lastTime: string;
  alcInBlood: number;
  beerCount: number;
  actualVolume: number;
  beerPrice: number;
  addBeer: (userId: string, volume: number) => void;
}

const User = (props: IProps) => {
  const {
    name,
    userId,
    lastTime,
    alcInBlood,
    actualVolume,
    beerPrice,
    addBeer,
  } = props;

  const [showAddBeer, setShowAddBeer] = useState(false);
  const handleCloseAddBeer = () => setShowAddBeer(false);
  const handleShowAddBeer = () => setShowAddBeer(true);

  const [volume, setVolume] = useState(0.5);

  const onAddBeer = (userId: string, volume: number) => {
    setVolume(volume);
    // write beer to DB
    addBeer(userId, volume);
    handleCloseAddBeer();
  };

  return (
    <Row style={{ border: 'solid 1px #116466' }}>
      <Col style={{ fontSize: '1.5em' }}>
        {name}
      </Col>
      <Col xs={3} style={{ textAlign: 'center' }}>
        <div>{lastTime ? lastTime : '-never-'}</div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>last beer time</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {alcInBlood}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>&permil;&nbsp;in blood</div>
      </Col>
      {/*<Col style={{ textAlign: 'center' }}>*/}
      {/*  <span>*/}
      {/*  {beerCount}*/}
      {/*  </span>*/}
      {/*  <div style={{ fontSize: '0.8em', marginTop: '-5px' }}># beers</div>*/}
      {/*</Col>*/}
      <Col style={{ textAlign: 'center' }}>
        <div>
          {Math.round(actualVolume / 0.5 * 10) / 10}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beers</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {beerPrice}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>Kč</div>
      </Col>
      <Col style={{ padding: '0px', color: 'blue', textAlign: 'right' }}>
        <Button style={{
          width: '40px',
          height: '40px',
          padding: '0px 0px 6px 0px',
          textAlign: 'center',
        }} onClick={handleShowAddBeer}>
          <FontAwesomeIcon
            className="align-middle"
            icon={faChartLine}
            transform="up-1 grow-2"
          />
        </Button>
      </Col>
      <Col style={{ padding: '0px', color: 'blue', textAlign: 'right' }}>
        <Button style={{
          width: '40px',
          height: '40px',
          padding: '0px 0px 6px 0px',
          textAlign: 'center',
          fontSize: '1.5em'
        }} onClick={handleShowAddBeer}>
          <b>+</b></Button>
      </Col>
      <AddBeer show={showAddBeer} userName={name} lastTime={lastTime} userId={userId}
               lastVolume={volume} onAddBeer={onAddBeer}
               onClose={handleCloseAddBeer} />
    </Row>
  )
};
export default User;