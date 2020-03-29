import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBeer from './AddBeer';
import { IBeer, IKegUser } from './interface';
import countBac from './countBac';
import TimeSpan from './TimeSpan';

interface IProps {
  userId: string;
  beers: IBeer[];
  user: IKegUser;
  alc: number | null;
  beerCount: number;
  actualVolume: number;
  beerPrice: number;
  addBeer: (userId: string, volume: number) => void;
  isFinished: boolean;
}

const User = (props: IProps) => {
  const {
    user,
    userId,
    beers,
    alc,
    actualVolume,
    beerPrice,
    addBeer,
    isFinished,
  } = props;

  const [totalBac, setBac] = useState(0);
  const [zeroTime, setZeroTime] = useState(0);
  const [showAddBeer, setShowAddBeer] = useState(false);
  const handleCloseAddBeer = () => setShowAddBeer(false);
  const handleShowAddBeer = () => setShowAddBeer(true);

  const [volume, setVolume] = useState(0.5);

  const lastTime: number = (beers.length > 0
    && beers[beers.length - 1]
    && beers[beers.length - 1].createTime)
    ? beers[beers.length - 1].createTime!.toMillis()
    : 0;

  const onAddBeer = (beerUserId: string, beerVolume: number) => {
    setVolume(beerVolume);
    // write beer to DB
    addBeer(userId, beerVolume);
    handleCloseAddBeer();
  };

  const getBac = () => {
    const { bac, zeroBacTime } = countBac(
      user.weight, beers, alc, user.isMan, Date.now(),
    );
    setBac(bac);
    setZeroTime(zeroBacTime);
  };

  useEffect(() => {
    getBac();
    const timer = setInterval(() => {
      getBac();
    }, 1000);
    return (() => clearInterval(timer));
  }, [beers, user]);

  const getTimeSpan = () => {
    if (zeroTime > 0) {
      return (
        <TimeSpan
          startTime={Date.now()}
          endTime={zeroTime}
          prefix="after"
          before={false}
        />
      );
    }
    if (zeroTime === 0) return ('you are sober');
    return '-unknown-';
  };

  return (
    <Row style={{ border: 'solid 1px #116466' }}>
      <Col style={{ fontSize: '1.5em' }}>
        {user.name}
      </Col>
      <Col xs={3} style={{ textAlign: 'center' }}>
        <div>{lastTime !== 0 ? (new Date(lastTime)).toLocaleString() || '-never-' : '-never-'}</div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>last beer time</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {totalBac >= 0
            ? Math.round(totalBac * 100) / 100
            : '-unknown-'}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>&permil;&nbsp;in blood</div>
      </Col>
      <Col xs={3} style={{ textAlign: 'center' }}>
        <div>
          {getTimeSpan()}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>sober up</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {Math.round((actualVolume / 0.5) * 10) / 10}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beers</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {beerPrice !== -1 ? beerPrice : '-unknown-'}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>Kč</div>
      </Col>
      <Col style={{ padding: '0px', color: 'blue', textAlign: 'right' }}>
        {/* <Button  */}
        {/*  style={{ */}
        {/*    width: '40px', */}
        {/*    height: '40px', */}
        {/*    padding: '0px 0px 6px 0px', */}
        {/*    textAlign: 'center', */}
        {/*  }} */}
        {/*  onClick={handleShowAddBeer} */}
        {/* >  */}
        {/*  <FontAwesomeIcon */}
        {/*    className="align-middle" */}
        {/*    icon={faChartLine} */}
        {/*    transform="up-1 grow-2" */}
        {/*  /> */}
        {/* </Button> */}
      </Col>
      <Col style={{ padding: '0px', color: 'blue', textAlign: 'right' }}>
        {!isFinished
          ? (
            <Button
              style={{
                width: '60px',
                height: '100%',
                // padding: '0px 0px 6px 0px',
                textAlign: 'center',
                // fontSize: '1.5em',
              }}
              onClick={handleShowAddBeer}
            >
              <FontAwesomeIcon
                className="align-middle"
                icon={faPlus}
                transform="up-1 left-5"
              />
              <FontAwesomeIcon
                className="align-middle"
                icon={faBeer}
                transform="up-1 grow-2"
              />
            </Button>
          )
          : null}
      </Col>
      <AddBeer
        show={showAddBeer}
        userName={user.name}
        lastTime={lastTime}
        userId={userId}
        lastVolume={volume}
        onAddBeer={onAddBeer}
        onClose={handleCloseAddBeer}
      />
    </Row>
  );
};
export default User;
